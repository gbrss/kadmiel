# 7. CI/CD

Guía extendida en el repo: [`docs/CICD.md`](https://github.com/gbrss/kadmiel/blob/main/docs/CICD.md).

## Arquitectura

```
GitHub (push / PR)
    │
    ├─ workflow CI ──────────► npm install + npm run build (validación)
    │
    └─ workflow Deploy ──────► Cloudflare Pages (producción)
           (solo main/master)
```

Resumen de disparadores:

```
push / PR ──► [ CI ] ──► npm install + astro build
push main ──► [ Deploy ] ──► Cloudflare Pages (wrangler)
PR*       ──► [ Preview ] ──► branch pr-N  (*si ENABLE_PR_PREVIEW=true)
```

## Workflows incluidos

| Archivo | Cuándo | Qué hace |
|---------|--------|----------|
| `.github/workflows/ci.yml` | push / PR | Instala dependencias y ejecuta `astro build` |
| `.github/workflows/deploy.yml` | push a `main` | Build + deploy a Pages |
| `.github/workflows/preview.yml` | PR (si `ENABLE_PR_PREVIEW=true`) | Preview por PR |

## Dos formas de desplegar (usa solo una)

### Opción A — Pages conectado a Git (recomendada)

1. [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → Connect to Git.
2. Elige el repo de Kadmiel.
3. Build settings:

| Campo | Valor |
|-------|-------|
| Framework preset | Astro |
| Build command | `npm install && npm run build` |
| Build output directory | `dist` |
| Root directory | `/` |
| Node version | `22` (variable `NODE_VERSION=22`) |

4. Variables de entorno (Production / Preview): `WEBPAY_ENV`, `WEBPAY_COMMERCE_CODE`, `WEBPAY_API_KEY`.
5. Cada `git push` a `main` despliega automáticamente.
6. Si usas solo esta opción, desactiva el workflow `deploy.yml`.

### Opción B — GitHub Actions + Wrangler

**1. Crear API Token en Cloudflare:** My Profile → API Tokens → Create Token → plantilla **Edit Cloudflare Workers** (incluye Pages). Permiso mínimo: Account → Cloudflare Pages → Edit.

**2. Secrets en GitHub** (Settings → Secrets and variables → Actions):

| Secret | Uso |
|--------|-----|
| `CLOUDFLARE_API_TOKEN` | Deploy con Wrangler (token del paso 1) |
| `CLOUDFLARE_ACCOUNT_ID` | ID de cuenta (Dashboard, lado derecho) |
| `WEBPAY_ENV` | Entorno de pago (opcional): `integration` / `production` |
| `WEBPAY_COMMERCE_CODE` | Código de comercio Transbank (producción) |
| `WEBPAY_API_KEY` | API Key Transbank (producción) |

**3. Variable opcional para previews de PR** (Settings → Secrets and variables → Actions → *Variables*):

| Variable | Valor |
|----------|-------|
| `ENABLE_PR_PREVIEW` | `true` |

Esto activa `.github/workflows/preview.yml`.

**4. Push a `main`:** el workflow Deploy construye y ejecuta:

```bash
wrangler pages deploy dist --project-name=kadmiel-cl
```

## Evitar doble deploy

Si Pages está conectado al mismo repo **y** también usas `deploy.yml`, cada push desplegará dos veces.

- Solo Git: desactiva o elimina `deploy.yml`.
- Solo Actions: en Pages usa "Direct Upload" y no conectes el repo.

## Comandos locales

```bash
npm install
npm run build
npm run cf:preview    # simular Pages en local
npm run cf:deploy     # deploy manual (requiere wrangler login)
```

---
Anterior: [WebPay (Transbank)](WebPay-Transbank) · Siguiente: [Despliegue en Cloudflare Pages](Despliegue-en-Cloudflare-Pages)
