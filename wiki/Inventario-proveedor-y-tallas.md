# Inventario, proveedor y tallas

Guía en el repo: [`docs/INVENTARIO.md`](https://github.com/gbrss/kadmiel/blob/main/docs/INVENTARIO.md).

## Arquitectura

```
Cliente → /api/inventory  →  lib/inventory.ts  ⇄  lib/supplier.ts (DemoSupplier)
                ↓
         stock por SKU (producto + variante)
```

## Endpoints

| Método | Ruta | Uso |
|--------|------|-----|
| GET | `/api/inventory?productId=` | Listar stock |
| POST | `/api/inventory` `{ action: "sync" }` | Sincronizar con proveedor |
| POST | `/api/inventory` `{ action: "set", sku, available }` | Ajuste manual |
| POST | `/api/inventory/reserve` | `reserve` / `release` / `commit` |
| GET | `/api/supplier` | Catálogo + stock del proveedor |
| POST | `/api/supplier` | Crear orden al proveedor |

## Panel de administración

`/admin/inventario`: tabla de SKUs, ajuste manual y botón **Sync proveedor**.

## Tablas de tallas

Definidas en `src/data/sizeCharts.ts`: `ropa_unisex`, `pantalon`, `calzado`, `anillo`, `mascota`. Se asignan automáticamente por categoría/nombre y se muestran en la ficha de producto.

## Pasar a producción

1. Sustituye `DemoSupplier` en `src/lib/supplier.ts` por la API de tu proveedor (CJ, Zendrop, etc.).
2. Persiste el inventario en **Cloudflare KV o D1**: la memoria de proceso no es durable en Pages.
3. Protege `/admin/*` y los POST de inventario con autenticación.
