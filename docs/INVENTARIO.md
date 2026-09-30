# Proveedor, inventario y tallas

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
| GET | `/api/supplier` | Catálogo + stock proveedor |
| POST | `/api/supplier` | Crear orden al proveedor |

## Admin UI

`/admin/inventario` — tabla de SKUs, ajuste manual y botón **Sync proveedor**.

## Tablas de tallas

Definidas en `src/data/sizeCharts.ts`:

- `ropa_unisex`, `pantalon`, `calzado`, `anillo`, `mascota`

Se asignan automáticamente por categoría/nombre y se muestran en la ficha de producto.

## Producción

1. Sustituye `DemoSupplier` en `src/lib/supplier.ts` por tu API (CJ, Zendrop, etc.).
2. Persiste inventario en **Cloudflare KV o D1** (la memoria de proceso no es durable en Pages).
3. Protege `/admin/*` y POST de inventario con autenticación.
