/**
 * Transbank WebPay Plus (REST API v1.2)
 * Docs: https://www.transbankdevelopers.cl/documentacion/webpay-plus
 */

export type WebpayEnv = 'integration' | 'production';

export function getWebpayConfig() {
  const env = (import.meta.env.WEBPAY_ENV || 'integration') as WebpayEnv;
  const isProd = env === 'production';

  const commerceCode =
    import.meta.env.WEBPAY_COMMERCE_CODE ||
    (isProd ? '' : '597055555532');

  const apiKey =
    import.meta.env.WEBPAY_API_KEY ||
    (isProd
      ? ''
      : '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C');

  const host = isProd
    ? 'https://webpay3g.transbank.cl'
    : 'https://webpay3gint.transbank.cl';

  return { env, isProd, commerceCode, apiKey, host };
}

export function webpayHeaders(commerceCode: string, apiKey: string) {
  return {
    'Content-Type': 'application/json',
    'Tbk-Api-Key-Id': commerceCode,
    'Tbk-Api-Key-Secret': apiKey,
  };
}

/** Tarjetas de prueba Transbank (solo integración) */
export const SANDBOX_TEST_CARDS = {
  visaApproved: {
    number: '4051885600446623',
    cvv: '123',
    expiry: 'cualquier fecha futura',
    result: 'Aprobada',
  },
  mastercardRejected: {
    number: '5186059559590568',
    cvv: '123',
    expiry: 'cualquier fecha futura',
    result: 'Rechazada',
  },
  rut: '11.111.111-1',
  password: '123',
};
