# 8. Despliegue en Cloudflare Pages

## Settings del proyecto

| Campo | Valor |
|-------|-------|
| Framework | Astro (o None) |
| Build command | `npm install && npm run build` |
| Build output directory | `dist` |
| Node version | `22` (`NODE_VERSION=22`) |

Configura también las [variables de entorno](Variables-de-entorno) en Pages. Para elegir entre deploy por Git o por GitHub Actions, revisa [CI/CD](CI-CD).

## Dominio

```
kadmiel-cl.pages.dev  ──►  custom domain  ──►  kadmiel.cl
```

1. En Pages → proyecto **kadmiel-cl** → **Custom domains**.
2. Añade `kadmiel.cl` y `www.kadmiel.cl`.
3. El DNS debe estar en Cloudflare, o bien con un CNAME a `kadmiel-cl.pages.dev`.

## Deploy manual

```bash
npm run cf:deploy    # build + deploy (requiere wrangler login)
```

---
Anterior: [CI/CD](CI-CD) · Siguiente: [Marca y contacto](Marca-y-contacto)
