# API Documentation for Cookie Shop

## Base URLs

All endpoints described below are relative to the API base URL.

## Endpoints Overview

### Ingredients

Base URL: `/api/ingredients`

#### GET /api/ingredients

Returns a list of all ingredients.

**Response:**

```typescript
interface GetIngredientsResponse {
  data: {
    id: number;
    name: string;
    stock: number;
    unit: string;
    minimumStock: number;
    cost: number;
    createdAt: string;
    updatedAt: string;
  }[];
  total: number;
}
```

#### GET /api/ingredients/:id

Returns a single ingredient with the same structure as above.

#### POST /api/ingredients

Creates a new ingredient.

**Request Body:**

```typescript
interface CreateIngredientRequest {
  name: string;
  stock: number;
  unit: string;
  minimumStock: number;
  cost: number;
}
```

#### PUT /api/ingredients/:id/stock

Updates the stock of an ingredient.

**Request Body:**

```typescript
interface UpdateStockRequest {
  quantity: number;
  operation: "add" | "subtract";
}
```

### Recipes

Base URL: `/api/recipes`

#### GET /api/recipes

Returns a list of all recipes.

**Response:**

```typescript
interface GetRecipesResponse {
  data: {
    id: number;
    name: string;
    ingredients: {
      ingredientId: number;
      quantity: number;
      ingredient: {
        name: string;
        unit: string;
      };
    }[];
    yield: number;
    instructions: string[];
    createdAt: string;
    updatedAt: string;
  }[];
  total: number;
}
```

### Cookies

Base URL: `/api/cookies`

#### GET /api/cookies

Returns a list of all cookies.

**Response:**

```typescript
interface GetCookiesResponse {
  data: {
    id: number;
    name: string;
    recipeId: number;
    description: string;
    image: string;
    price: {
      unit: number;
      package500g: number;
      package1000g: number;
      pricePerGram: number;
    };
    stock: number;
    weightPerUnit: number;
    recipe: {
      name: string;
      ingredients: {
        ingredientId: number;
        quantity: number;
      }[];
    };
    createdAt: string;
    updatedAt: string;
  }[];
  total: number;
}
```

### Production

Base URL: `/api/production`

#### POST /api/production/batch

Creates a new production batch.

**Request Body:**

```typescript
interface CreateProductionBatchRequest {
  cookieId: number;
  quantity: number; // Number of cookies to produce
}
```

**Response:**

```typescript
interface ProductionBatchResponse {
  id: number;
  cookieId: number;
  quantity: number;
  ingredientsUsed: {
    ingredientId: number;
    quantity: number;
    name: string;
  }[];
  status: "success" | "insufficient_ingredients";
  createdAt: string;
}
```

### Sales

Base URL: `/api/sales`

#### POST /api/sales

Creates a new sale.

**Request Body:**

```typescript
interface CreateSaleRequest {
  items: {
    cookieId: number;
    quantity: number;
    saleType: "unit" | "amount" | "weight" | "package500" | "package1000";
    price: number;
  }[];
  paymentMethod: "cash" | "card";
}
```

**Response:**

```typescript
interface SaleResponse {
  id: number;
  items: {
    cookieId: number;
    cookieName: string;
    quantity: number;
    saleType: string;
    unitPrice: number;
    total: number;
  }[];
  total: number;
  paymentMethod: string;
  createdAt: string;
}
```

### Reports

Base URL: `/api/reports`

#### GET /api/reports/inventory

Returns inventory report.

**Query Parameters:**

- startDate
- endDate

**Response:**

```typescript
interface InventoryReportResponse {
  ingredients: {
    id: number;
    name: string;
    initialStock: number;
    currentStock: number;
    consumed: number;
    cost: number;
  }[];
  period: {
    start: string;
    end: string;
  };
}
```

#### GET /api/reports/sales

Returns sales report.

**Query Parameters:**

- startDate
- endDate

**Response:**

```typescript
interface SalesReportResponse {
  totalSales: number;
  totalRevenue: number;
  salesByProduct: {
    cookieId: number;
    cookieName: string;
    unitsSold: number;
    revenue: number;
  }[];
  salesByType: {
    type: string;
    quantity: number;
    revenue: number;
  }[];
  period: {
    start: string;
    end: string;
  };
}
```

## Common Features

### Pagination

All list endpoints support pagination with the following query parameters:

- page: Page number (default: 1)
- limit: Items per page (default: 10)
- sort: Field to sort by
- order: Sort order ('asc' or 'desc')

Example: `/api/cookies?page=1&limit=10&sort=createdAt&order=desc`

### Authentication

All endpoints require authentication using JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

### Error Responses

All endpoints return errors in the following format:

```typescript
interface ErrorResponse {
  error: {
    code: string;
    message: string;
    details?: any;
  };
}
```
