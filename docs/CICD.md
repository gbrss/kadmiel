# CI/CD — kadmiel.cl

## Arquitectura

```
GitHub (push / PR)
    │
    ├─ workflow CI ──────────► npm install + npm run build (validación)
    │
    └─ workflow Deploy ──────► Cloudflare Pages (producción)
           (solo main/master)
```

Hay **dos formas** de desplegar. Usa **una** para no duplicar deploys.

---

## Opción A — Cloudflare Pages conectado a Git (recomendada)

1. [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → Connect to Git.
2. Elige el repo de Kadmiel.
3. Build settings:

| Campo | Valor |
|--------|--------|
| Framework preset | Astro |
| Build command | `npm install && npm run build` |
| Build output directory | `dist` |
| Root directory | `/` |
| Node version | `22` (Environment variable `NODE_VERSION=22`) |

4. Variables de entorno (Production / Preview):

| Variable | Valor |
|----------|--------|
| `WEBPAY_ENV` | `integration` o `production` |
| `WEBPAY_COMMERCE_CODE` | (producción) |
| `WEBPAY_API_KEY` | (producción, secret) |

5. Cada `git push` a `main` despliega solo.
6. En GitHub puedes **desactivar** el workflow `deploy.yml` si usas solo esta opción (evita doble deploy).

---

## Opción B — Deploy con GitHub Actions + Wrangler

Útil si quieres control total desde Actions o varios entornos.

### 1. Crear API Token en Cloudflare

1. [My Profile → API Tokens](https://dash.cloudflare.com/profile/api-tokens)
2. **Create Token** → plantilla **Edit Cloudflare Workers** (incluye Pages)
3. Permisos mínimos: Account → Cloudflare Pages → Edit

### 2. Secrets en GitHub

Repo → **Settings → Secrets and variables → Actions**:

| Secret | Descripción |
|--------|-------------|
| `CLOUDFLARE_API_TOKEN` | Token del paso 1 |
| `CLOUDFLARE_ACCOUNT_ID` | Dashboard → lado derecho Account ID |
| `WEBPAY_ENV` | `integration` / `production` (opcional) |
| `WEBPAY_COMMERCE_CODE` | Código comercio Transbank (prod) |
| `WEBPAY_API_KEY` | API Key Transbank (prod) |

### 3. Variable opcional para previews de PR

**Settings → Secrets and variables → Actions → Variables**:

| Variable | Valor |
|----------|--------|
| `ENABLE_PR_PREVIEW` | `true` |

Así se activa `.github/workflows/preview.yml`.

### 4. Push a main

```bash
git push origin main
```

El workflow **Deploy** construye y ejecuta:

```bash
wrangler pages deploy dist --project-name=kadmiel-cl
```

---

## Workflows incluidos

| Archivo | Cuándo | Qué hace |
|---------|--------|----------|
| `.github/workflows/ci.yml` | push / PR | Instala deps y hace `astro build` |
| `.github/workflows/deploy.yml` | push a main | Build + deploy a Pages |
| `.github/workflows/preview.yml` | PR (si `ENABLE_PR_PREVIEW=true`) | Preview por PR |

---

## Dominio personalizado

Cloudflare Pages → proyecto **kadmiel-cl** → **Custom domains** → `kadmiel.cl` / `www.kadmiel.cl`.

DNS debe estar en Cloudflare o con CNAME a `kadmiel-cl.pages.dev`.

---

## Comandos locales

```bash
npm install
npm run build
npm run cf:preview    # simular Pages en local
npm run cf:deploy     # deploy manual (requiere wrangler login)
```

---

## Evitar doble deploy

Si Pages está **conectado al mismo repo Git** **y** también usas `deploy.yml`, cada push desplegará dos veces.

- Solo Git: desactiva o elimina `deploy.yml`
- Solo Actions: en Pages usa “Direct Upload” / no conectes el repo
