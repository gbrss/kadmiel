# 5. Variables de entorno

Copia `.env.example` → `.env` (local) o configúralas en **Cloudflare Pages → Settings → Environment variables**.

| Variable | Descripción | Default |
|----------|-------------|---------|
| `WEBPAY_ENV` | `integration` \| `production` | `integration` |
| `WEBPAY_COMMERCE_CODE` | Código de comercio Transbank | Sandbox de prueba |
| `WEBPAY_API_KEY` | API Key secreta Transbank | Sandbox de prueba |
| `PUBLIC_SITE_URL` | URL pública (opcional) | Origin del request |

> ⚠️ **En producción** debes definir `WEBPAY_COMMERCE_CODE` y `WEBPAY_API_KEY`. Sin ellas el checkout devolverá un error de configuración.

## Dónde configurarlas

| Contexto | Dónde |
|----------|-------|
| Local | Archivo `.env` (copiado desde `.env.example`) |
| Cloudflare Pages | Settings → Environment variables (Production / Preview) |
| GitHub Actions (deploy con Wrangler) | Secrets del repo, ver [CI/CD](CI-CD) |

Nunca subas `WEBPAY_API_KEY` ni claves reales al repositorio.

---
Anterior: [Inicio rápido](Inicio-rapido) · Siguiente: [WebPay (Transbank)](WebPay-Transbank)
