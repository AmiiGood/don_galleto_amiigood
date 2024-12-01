import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  CookieProduction,
  ProductionStatus,
} from '../interfaces/production.interface';
import { CookiesService } from './cookies.service';
import { Cookie } from '../interfaces/cookie.interface';
import { Recipe } from '../interfaces/recipe.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ProductionService {
  private productionStatus = new BehaviorSubject<ProductionStatus>({
    preparacion: [],
    horneado: [],
    enfriamiento: [],
    lista: [],
  });

  constructor(
    private cookiesService: CookiesService,
    private snackBar: MatSnackBar
  ) {}

  addCookieToProduction(cookie: Cookie): void {
    const cookieInProduction: CookieProduction = {
      ...cookie,
      productionStatus: 'preparacion',
    };

    const currentStatus = this.productionStatus.value;
    currentStatus.preparacion.push(cookieInProduction);
    this.productionStatus.next(currentStatus);

    this.deductIngredients(cookie);
  }

  getRecipe(recipeId: number): Recipe | undefined {
    return this.cookiesService.getRecipeById(recipeId);
  }

  getIngredientInfo(ingredientId: number) {
    return this.cookiesService.getIngredientInfo(ingredientId);
  }

  addToStock(cookie: CookieProduction): void {
    // Obtener la receta para saber cuántas unidades se producen
    const recipe = this.getRecipe(cookie.recipeId);
    if (recipe) {
      const unitsProduced = recipe.yield;
      this.cookiesService.updateCookieStock(cookie.id, unitsProduced);

      // Si la galleta estaba agotada, actualizar su estado
      if (cookie.status === 'Agotado') {
        this.cookiesService.updateCookieStatus(cookie.id, 'Existencia');
      }
    }
  }

  private deductIngredients(cookie: Cookie): void {
    const recipe = this.cookiesService.getRecipeById(cookie.recipeId);
    if (recipe) {
      recipe.ingredients.forEach((ingredient) => {
        this.cookiesService.updateIngredientStock(
          ingredient.ingredientId,
          -ingredient.quantity
        );
      });
    }
  }

  updateCookieStatus(
    cookie: CookieProduction,
    newStatus: keyof ProductionStatus
  ): void {
    const currentStatus = this.productionStatus.value;
    const statusKeys: (keyof ProductionStatus)[] = [
      'preparacion',
      'horneado',
      'enfriamiento',
      'lista',
    ];

    statusKeys.forEach((status) => {
      currentStatus[status] = currentStatus[status].filter(
        (c) => c.id !== cookie.id
      );
    });

    cookie.productionStatus = newStatus;
    currentStatus[newStatus].push(cookie);
    this.productionStatus.next(currentStatus);
  }

  getProductionStatus(): Observable<ProductionStatus> {
    return this.productionStatus.asObservable();
  }

  completeCookieProduction(cookie: CookieProduction): void {
    const recipe = this.getRecipe(cookie.recipeId);
    if (recipe) {
      // Actualizar stock y estado
      const unitsProduced = recipe.yield;
      this.cookiesService.updateCookieStock(cookie.id, unitsProduced);

      if (cookie.status === 'Agotado') {
        this.cookiesService.updateCookieStatus(cookie.id, 'Existencia');
      }

      // Remover de la producción
      const currentStatus = this.productionStatus.value;
      currentStatus.lista = currentStatus.lista.filter(
        (c) => c.id !== cookie.id
      );
      this.productionStatus.next(currentStatus);

      // Mostrar mensaje de éxito
      this.snackBar.open(
        `¡${cookie.name} completada! Se agregaron ${unitsProduced} unidades al inventario`,
        'Cerrar',
        { duration: 3000 }
      );
    }
  }

  deleteCookieFromProduction(cookie: CookieProduction): void {
    // Obtener el estado actual
    const currentStatus = this.productionStatus.value;

    // Encontrar y eliminar la galleta de su estado actual
    const statusKeys: (keyof ProductionStatus)[] = [
      'preparacion',
      'horneado',
      'enfriamiento',
      'lista',
    ];

    statusKeys.forEach((status) => {
      currentStatus[status] = currentStatus[status].filter(
        (c) => c.id !== cookie.id
      );
    });

    // Actualizar el estado
    this.productionStatus.next(currentStatus);

    // Si ya se habían deducido ingredientes, devolverlos al inventario
    const recipe = this.getRecipe(cookie.recipeId);
    if (recipe) {
      recipe.ingredients.forEach((ingredient) => {
        // Devolver los ingredientes al stock
        this.cookiesService.updateIngredientStock(
          ingredient.ingredientId,
          ingredient.quantity // Suma positiva para devolver al inventario
        );
      });
    }

    // Mostrar mensaje de confirmación
    this.snackBar.open(
      `La producción de ${cookie.name} ha sido cancelada`,
      'Cerrar',
      { duration: 3000 }
    );
  }
}
