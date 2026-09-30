/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly WEBPAY_ENV?: 'integration' | 'production';
  readonly WEBPAY_COMMERCE_CODE?: string;
  readonly WEBPAY_API_KEY?: string;
  readonly PUBLIC_SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
