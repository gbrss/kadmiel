# 1. Qué es este proyecto

**kadmiel.cl** es una tienda online tipo *dropshipping* construida con **Astro.js** y pensada para Chile.

## Flujo de compra

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

1. El cliente navega el **catálogo** (por portada o por categoría).
2. Agrega productos al **carrito**, que se guarda en `localStorage` del navegador.
3. En el **checkout** se inicia la transacción con **WebPay Plus** (ver [WebPay (Transbank)](WebPay-Transbank)).

## Características

| Feature | Detalle |
|---------|---------|
| Catálogo | 10 categorías × 10 productos (100 en total) |
| Portada | Slider interactivo (autoplay, swipe, teclado) |
| Categorías | Tarjetas con fotos reales (no solo emojis) |
| Pagos | WebPay Plus (sandbox + producción) |
| Comisión | Margen de tienda configurable (40 %), ver [Comisión de la tienda](Comision-de-la-tienda) |
| Contacto | Botón flotante de WhatsApp animado |
| Redes | Instagram y Facebook `@kadmiel.cl` |
| Hosting | Cloudflare Pages + adapter `@astrojs/cloudflare` |
| CI/CD | GitHub Actions (build + deploy opcional) |

## Páginas de la tienda

Según la estructura del repo, las rutas principales son: portada (`/`), `/carrito`, `/checkout`, `/checkout/resultado`, `/categoria/[slug]` y `/producto/[slug]`. Más detalle en [Estructura del repo](Estructura-del-repo).

---
Siguiente: [Stack técnico](Stack-tecnico)
