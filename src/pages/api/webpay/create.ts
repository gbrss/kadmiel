import type { APIRoute } from 'astro';
import { getWebpayConfig, webpayHeaders } from '../../../lib/webpay';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { commerceCode, apiKey, host, isProd } = getWebpayConfig();

    if (!commerceCode || !apiKey) {
      return json(
        {
          error:
            'WebPay no configurado. Define WEBPAY_COMMERCE_CODE y WEBPAY_API_KEY en producción.',
        },
        503
      );
    }

    const body = await request.json();
    const amount = Number(body.amount);
    const buyOrder = String(body.buyOrder || `DS${Date.now()}`).slice(0, 26);
    const sessionId = String(body.sessionId || `S${Date.now()}`).slice(0, 61);

    if (!Number.isFinite(amount) || amount < 50) {
      return json({ error: 'Monto mínimo $50 CLP' }, 400);
    }

    const origin = new URL(request.url).origin;
    const returnUrl = `${origin}/api/webpay/commit`;

    const res = await fetch(`${host}/rswebpaytransaction/api/webpay/v1.2/transactions`, {
      method: 'POST',
      headers: webpayHeaders(commerceCode, apiKey),
      body: JSON.stringify({
        buy_order: buyOrder,
        session_id: sessionId,
        amount: Math.round(amount),
        return_url: returnUrl,
      }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      console.error('[WebPay create]', res.status, data);
      return json(
        { error: data.error_message || data.description || 'Error al crear transacción WebPay' },
        502
      );
    }

    if (!data.token || !data.url) {
      return json({ error: 'Respuesta inválida de Transbank' }, 502);
    }

    return json({
      token: data.token,
      url: data.url,
      buyOrder,
      env: isProd ? 'production' : 'integration',
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error interno';
    console.error('[WebPay create]', err);
    return json({ error: message }, 500);
  }
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
