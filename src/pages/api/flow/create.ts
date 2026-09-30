import type { APIRoute } from 'astro';
import { getFlowConfig, flowCreatePayment } from '../../../lib/flow';

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const cfg = getFlowConfig((locals as any)?.runtime?.env);

    if (!cfg.apiKey || !cfg.secretKey) {
      return json({ error: 'Flow no configurado. Define FLOW_API_KEY y FLOW_SECRET_KEY.' }, 503);
    }

    const body = await request.json();
    const amount = Number(body.amount);
    const email = String(body.email || '').trim();
    const buyOrder = String(body.buyOrder || `DS${Date.now()}`).slice(0, 26);

    if (!Number.isFinite(amount) || amount < 50) {
      return json({ error: 'Monto inválido' }, 400);
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json({ error: 'Email inválido' }, 400);
    }

    const origin = new URL(request.url).origin;
    const { ok, status, data } = await flowCreatePayment(cfg, {
      commerceOrder: buyOrder,
      subject: `Compra KADMIEL ${buyOrder}`,
      amount,
      email,
      urlConfirmation: `${origin}/api/flow/confirm`,
      urlReturn: `${origin}/api/flow/return`,
    });

    if (!ok || !data.url || !data.token) {
      console.error('[Flow create]', status, data);
      return json({ error: (data.message as string) || 'Error al crear el pago en Flow' }, 502);
    }

    return json({
      url: `${data.url}?token=${data.token}`,
      token: data.token,
      flowOrder: data.flowOrder,
      buyOrder,
      env: cfg.env,
    });
  } catch (err: unknown) {
    console.error('[Flow create]', err);
    return json({ error: err instanceof Error ? err.message : 'Error interno' }, 500);
  }
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
