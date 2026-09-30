import type { APIRoute } from 'astro';
import { getSupplier } from '../../../lib/supplier';

export const GET: APIRoute = async ({ url }) => {
  const supplier = getSupplier();
  const sku = url.searchParams.get('sku');

  if (sku) {
    const stock = await supplier.getStock(sku);
    return json({ sku, stock });
  }

  const products = await supplier.listProducts();
  return json({
    provider: 'DemoSupplier',
    count: products.length,
    products: products.slice(0, 50), // paginación simple
    note: 'Reemplaza DemoSupplier por tu API real (CJ, Zendrop, Open Platform, etc.)',
  });
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const supplier = getSupplier();
    const result = await supplier.createOrder(
      body.lines || [],
      String(body.customerRef || `WEB-${Date.now()}`)
    );
    return json(result, result.status === 'rejected' ? 409 : 200);
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
