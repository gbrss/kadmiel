/**
 * Flow.cl (API REST)
 * Docs: https://www.flow.cl/docs/api.html
 *
 * Firma: HMAC-SHA256 (hex) con la SecretKey sobre los parámetros
 * ordenados alfabéticamente y concatenados como nombre+valor.
 * Usa Web Crypto, compatible con Cloudflare Workers/Pages.
 */

export type FlowEnv = 'sandbox' | 'production';

type EnvBag = Record<string, string | undefined> | undefined;

export function getFlowConfig(runtimeEnv?: EnvBag) {
  const read = (k: string): string =>
    String(runtimeEnv?.[k] ?? (import.meta.env as Record<string, string | undefined>)[k] ?? '').trim();

  const env = (read('FLOW_ENV') || 'sandbox') as FlowEnv;
  const isProd = env === 'production';
  const apiKey = read('23F9B01B-6B2B-468A-878D-83713821LA52');
  const secretKey = read('7d539160e0747d1b5707539af87683b4eeaf49c0');
  const host = isProd ? 'https://www.flow.cl/api' : 'https://sandbox.flow.cl/api';

  return { env, isProd, apiKey, secretKey, host };
}

export async function flowSign(params: Record<string, string>, secretKey: string): Promise<string> {
  const toSign = Object.keys(params)
    .sort()
    .map((k) => k + params[k])
    .join('');

  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secretKey),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(toSign));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/** payment/create → { url, token, flowOrder } */
export async function flowCreatePayment(
  cfg: ReturnType<typeof getFlowConfig>,
  input: {
    commerceOrder: string;
    subject: string;
    amount: number;
    email: string;
    urlConfirmation: string;
    urlReturn: string;
  }
) {
  const params: Record<string, string> = {
    apiKey: cfg.apiKey,
    commerceOrder: input.commerceOrder,
    subject: input.subject,
    currency: 'CLP',
    amount: String(Math.round(input.amount)),
    email: input.email,
    urlConfirmation: input.urlConfirmation,
    urlReturn: input.urlReturn,
  };
  params.s = await flowSign(params, cfg.secretKey);

  const res = await fetch(`${cfg.host}/payment/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(params).toString(),
  });
  const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
  return { ok: res.ok, status: res.status, data };
}

export type FlowStatus = {
  flowOrder?: number;
  commerceOrder?: string;
  /** 1 pendiente · 2 pagada · 3 rechazada · 4 anulada */
  status?: number;
  amount?: number | string;
  paymentData?: { media?: string; date?: string };
  [k: string]: unknown;
};

/** payment/getStatus → estado real del pago (siempre verificar en servidor) */
export async function flowGetStatus(cfg: ReturnType<typeof getFlowConfig>, token: string) {
  const params: Record<string, string> = { apiKey: cfg.apiKey, token };
  params.s = await flowSign(params, cfg.secretKey);

  const res = await fetch(`${cfg.host}/payment/getStatus?${new URLSearchParams(params)}`);
  const data = (await res.json().catch(() => ({}))) as FlowStatus;
  return { ok: res.ok, status: res.status, data };
}
