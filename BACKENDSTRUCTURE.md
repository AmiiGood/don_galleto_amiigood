# Documentación API para Tienda de Galletas

## URLs Base

Todos los endpoints descritos a continuación son relativos a la URL base de la API.

## Resumen de Endpoints

### Ingredientes

URL Base: `/api/ingredients`

#### GET /api/ingredients

Devuelve una lista de todos los ingredientes.

**Respuesta:**

```typescript
interface RespuestaObtenerIngredientes {
  data: {
    id: number;
    nombre: string;
    stock: number;
    unidad: string;
    stockMinimo: number;
    costo: number;
    fechaCreacion: string;
    fechaActualizacion: string;
  }[];
  total: number;
}
```

#### GET /api/ingredients/:id

Devuelve un solo ingrediente con la misma estructura que arriba.

#### POST /api/ingredients

Crea un nuevo ingrediente.

**Cuerpo de la Solicitud:**

```typescript
interface SolicitudCrearIngrediente {
  nombre: string;
  stock: number;
  unidad: string;
  stockMinimo: number;
  costo: number;
}
```

#### PUT /api/ingredients/:id/stock

Actualiza el stock de un ingrediente.

**Cuerpo de la Solicitud:**

```typescript
interface SolicitudActualizarStock {
  cantidad: number;
  operacion: "agregar" | "restar";
}
```

### Recetas

URL Base: `/api/recipes`

#### GET /api/recipes

Devuelve una lista de todas las recetas.

**Respuesta:**

```typescript
interface RespuestaObtenerRecetas {
  data: {
    id: number;
    nombre: string;
    ingredientes: {
      ingredienteId: number;
      cantidad: number;
      ingrediente: {
        nombre: string;
        unidad: string;
      };
    }[];
    rendimiento: number;
    instrucciones: string[];
    fechaCreacion: string;
    fechaActualizacion: string;
  }[];
  total: number;
}
```

### Galletas

URL Base: `/api/cookies`

#### GET /api/cookies

Devuelve una lista de todas las galletas.

**Respuesta:**

```typescript
interface RespuestaObtenerGalletas {
  data: {
    id: number;
    nombre: string;
    recetaId: number;
    descripcion: string;
    imagen: string;
    precio: {
      unidad: number;
      paquete500g: number;
      paquete1000g: number;
      precioPorGramo: number;
    };
    stock: number;
    pesoPorUnidad: number;
    receta: {
      nombre: string;
      ingredientes: {
        ingredienteId: number;
        cantidad: number;
      }[];
    };
    fechaCreacion: string;
    fechaActualizacion: string;
  }[];
  total: number;
}
```

### Producción

URL Base: `/api/production`

#### POST /api/production/batch

Crea un nuevo lote de producción.

**Cuerpo de la Solicitud:**

```typescript
interface SolicitudCrearLoteProduccion {
  galletaId: number;
  cantidad: number; // Cantidad de galletas a producir
}
```

**Respuesta:**

```typescript
interface RespuestaLoteProduccion {
  id: number;
  galletaId: number;
  cantidad: number;
  ingredientesUsados: {
    ingredienteId: number;
    cantidad: number;
    nombre: string;
  }[];
  estado: "exitoso" | "ingredientes_insuficientes";
  fechaCreacion: string;
}
```

### Ventas

URL Base: `/api/sales`

#### POST /api/sales

Crea una nueva venta.

**Cuerpo de la Solicitud:**

```typescript
interface SolicitudCrearVenta {
  items: {
    galletaId: number;
    cantidad: number;
    tipoVenta: "unidad" | "monto" | "peso" | "paquete500" | "paquete1000";
    precio: number;
  }[];
  metodoPago: "efectivo" | "tarjeta";
}
```

**Respuesta:**

```typescript
interface RespuestaVenta {
  id: number;
  items: {
    galletaId: number;
    nombreGalleta: string;
    cantidad: number;
    tipoVenta: string;
    precioUnitario: number;
    total: number;
  }[];
  total: number;
  metodoPago: string;
  fechaCreacion: string;
}
```

### Reportes

URL Base: `/api/reports`

#### GET /api/reports/inventory

Devuelve reporte de inventario.

**Parámetros de Consulta:**

- fechaInicio
- fechaFin

**Respuesta:**

```typescript
interface RespuestaReporteInventario {
  ingredientes: {
    id: number;
    nombre: string;
    stockInicial: number;
    stockActual: number;
    consumido: number;
    costo: number;
  }[];
  periodo: {
    inicio: string;
    fin: string;
  };
}
```

#### GET /api/reports/sales

Devuelve reporte de ventas.

**Parámetros de Consulta:**

- fechaInicio
- fechaFin

**Respuesta:**

```typescript
interface RespuestaReporteVentas {
  ventasTotales: number;
  ingresoTotal: number;
  ventasPorProducto: {
    galletaId: number;
    nombreGalleta: string;
    unidadesVendidas: number;
    ingreso: number;
  }[];
  ventasPorTipo: {
    tipo: string;
    cantidad: number;
    ingreso: number;
  }[];
  periodo: {
    inicio: string;
    fin: string;
  };
}
```

## Manejo de Errores

Todos los endpoints devuelven errores en el siguiente formato:

```typescript
interface RespuestaError {
  error: {
    codigo: string;
    mensaje: string;
    detalles?: any;
  };
}
```
