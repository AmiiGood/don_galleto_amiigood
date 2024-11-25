# Documentación API para Tienda de Galletas

## URLs Base

Todos los endpoints descritos a continuación son relativos a la URL base de la API.

## Resumen de Endpoints

### Ingredientes

URL Base: `/api/ingredients`

#### GET /api/ingredients

Devuelve una lista de todos los ingredientes.

**Ejemplo de Respuesta:**

```json
{
  "data": [
    {
      "id": 1,
      "nombre": "Harina",
      "stock": 1000,
      "unidad": "gramos",
      "stockMinimo": 500,
      "costo": 2.5,
      "fechaCreacion": "2024-03-25T10:00:00Z",
      "fechaActualizacion": "2024-03-25T10:00:00Z"
    }
  ],
  "total": 1
}
```

#### GET /api/ingredients/:id

Devuelve un solo ingrediente con la misma estructura que arriba.

#### POST /api/ingredients

Crea un nuevo ingrediente.

**Ejemplo del Body:**

```json
{
  "nombre": "Harina",
  "stock": 1000,
  "unidad": "gramos",
  "stockMinimo": 500,
  "costo": 2.5
}
```

#### PUT /api/ingredients/:id/stock

Actualiza el stock de un ingrediente.

**Ejemplo del Body:**

```json
{
  "cantidad": 100,
  "operacion": "agregar"
}
```

### Recetas

URL Base: `/api/recipes`

#### GET /api/recipes

Devuelve una lista de todas las recetas.

**Ejemplo de Respuesta:**

```json
{
  "data": [
    {
      "id": 1,
      "nombre": "Galletas de Chocolate",
      "ingredientes": [
        {
          "ingredienteId": 1,
          "cantidad": 200,
          "ingrediente": {
            "nombre": "Harina",
            "unidad": "gramos"
          }
        }
      ],
      "rendimiento": 24,
      "instrucciones": ["Mezclar ingredientes secos", "Agregar mantequilla derretida", "Hornear por 12 minutos"],
      "fechaCreacion": "2024-03-25T10:00:00Z",
      "fechaActualizacion": "2024-03-25T10:00:00Z"
    }
  ],
  "total": 1
}
```

### Galletas

URL Base: `/api/cookies`

#### GET /api/cookies

Devuelve una lista de todas las galletas.

**Ejemplo de Respuesta:**

```json
{
  "data": [
    {
      "id": 1,
      "nombre": "Galleta de Chocolate",
      "recetaId": 1,
      "descripcion": "Deliciosa galleta con chispas de chocolate",
      "imagen": "url_imagen",
      "precio": {
        "unidad": 1.5,
        "paquete500g": 12.0,
        "paquete1000g": 22.0,
        "precioPorGramo": 0.024
      },
      "stock": 100,
      "pesoPorUnidad": 30,
      "receta": {
        "nombre": "Galletas de Chocolate",
        "ingredientes": [
          {
            "ingredienteId": 1,
            "cantidad": 200
          }
        ]
      },
      "fechaCreacion": "2024-03-25T10:00:00Z",
      "fechaActualizacion": "2024-03-25T10:00:00Z"
    }
  ],
  "total": 1
}
```

### Producción

URL Base: `/api/production`

#### POST /api/production/batch

Crea un nuevo lote de producción.

**Ejemplo del Body:**

```json
{
  "galletaId": 1,
  "cantidad": 100
}
```

**Ejemplo de Respuesta:**

```json
{
  "id": 1,
  "galletaId": 1,
  "cantidad": 100,
  "ingredientesUsados": [
    {
      "ingredienteId": 1,
      "cantidad": 833.33,
      "nombre": "Harina"
    }
  ],
  "estado": "exitoso",
  "fechaCreacion": "2024-03-25T10:00:00Z"
}
```

### Ventas

URL Base: `/api/sales`

#### POST /api/sales

Crea una nueva venta.

**Ejemplo del Body:**

```json
{
  "items": [
    {
      "galletaId": 1,
      "cantidad": 5,
      "tipoVenta": "unidad",
      "precio": 1.5
    }
  ],
  "metodoPago": "efectivo"
}
```

**Ejemplo de Respuesta:**

```json
{
  "id": 1,
  "items": [
    {
      "galletaId": 1,
      "nombreGalleta": "Galleta de Chocolate",
      "cantidad": 5,
      "tipoVenta": "unidad",
      "precioUnitario": 1.5,
      "total": 7.5
    }
  ],
  "total": 7.5,
  "metodoPago": "efectivo",
  "fechaCreacion": "2024-03-25T10:00:00Z"
}
```

### Reportes

URL Base: `/api/reports`

#### GET /api/reports/inventory

Devuelve reporte de inventario.

**Parámetros de Consulta:**

- fechaInicio
- fechaFin

**Ejemplo de Respuesta:**

```json
{
  "ingredientes": [
    {
      "id": 1,
      "nombre": "Harina",
      "stockInicial": 1000,
      "stockActual": 166.67,
      "consumido": 833.33,
      "costo": 2.5
    }
  ],
  "periodo": {
    "inicio": "2024-03-01T00:00:00Z",
    "fin": "2024-03-25T23:59:59Z"
  }
}
```

#### GET /api/reports/sales

Devuelve reporte de ventas.

**Parámetros de Consulta:**

- fechaInicio
- fechaFin

**Ejemplo de Respuesta:**

```json
{
  "ventasTotales": 50,
  "ingresoTotal": 75.0,
  "ventasPorProducto": [
    {
      "galletaId": 1,
      "nombreGalleta": "Galleta de Chocolate",
      "unidadesVendidas": 50,
      "ingreso": 75.0
    }
  ],
  "ventasPorTipo": [
    {
      "tipo": "unidad",
      "cantidad": 50,
      "ingreso": 75.0
    }
  ],
  "periodo": {
    "inicio": "2024-03-01T00:00:00Z",
    "fin": "2024-03-25T23:59:59Z"
  }
}
```

## Manejo de Errores

Todos los endpoints devuelven errores en el siguiente formato:

```json
{
  "error": {
    "codigo": "STOCK_INSUFICIENTE",
    "mensaje": "No hay suficiente stock del ingrediente",
    "detalles": {
      "ingredienteId": 1,
      "stockActual": 100,
      "stockRequerido": 200
    }
  }
}
```
