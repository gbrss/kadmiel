```
██╗  ██╗ █████╗ ██████╗ ███╗   ███╗██╗███████╗██╗     
██║ ██╔╝██╔══██╗██╔══██╗████╗ ████║██║██╔════╝██║     
█████╔╝ ███████║██║  ██║██╔████╔██║██║█████╗  ██║     
██╔═██╗ ██╔══██║██║  ██║██║╚██╔╝██║██║██╔══╝  ██║     
██║  ██╗██║  ██║██████╔╝██║ ╚═╝ ██║██║███████╗███████╗
╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚═╝     ╚═╝╚═╝╚══════╝╚══════╝
                    ·  k a d m i e l . c l  ·
```

```
  ╔══════════════════════════════════════════════════════════╗
  ║   Tienda dropshipping · Astro 5 · Cloudflare Pages       ║
  ║   WebPay Plus · WhatsApp · 100 productos · 10 categorías ║
  ╚══════════════════════════════════════════════════════════╝
```

---

## Índice

1. [Qué es este proyecto](#-qué-es-este-proyecto)
2. [Stack técnico](#-stack-técnico)
3. [Estructura del repo](#-estructura-del-repo)
4. [Inicio rápido](#-inicio-rápido)
5. [Variables de entorno](#-variables-de-entorno)
6. [WebPay (Transbank)](#-webpay-transbank)
7. [CI/CD](#-cicd)
8. [Despliegue en Cloudflare Pages](#-despliegue-en-cloudflare-pages)
9. [Marca y contacto](#-marca-y-contacto)
10. [Scripts npm](#-scripts-npm)
11. [Licencia / notas](#-notas)

---

## Qué es este proyecto

**kadmiel.cl** es una tienda online tipo dropshipping construida con **Astro.js**, pensada para Chile:

```
  ┌─────────────┐     ┌──────────────┐     ┌─────────────┐
  │  Catálogo   │ ──► │   Carrito    │ ──► │  Checkout   │
  │  100 items  │     │  localStorage│     │   WebPay    │
  └─────────────┘     └──────────────┘     └──────┬──────┘
                                                   │
                                                   ▼
                                            ┌─────────────┐
                                            │  Transbank  │
                                            │  WebPay+    │
                                            └─────────────┘
```

### Características

| Feature | Detalle |
|---------|---------|
| Catálogo | 10 categorías × 10 productos (100 total) |
| Portada | Slider interactivo (autoplay, swipe, teclado) |
| Categorías | Tarjetas con **fotos reales** (no solo emojis) |
| Pagos | **WebPay Plus** (sandbox + producción) |
| Comisión | Margen de tienda configurable (**40%**) |
| Contacto | WhatsApp flotante animado `+56 9 4542 2388` |
| Redes | Instagram y Facebook `@kadmiel.cl` |
| Hosting | Cloudflare Pages + adapter `@astrojs/cloudflare` |
| CI/CD | GitHub Actions (build + deploy opcional) |

---

## Stack técnico

```
  ┌──────────────────────────────────────────────────────────┐
  │  Frontend                                                │
  │    Astro 5  ·  Tailwind CSS  ·  TypeScript               │
  ├──────────────────────────────────────────────────────────┤
  │  Runtime                                                 │
  │    Cloudflare Pages Functions  ·  SSR (output: server)   │
  ├──────────────────────────────────────────────────────────┤
  │  Pagos                                                   │
  │    Transbank WebPay Plus REST v1.2                       │
  ├──────────────────────────────────────────────────────────┤
  │  Deploy                                                  │
  │    Wrangler  ·  GitHub Actions  ·  Pages Git integration │
  └──────────────────────────────────────────────────────────┘
```

---

## Estructura del repo

```
kadmiel-cl/
│
├── .github/workflows/
│   ├── ci.yml              # Build en push / PR
│   ├── deploy.yml          # Deploy a Pages (main)
│   └── preview.yml         # Preview opcional por PR
│
├── docs/
│   └── CICD.md             # Guía CI/CD detallada
│
├── public/
│   └── logo-kadmiel.jpg    # Logo oficial
│
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── HeroSlider.astro
│   │   ├── ProductCard.astro
│   │   └── WhatsAppFloat.astro
│   ├── data/
│   │   └── products.ts     # Catálogo + comisión 40%
│   ├── layouts/
│   │   └── Layout.astro
│   ├── lib/
│   │   └── webpay.ts       # Config Transbank
│   ├── pages/
│   │   ├── index.astro
│   │   ├── carrito.astro
│   │   ├── checkout.astro
│   │   ├── checkout/resultado.astro
│   │   ├── categoria/[slug].astro
│   │   ├── producto/[slug].astro
│   │   └── api/webpay/
│   │       ├── create.ts   # Inicia transacción
│   │       └── commit.ts   # Confirma pago
│   └── styles/
│       └── global.css
│
├── .env.example
├── .gitignore
├── astro.config.mjs
├── package.json
├── wrangler.toml
└── README.md               # ← estás aquí
```

---

## Inicio rápido

### Requisitos

- **Node.js** 18+ (recomendado **22**)
- npm 9+

### Instalación

```bash
# 1. Clonar
git clone https://github.com/TU_USUARIO/kadmiel-cl.git
cd kadmiel-cl

# 2. Dependencias
npm install

# 3. Variables locales (opcional)
cp .env.example .env

# 4. Desarrollo
npm run dev
```

Abre: **http://localhost:4321**

### Build de producción

```bash
npm run build
npm run preview          # preview Astro
# o
npm run cf:preview       # simular Cloudflare Pages
```

---

## Variables de entorno

Copia `.env.example` → `.env` (local) o configúralas en **Cloudflare Pages → Settings → Environment variables**.

| Variable | Descripción | Default |
|----------|-------------|---------|
| `WEBPAY_ENV` | `integration` \| `production` | `integration` |
| `WEBPAY_COMMERCE_CODE` | Código de comercio Transbank | sandbox de prueba |
| `WEBPAY_API_KEY` | API Key secreta Transbank | sandbox de prueba |
| `PUBLIC_SITE_URL` | URL pública (opcional) | origin del request |

```
  ⚠  En PRODUCCIÓN debes definir WEBPAY_COMMERCE_CODE y WEBPAY_API_KEY.
     Sin ellas el checkout devolverá error de configuración.
```

---

## WebPay (Transbank)

### Flujo

```
  Cliente                kadmiel.cl              Transbank
     │                        │                      │
     │  POST /api/webpay/create                      │
     │───────────────────────►│                      │
     │                        │  crear transacción   │
     │                        │─────────────────────►│
     │                        │◄──── token + url ────│
     │  redirect POST token_ws│                      │
     │──────────────────────────────────────────────►│
     │                        │     (paga en WebPay) │
     │                        │◄── return_url ───────│
     │                        │  PUT commit          │
     │                        │─────────────────────►│
     │  /checkout/resultado   │◄── AUTHORIZED ───────│
     │◄───────────────────────│                      │
```

### Tarjetas de prueba (solo `integration`)

| Resultado | Número de tarjeta | CVV | Auth |
|-----------|-------------------|-----|------|
| **Aprobada** | `4051885600446623` | `123` | RUT `11.111.111-1` · clave `123` |
| **Rechazada** | `5186059559590568` | `123` | mismo |

Docs oficiales: [transbankdevelopers.cl](https://www.transbankdevelopers.cl/documentacion/webpay-plus)

---

## CI/CD

```
  push / PR ──► [ CI ] ──► npm install + astro build
  push main ──► [ Deploy ] ──► Cloudflare Pages (wrangler)
  PR*       ──► [ Preview ] ──► branch pr-N  (*si ENABLE_PR_PREVIEW=true)
```

### Secrets de GitHub Actions (Opción B)

| Secret | Uso |
|--------|-----|
| `CLOUDFLARE_API_TOKEN` | Deploy con Wrangler |
| `CLOUDFLARE_ACCOUNT_ID` | ID de cuenta CF |
| `WEBPAY_ENV` | Entorno de pago |
| `WEBPAY_COMMERCE_CODE` | Comercio Transbank |
| `WEBPAY_API_KEY` | Key Transbank |

Guía completa → **[docs/CICD.md](docs/CICD.md)**

```
  💡 Recomendación: usa Pages conectado a Git (Opción A) O Actions Deploy
     (Opción B), no ambos a la vez → evita doble deploy.
```

---

## Despliegue en Cloudflare Pages

### Settings del proyecto

| Campo | Valor |
|-------|--------|
| Framework | Astro (o None) |
| Build command | `npm install && npm run build` |
| Build output directory | `dist` |
| Node version | `22` (`NODE_VERSION=22`) |

### Dominio

```
  kadmiel-cl.pages.dev  ──►  custom domain  ──►  kadmiel.cl
```

En Pages: **Custom domains** → añade `kadmiel.cl` y `www.kadmiel.cl`.

---

## Marca y contacto

```
  ┌────────────────────────────────────────┐
  │  LOGO      public/logo-kadmiel.jpg     │
  │  SITIO     https://kadmiel.cl          │
  │  WHATSAPP  +56 9 4542 2388             │
  │  IG / FB   @kadmiel.cl                 │
  └────────────────────────────────────────┘
```

- Botón flotante de WhatsApp en todas las páginas (animación pulse).
- Footer con botones a Instagram y Facebook.

---

## Scripts npm

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build producción (`dist/`) |
| `npm run preview` | Preview del build Astro |
| `npm run cf:preview` | Preview como Pages (Wrangler) |
| `npm run cf:deploy` | Build + deploy manual a Pages |
| `npm run ci` | Alias de build (para pipelines) |

---

## Comisión de la tienda

```
  Precio venta  ████████████████████  100%
  Costo est.    ████████████          60%   (proveedor)
  Comisión      ████████              40%   (kadmiel.cl)
```

Definida en `src/data/products.ts`:

```ts
export const COMMISSION_RATE = 0.40; // 40%
```

Se muestra en ficha de producto, carrito y checkout.

---

## Notas

```
  · Este proyecto es la tienda de marca kadmiel.cl.
  · El repo público "DropShip Chile" puede usarse como plantilla genérica
    sin logo, WhatsApp ni redes de Kadmiel.
  · Las fotos de productos/categorías son stock (Unsplash); en producción
    conviene reemplazarlas por imágenes del proveedor real.
  · WebPay en integration no cobra dinero real.
```

---

```
  ═══════════════════════════════════════════════════════════
   kadmiel.cl  ·  hecho con Astro + Cloudflare + WebPay
  ═══════════════════════════════════════════════════════════
```

## Inventario, proveedor y tallas

- API proveedor demo: `GET/POST /api/supplier`
- Inventario por SKU: `GET/POST /api/inventory`
- Panel: `/admin/inventario`
- Tablas de tallas: ficha de producto + `src/data/sizeCharts.ts`

Detalle: [docs/INVENTARIO.md](docs/INVENTARIO.md)
