import type { APIRoute } from 'astro';
import { reserve, releaseReservation, commitReservation, findSku } from '../../../lib/inventory';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const action = (body.action as string) || 'reserve';
    const qty = Math.max(1, Number(body.qty) || 1);
    let sku = body.sku as string | undefined;

    if (!sku && body.productId) {
      sku = findSku(String(body.productId), body.variantLabel ? String(body.variantLabel) : undefined);
    }
    if (!sku) return json({ error: 'sku o productId requerido' }, 400);

    if (action === 'reserve') {
      const result = reserve(sku, qty);
      return json(result, result.ok ? 200 : 409);
    }
    if (action === 'release') {
      releaseReservation(sku, qty);
      return json({ ok: true, message: 'Reserva liberada' });
    }
    if (action === 'commit') {
      commitReservation(sku, qty);
      return json({ ok: true, message: 'Reserva confirmada (venta)' });
    }
    return json({ error: 'action: reserve | release | commit' }, 400);
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
