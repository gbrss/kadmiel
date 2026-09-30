import type { APIRoute } from 'astro';
import { getFlowConfig, flowGetStatus } from '../../../lib/flow';

/**
 * urlReturn: Flow redirige al cliente aquí con POST token=...
 * Se verifica el estado en servidor y se redirige (303) a la página de resultado.
 */
export const POST: APIRoute = async (ctx) => handle(ctx);
export const GET: APIRoute = async (ctx) => handle(ctx);

async function handle({ request, url, locals }: { request: Request; url: URL; locals: unknown }) {
  const go = (qs: Record<string, string>) =>
    new Response(null, {
      status: 303,
      headers: { Location: `/checkout/resultado?${new URLSearchParams({ method: 'flow', ...qs })}` },
    });

  let token = url.searchParams.get('token');
  if (!token && request.method === 'POST') {
    try {
      token = String((await request.formData()).get('token') || '') || null;
    } catch {
      /* ignore */
    }
  }
  if (!token) return go({ status: 'error', msg: 'sin_token' });

  const cfg = getFlowConfig((locals as any)?.runtime?.env);
  if (!cfg.apiKey || !cfg.secretKey) return go({ status: 'error', msg: 'no_config' });

  try {
    const { ok, data } = await flowGetStatus(cfg, token);
    if (!ok) return go({ status: 'error', msg: 'status_failed' });

    const common = {
      order: String(data.commerceOrder ?? ''),
      amount: String(data.amount ?? ''),
      flowOrder: String(data.flowOrder ?? ''),
    };

    switch (Number(data.status)) {
      case 2:
        return go({ status: 'success', ...common, media: String(data.paymentData?.media ?? '') });
      case 1:
        return go({ status: 'pending', ...common });
      case 4:
        return go({ status: 'aborted', ...common });
      default:
        return go({ status: 'rejected', ...common, code: String(data.status ?? 'unknown') });
    }
  } catch (err) {
    console.error('[Flow return]', err);
    return go({ status: 'error', msg: 'return_failed' });
  }
}
