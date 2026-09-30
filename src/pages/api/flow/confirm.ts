import type { APIRoute } from 'astro';
import { getFlowConfig, flowGetStatus } from '../../../lib/flow';

/**
 * urlConfirmation: Flow llama a este endpoint (servidor a servidor) con POST token=...
 * Debe responder HTTP 200. Aquí se verifica el estado real del pago.
 * Es el lugar para marcar la orden como pagada (DB / email / proveedor) cuando exista.
 * Nota: no funciona en localhost (Flow no puede llamar a tu máquina).
 */
export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const form = await request.formData();
    const token = String(form.get('token') || '');
    if (!token) return new Response('missing token', { status: 400 });

    const cfg = getFlowConfig((locals as any)?.runtime?.env);
    const { ok, data } = await flowGetStatus(cfg, token);

    if (!ok) {
      console.error('[Flow confirm] getStatus falló', data);
      return new Response('status error', { status: 502 });
    }

    if (data.status === 2) {
      // TODO: persistir orden pagada → data.commerceOrder, data.flowOrder, data.amount
      console.log('[Flow confirm] PAGADA', data.commerceOrder, data.flowOrder, data.amount);
    } else {
      console.log('[Flow confirm] estado', data.status, data.commerceOrder);
    }

    return new Response('OK', { status: 200 });
  } catch (err) {
    console.error('[Flow confirm]', err);
    return new Response('error', { status: 500 });
  }
};
