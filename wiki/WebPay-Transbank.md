# 6. WebPay (Transbank)

La tienda usa **Transbank WebPay Plus REST v1.2**. La configuración vive en `src/lib/webpay.ts` y los endpoints en `src/pages/api/webpay/`.

## Flujo

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

| Paso | Qué ocurre |
|------|-----------|
| 1 | El cliente hace `POST /api/webpay/create` (`create.ts`) |
| 2 | kadmiel.cl crea la transacción en Transbank y recibe `token` + `url` |
| 3 | El cliente es redirigido por POST con `token_ws` a WebPay y paga allí |
| 4 | Transbank vuelve a la `return_url` |
| 5 | kadmiel.cl confirma con `PUT commit` (`commit.ts`) |
| 6 | Con la respuesta `AUTHORIZED`, el cliente ve `/checkout/resultado` |

## Entornos

`WEBPAY_ENV` define el entorno: `integration` (sandbox, no cobra dinero real) o `production`. Ver [Variables de entorno](Variables-de-entorno).

## Tarjetas de prueba (solo `integration`)

| Resultado | Número de tarjeta | CVV | Autenticación |
|-----------|-------------------|-----|---------------|
| **Aprobada** | `4051885600446623` | `123` | RUT `11.111.111-1` · clave `123` |
| **Rechazada** | `5186059559590568` | `123` | Igual |

## Documentación oficial

<https://www.transbankdevelopers.cl/documentacion/webpay-plus>

---
Anterior: [Variables de entorno](Variables-de-entorno) · Siguiente: [CI/CD](CI-CD)
