/**
 * Inventario a nivel SKU (producto + variante).
 * Memoria de proceso + sincronización opcional con proveedor.
 * En Cloudflare Pages producción conviene persistir en KV/D1.
 */

import { products } from '../data/products';
import { getSupplier, productSupplierSku } from './supplier';

export interface InventoryItem {
  sku: string;
  productId: string;
  productName: string;
  variantLabel: string;
  available: number;
  reserved: number;
  supplierSku: string;
  updatedAt: string;
}

type Store = Map<string, InventoryItem>;

const g = globalThis as unknown as { __kadmielInventory?: Store };

function store(): Store {
  if (!g.__kadmielInventory) {
    g.__kadmielInventory = new Map();
    seed(g.__kadmielInventory);
  }
  return g.__kadmielInventory;
}

function seed(s: Store) {
  for (const p of products) {
    const variants =
      p.variants && p.variants.length
        ? combinator(p.variants)
        : ['Estándar'];
    const per = Math.max(1, Math.floor(p.stock / Math.max(1, variants.length)));
    variants.forEach((label, i) => {
      const sku = `${p.id}::${label}`;
      s.set(sku, {
        sku,
        productId: p.id,
        productName: p.name,
        variantLabel: label,
        available: per + (i % 2),
        reserved: 0,
        supplierSku: productSupplierSku(p.id),
        updatedAt: new Date().toISOString(),
      });
    });
  }
}

function combinator(variants: { name: string; options: string[] }[]): string[] {
  // Solo primera dimensión de variantes para SKUs manejables (Color o Talla)
  const primary = variants[0];
  if (!primary) return ['Estándar'];
  if (variants.length === 1) {
    return primary.options.map((o) => `${primary.name}: ${o}`);
  }
  // Color × Talla (máx 2 ejes)
  const second = variants[1];
  const out: string[] = [];
  for (const a of primary.options) {
    for (const b of second.options) {
      out.push(`${primary.name}: ${a} · ${second.name}: ${b}`);
    }
  }
  return out.slice(0, 40); // límite demo
}

export function listInventory(productId?: string): InventoryItem[] {
  const all = [...store().values()];
  if (!productId) return all.sort((a, b) => a.productId.localeCompare(b.productId));
  return all.filter((i) => i.productId === productId);
}

export function getInventorySku(sku: string): InventoryItem | undefined {
  return store().get(sku);
}

export function getAvailableForProduct(productId: string): number {
  return listInventory(productId).reduce((s, i) => s + i.available, 0);
}

export function adjustStock(sku: string, delta: number, reason?: string): InventoryItem | null {
  const item = store().get(sku);
  if (!item) return null;
  item.available = Math.max(0, item.available + delta);
  item.updatedAt = new Date().toISOString();
  store().set(sku, item);
  console.log('[inventory]', reason || 'adjust', sku, delta, '→', item.available);
  return item;
}

export function setStock(sku: string, available: number): InventoryItem | null {
  const item = store().get(sku);
  if (!item) return null;
  item.available = Math.max(0, Math.floor(available));
  item.updatedAt = new Date().toISOString();
  store().set(sku, item);
  return item;
}

/** Reserva stock al iniciar checkout (evita sobreventa blanda) */
export function reserve(sku: string, qty: number): { ok: boolean; message: string; item?: InventoryItem } {
  const item = store().get(sku);
  if (!item) return { ok: false, message: 'SKU no encontrado' };
  if (item.available < qty) return { ok: false, message: `Stock insuficiente (${item.available})` };
  item.available -= qty;
  item.reserved += qty;
  item.updatedAt = new Date().toISOString();
  store().set(sku, item);
  return { ok: true, message: 'Reservado', item };
}

export function releaseReservation(sku: string, qty: number): void {
  const item = store().get(sku);
  if (!item) return;
  const q = Math.min(qty, item.reserved);
  item.reserved -= q;
  item.available += q;
  item.updatedAt = new Date().toISOString();
  store().set(sku, item);
}

export function commitReservation(sku: string, qty: number): void {
  const item = store().get(sku);
  if (!item) return;
  item.reserved = Math.max(0, item.reserved - qty);
  item.updatedAt = new Date().toISOString();
  store().set(sku, item);
}

/** Sincroniza cantidades disponibles desde el proveedor demo */
export async function syncFromSupplier(): Promise<{ updated: number }> {
  const supplier = getSupplier();
  const remote = await supplier.listProducts();
  let updated = 0;
  for (const item of store().values()) {
    const sp = remote.find((r) => r.productId === item.productId);
    if (!sp) continue;
    const match =
      sp.variants.find((v) => v.label === item.variantLabel) ||
      sp.variants[0];
    if (match) {
      item.available = match.stock;
      item.supplierSku = match.sku;
      item.updatedAt = new Date().toISOString();
      store().set(item.sku, item);
      updated++;
    }
  }
  return { updated };
}

export function findSku(productId: string, variantLabel?: string): string | undefined {
  const items = listInventory(productId);
  if (!items.length) return undefined;
  if (!variantLabel) return items[0].sku;
  const exact = items.find((i) => i.variantLabel === variantLabel || i.variantLabel.includes(variantLabel));
  return exact?.sku ?? items[0].sku;
}
