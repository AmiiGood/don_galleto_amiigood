# API Endpoints para Sistema de Producción de Galletas

## Cookies

### GET /api/cookies

Obtiene todas las galletas disponibles.

**Response 200:**

```json
{
  "cookies": [
    {
      "id": number,
      "name": string,
      "recipeId": number,
      "description": string,
      "status": string,
      "price": {
        "unit": number,
        "package500g": number,
        "package1000g": number,
        "pricePerGram": number
      },
      "stock": number,
      "weightPerUnit": number
    }
  ]
}
```

### PATCH /api/cookies/{id}/stock

Actualiza el stock de una galleta.

**Request Body:**

```json
{
  "quantity": number  // Puede ser positivo o negativo
}
```

**Response 200:**

```json
{
  "id": number,
  "stock": number,
  "status": string
}
```

### PATCH /api/cookies/{id}/status

Actualiza el estado de una galleta.

**Request Body:**

```json
{
  "status": string  // "Existencia" o "Agotado"
}
```

**Response 200:**

```json
{
  "id": number,
  "status": string
}
```

## Recipes

### GET /api/recipes/{id}

Obtiene una receta específica.

**Response 200:**

```json
{
  "id": number,
  "name": string,
  "ingredients": [
    {
      "ingredientId": number,
      "quantity": number
    }
  ],
  "yield": number,
  "instructions": string[]
}
```

### GET /api/recipes/{id}/availability

Verifica la disponibilidad de ingredientes para una receta.

**Response 200:**

```json
{
  "available": boolean,
  "missingIngredients": [
    {
      "ingredientId": number,
      "name": string,
      "required": number,
      "available": number
    }
  ]
}
```

## Ingredients

### GET /api/ingredients

Obtiene todos los ingredientes.

**Response 200:**

```json
{
  "ingredients": [
    {
      "id": number,
      "name": string,
      "stock": number,
      "unit": string,
      "minimumStock": number,
      "cost": number
    }
  ]
}
```

### GET /api/ingredients/{id}

Obtiene un ingrediente específico.

**Response 200:**

```json
{
  "id": number,
  "name": string,
  "stock": number,
  "unit": string,
  "minimumStock": number,
  "cost": number
}
```

### PATCH /api/ingredients/{id}/stock

Actualiza el stock de un ingrediente.

**Request Body:**

```json
{
  "quantity": number  // Puede ser positivo o negativo
}
```

**Response 200:**

```json
{
  "id": number,
  "stock": number,
  "belowMinimum": boolean
}
```

## Production

### GET /api/production/status

Obtiene el estado actual de la producción.

**Response 200:**

```json
{
  "preparacion": CookieProduction[],
  "horneado": CookieProduction[],
  "enfriamiento": CookieProduction[],
  "lista": CookieProduction[]
}
```

### POST /api/production/cookies

Añade una galleta a producción.

**Request Body:**

```json
{
  "cookieId": number
}
```

**Response 200:**

```json
{
  "productionStatus": ProductionStatus
}
```

### PATCH /api/production/cookies/{id}/status

Actualiza el estado de una galleta en producción.

**Request Body:**

```json
{
  "newStatus": "preparacion" | "horneado" | "enfriamiento" | "lista"
}
```

**Response 200:**

```json
{
  "productionStatus": ProductionStatus
}
```

### POST /api/production/cookies/{id}/complete

Completa la producción de una galleta.

**Response 200:**

```json
{
  "cookieId": number,
  "unitsProduced": number,
  "newStock": number,
  "status": string
}
```

## Sales

### GET /api/sales

Obtiene todas las ventas realizadas.
**Response 200:**

```json
{
  "sales": [
    {
      "id": number,
      "date": string,
      "items": SaleItem[],
      "total": number
    }
  ]
}
```

### POST /api/sales

Crea una nueva venta.
**Request Body:**

```json
{
  "items": [
    {
      "cookieId": number,
      "quantity": number,
      "saleType": "UNIT" | "WEIGHT" | "PACKAGE_500" | "PACKAGE_1000" | "AMOUNT",
      "total": number
    }
  ]
}
```

**Response 200:**

```json
{
  "id": number,
  "date": string,
  "items": SaleItem[],
  "total": number
}
```

### GET /api/sales/validate

Valida una venta potencial.
**Request Body:**

```json
{
  "cookieId": number,
  "quantity": number,
  "saleType": "UNIT" | "WEIGHT" | "PACKAGE_500" | "PACKAGE_1000" | "AMOUNT"
}
```

**Response 200:**

```json
{
  "isValid": boolean,
  "message": string,
  "actualQuantity": number,
  "total": number
}
```

### DELETE /api/sales/{id}

Cancela una venta específica.
**Response 200:**

```json
{
  "success": boolean,
  "message": string
}
```

## Tipos de Datos Comunes

```typescript
interface ProductionStatus {
  preparacion: CookieProduction[];
  horneado: CookieProduction[];
  enfriamiento: CookieProduction[];
  lista: CookieProduction[];
}

interface CookieProduction extends Cookie {
  productionStatus: "preparacion" | "horneado" | "enfriamiento" | "lista";
}
```
