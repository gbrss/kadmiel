/**
 * Capa de proveedor (dropshipping).
 * DemoSupplier simula un API externo; en producción reemplaza por CJ, Zendrop, AliExpress Open Platform, etc.
 */

import { products, type Product } from '../data/products';

export interface SupplierProduct {
  supplierSku: string;
  productId: string;
  name: string;
  costClp: number;
  stock: number;
  variants: { sku: string; label: string; stock: number }[];
  leadTimeDays: number;
  warehouse: string;
}

export interface SupplierOrderLine {
  supplierSku: string;
  qty: number;
  variantLabel?: string;
}

export interface SupplierOrderResult {
  orderId: string;
  status: 'accepted' | 'rejected' | 'pending';
  message: string;
  estimatedShipDays?: number;
}

export interface SupplierClient {
  listProducts(): Promise<SupplierProduct[]>;
  getStock(supplierSku: string): Promise<number>;
  createOrder(lines: SupplierOrderLine[], customerRef: string): Promise<SupplierOrderResult>;
}

function skuFor(p: Product, variantLabel?: string): string {
  const base = `SUP-${p.id.toUpperCase()}`;
  if (!variantLabel) return base;
  return `${base}-${variantLabel.replace(/\s+/g, '-').toUpperCase().slice(0, 24)}`;
}

/** Proveedor demo basado en el catálogo local */
export class DemoSupplier implements SupplierClient {
  async listProducts(): Promise<SupplierProduct[]> {
    return products.map((p) => {
      const costClp = Math.round(p.price * 0.6);
      const variantOptions =
        p.variants?.flatMap((v) => v.options.map((o) => `${v.name}: ${o}`)) ?? ['Estándar'];
      const variants = variantOptions.map((label, i) => ({
        sku: skuFor(p, label),
        label,
        stock: Math.max(0, Math.floor(p.stock / variantOptions.length) + (i % 3)),
      }));
      return {
        supplierSku: skuFor(p),
        productId: p.id,
        name: p.name,
        costClp,
        stock: variants.reduce((s, v) => s + v.stock, 0),
        variants,
        leadTimeDays: 7 + (p.id.charCodeAt(0) % 10),
        warehouse: 'CN-SZ',
      };
    });
  }

  async getStock(supplierSku: string): Promise<number> {
    const all = await this.listProducts();
    for (const p of all) {
      if (p.supplierSku === supplierSku) return p.stock;
      const v = p.variants.find((x) => x.sku === supplierSku);
      if (v) return v.stock;
    }
    return 0;
  }

  async createOrder(lines: SupplierOrderLine[], customerRef: string): Promise<SupplierOrderResult> {
    if (!lines.length) {
      return { orderId: '', status: 'rejected', message: 'Sin líneas de pedido' };
    }
    for (const line of lines) {
      const stock = await this.getStock(line.supplierSku);
      if (stock < line.qty) {
        return {
          orderId: '',
          status: 'rejected',
          message: `Stock insuficiente para ${line.supplierSku} (disp: ${stock})`,
        };
      }
    }
    const orderId = `PO-${Date.now()}-${customerRef.slice(0, 8)}`;
    return {
      orderId,
      status: 'accepted',
      message: 'Pedido enviado al proveedor (demo)',
      estimatedShipDays: 10,
    };
  }
}

export function getSupplier(): SupplierClient {
  // Futuro: if (import.meta.env.SUPPLIER_API_URL) return new HttpSupplier(...)
  return new DemoSupplier();
}

export function productSupplierSku(productId: string): string {
  return `SUP-${productId.toUpperCase()}`;
}
