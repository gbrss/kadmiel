# Comisión de la tienda

```
Precio venta  ████████████████████  100%
Costo est.    ████████████          60%   (proveedor)
Comisión      ████████              40%   (kadmiel.cl)
```

Definida en `src/data/products.ts`:

```ts
export const COMMISSION_RATE = 0.40; // 40%
```

Se muestra en la ficha de producto, el carrito y el checkout. Para cambiar el margen, modifica `COMMISSION_RATE`.

Ver también [Qué es este proyecto](Que-es-este-proyecto) y [Estructura del repo](Estructura-del-repo).
