# 2. Stack técnico

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

| Capa | Tecnologías | Notas |
|------|-------------|-------|
| Frontend | Astro 5, Tailwind CSS, TypeScript | Configuración en `astro.config.mjs`, `tailwind.config.mjs`, `postcss.config.mjs` y `tsconfig.json` |
| Runtime | Cloudflare Pages Functions | Renderizado en servidor (`output: server`) con el adapter `@astrojs/cloudflare` |
| Pagos | Transbank WebPay Plus REST v1.2 | Endpoints `src/pages/api/webpay/create.ts` y `commit.ts` |
| Deploy | Wrangler, GitHub Actions, integración Git de Pages | Ver [CI/CD](CI-CD) y [Despliegue en Cloudflare Pages](Despliegue-en-Cloudflare-Pages) |

---
Anterior: [Qué es este proyecto](Que-es-este-proyecto) · Siguiente: [Estructura del repo](Estructura-del-repo)
