import type { APIRoute } from 'astro';
import { getWebpayConfig, webpayHeaders } from '../../../lib/webpay';

export const GET: APIRoute = async (ctx) => handleCommit(ctx);
export const POST: APIRoute = async (ctx) => handleCommit(ctx);

async function handleCommit({
  request,
  url,
  redirect,
}: {
  request: Request;
  url: URL;
  redirect: (path: string) => Response;
}) {
  let token = url.searchParams.get('token_ws');
  const tbkToken = url.searchParams.get('TBK_TOKEN');

  if (!token && request.method === 'POST') {
    try {
      const form = await request.formData();
      token = (form.get('token_ws') as string) || null;
    } catch {
      /* ignore */
    }
  }

  if (tbkToken && !token) {
    return redirect('/checkout/resultado?status=aborted');
  }

  if (!token) {
    return redirect('/checkout/resultado?status=error&msg=sin_token');
  }

  const { commerceCode, apiKey, host } = getWebpayConfig();
  if (!commerceCode || !apiKey) {
    return redirect('/checkout/resultado?status=error&msg=no_config');
  }

  try {
    const res = await fetch(
      `${host}/rswebpaytransaction/api/webpay/v1.2/transactions/${encodeURIComponent(token)}`,
      {
        method: 'PUT',
        headers: webpayHeaders(commerceCode, apiKey),
      }
    );

    const data = await res.json().catch(() => ({}));

    if (data.response_code === 0 && data.status === 'AUTHORIZED') {
      const params = new URLSearchParams({
        status: 'success',
        amount: String(data.amount ?? ''),
        order: String(data.buy_order ?? ''),
        auth: String(data.authorization_code ?? ''),
        card: String(data.card_detail?.card_number ?? ''),
      });
      return redirect(`/checkout/resultado?${params}`);
    }

    return redirect(
      `/checkout/resultado?status=rejected&code=${encodeURIComponent(String(data.response_code ?? 'unknown'))}`
    );
  } catch (err) {
    console.error('[WebPay commit]', err);
    return redirect('/checkout/resultado?status=error&msg=commit_failed');
  }
}
