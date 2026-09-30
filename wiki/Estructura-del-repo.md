# 3. Estructura del repo

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
└── README.md
```

> El árbol es el que muestra el README. El repo también contiene `package-lock.json`, `postcss.config.mjs`, `tailwind.config.mjs` y `tsconfig.json` en la raíz, y el README menciona además `docs/INVENTARIO.md`, `src/data/sizeCharts.ts`, `src/lib/inventory.ts`, `src/lib/supplier.ts` y `/admin/inventario`, que no aparecen en ese árbol.

## Raíz

| Archivo / carpeta | Rol |
|-------------------|-----|
| `.github/workflows/` | Workflows de GitHub Actions ([CI/CD](CI-CD)) |
| `docs/` | Documentación detallada (`CICD.md`, `INVENTARIO.md`) |
| `public/` | Archivos estáticos (logo oficial `logo-kadmiel.jpg`) |
| `src/` | Código fuente de la aplicación |
| `.env.example` | Plantilla de variables ([Variables de entorno](Variables-de-entorno)) |
| `.gitignore` | Exclusiones de Git |
| `astro.config.mjs` | Configuración de Astro |
| `postcss.config.mjs` / `tailwind.config.mjs` | Configuración de estilos |
| `tsconfig.json` | Configuración de TypeScript |
| `package.json` / `package-lock.json` | Dependencias y [scripts npm](Scripts-npm) |
| `wrangler.toml` | Configuración de Wrangler / Cloudflare |

## Workflows (`.github/workflows/`)

| Archivo | Función |
|---------|---------|
| `ci.yml` | Build en cada push / PR |
| `deploy.yml` | Deploy a Cloudflare Pages al hacer push a `main` |
| `preview.yml` | Preview opcional por PR |

## Componentes (`src/components/`)

| Componente | Función |
|------------|---------|
| `Header.astro` | Encabezado del sitio |
| `Footer.astro` | Pie con botones a Instagram y Facebook |
| `HeroSlider.astro` | Slider de portada (autoplay, swipe, teclado) |
| `ProductCard.astro` | Tarjeta de producto |
| `WhatsAppFloat.astro` | Botón flotante de WhatsApp |

## Datos, layout y librerías

| Archivo | Función |
|---------|---------|
| `src/data/products.ts` | Catálogo de productos y `COMMISSION_RATE` (40 %) |
| `src/layouts/Layout.astro` | Layout base compartido |
| `src/lib/webpay.ts` | Configuración de Transbank |
| `src/styles/global.css` | Estilos globales |

## Páginas y API (`src/pages/`)

| Ruta | Archivo | Función |
|------|---------|---------|
| `/` | `index.astro` | Portada |
| `/carrito` | `carrito.astro` | Carrito de compras |
| `/checkout` | `checkout.astro` | Checkout |
| `/checkout/resultado` | `checkout/resultado.astro` | Resultado del pago |
| `/categoria/[slug]` | `categoria/[slug].astro` | Listado por categoría |
| `/producto/[slug]` | `producto/[slug].astro` | Ficha de producto |
| `POST /api/webpay/create` | `api/webpay/create.ts` | Inicia la transacción |
| `/api/webpay/commit` | `api/webpay/commit.ts` | Confirma el pago |

---
Anterior: [Stack técnico](Stack-tecnico) · Siguiente: [Inicio rápido](Inicio-rapido)
