# 4. Inicio rápido

## Requisitos

- **Node.js** 18+ (recomendado **22**)
- **npm** 9+

## Instalación

```bash
# 1. Clonar
git clone https://github.com/gbrss/kadmiel.git
cd kadmiel

# 2. Dependencias
npm install

# 3. Variables locales (opcional)
cp .env.example .env

# 4. Desarrollo
npm run dev
```

Abre <http://localhost:4321>.

> El README usa como ejemplo `https://github.com/TU_USUARIO/kadmiel-cl.git`. La URL de arriba apunta al repositorio real (`gbrss/kadmiel`); la carpeta resultante se llamará `kadmiel`.

## Build de producción

```bash
npm run build
npm run preview          # preview Astro
# o
npm run cf:preview       # simular Cloudflare Pages
```

- `npm run build` genera la salida en `dist/`.
- `npm run preview` sirve el build con Astro.
- `npm run cf:preview` simula Cloudflare Pages localmente con Wrangler.

Lista completa de comandos en [Scripts npm](Scripts-npm).

---
Anterior: [Estructura del repo](Estructura-del-repo) · Siguiente: [Variables de entorno](Variables-de-entorno)
