import type { APIRoute } from 'astro';
import { listInventory, setStock, syncFromSupplier } from '../../../lib/inventory';

export const GET: APIRoute = async ({ url }) => {
  const productId = url.searchParams.get('productId') || undefined;
  const items = listInventory(productId);
  return json({
    count: items.length,
    items,
    totalAvailable: items.reduce((s, i) => s + i.available, 0),
    totalReserved: items.reduce((s, i) => s + i.reserved, 0),
  });
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const action = body.action as string;

    if (action === 'sync') {
      const result = await syncFromSupplier();
      return json({ ok: true, ...result });
    }

    if (action === 'set') {
      const { sku, available } = body;
      if (!sku || available === undefined) {
        return json({ error: 'sku y available requeridos' }, 400);
      }
      const item = setStock(String(sku), Number(available));
      if (!item) return json({ error: 'SKU no encontrado' }, 404);
      return json({ ok: true, item });
    }

    return json({ error: 'action inválida (sync | set)' }, 400);
  } catch (e: unknown) {
    return json({ error: e instanceof Error ? e.message : 'Error' }, 500);
  }
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
