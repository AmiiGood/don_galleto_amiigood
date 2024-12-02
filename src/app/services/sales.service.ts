import { Injectable } from '@angular/core';
import { COOKIES } from '../mocks/cookies.mock';
import { Cookie } from '../interfaces/cookie.interface';
import { Sale, SaleItem, SaleType } from '../interfaces/sale.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { SalesValidatorService } from './sales-validator.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  private cookies: Cookie[] = COOKIES;
  private sales: Sale[] = [];
  private currentSaleItems = new BehaviorSubject<SaleItem[]>([]);

  constructor(private snackBar: MatSnackBar) {}

  getCurrentSaleItems(): Observable<SaleItem[]> {
    return this.currentSaleItems.asObservable();
  }

  getCookies(): Cookie[] {
    return this.cookies.filter((cookie) => cookie.stock > 0);
  }

  private calculateRequiredCookies(
    cookie: Cookie,
    quantity: number,
    saleType: SaleType
  ): number {
    switch (saleType) {
      case SaleType.UNIT:
        return quantity;
      case SaleType.WEIGHT:
        return Math.ceil(quantity / cookie.weightPerUnit);
      case SaleType.PACKAGE_500:
        return Math.ceil((500 / cookie.weightPerUnit) * quantity);
      case SaleType.PACKAGE_1000:
        return Math.ceil((1000 / cookie.weightPerUnit) * quantity);
      case SaleType.AMOUNT:
        return Math.ceil(quantity / cookie.price.unit);
      default:
        return 0;
    }
  }

  private calculateActualQuantity(
    cookie: Cookie,
    quantity: number,
    saleType: SaleType
  ): number {
    const requiredCookies = this.calculateRequiredCookies(
      cookie,
      quantity,
      saleType
    );

    switch (saleType) {
      case SaleType.UNIT:
        return quantity;
      case SaleType.WEIGHT:
        return requiredCookies * cookie.weightPerUnit;
      case SaleType.PACKAGE_500:
      case SaleType.PACKAGE_1000:
        return quantity;
      case SaleType.AMOUNT:
        return requiredCookies * cookie.price.unit;
      default:
        return 0;
    }
  }

  calculateTotal(
    cookieId: number,
    quantity: number,
    saleType: SaleType
  ): number {
    const cookie = this.cookies.find((c) => c.id === cookieId);
    if (!cookie) return 0;

    const actualQuantity = this.calculateActualQuantity(
      cookie,
      quantity,
      saleType
    );

    switch (saleType) {
      case SaleType.UNIT:
        return cookie.price.unit * quantity;
      case SaleType.WEIGHT:
        return cookie.price.pricePerGram * actualQuantity;
      case SaleType.PACKAGE_500:
        return cookie.price.package500g * quantity;
      case SaleType.PACKAGE_1000:
        return cookie.price.package1000g * quantity;
      case SaleType.AMOUNT:
        return actualQuantity;
      default:
        return 0;
    }
  }

  private validateSale(
    cookie: Cookie,
    quantity: number,
    saleType: SaleType
  ): { isValid: boolean; message: string; actualQuantity?: number } {
    if (!cookie) {
      return { isValid: false, message: 'Galleta no encontrada' };
    }

    const requiredCookies = this.calculateRequiredCookies(
      cookie,
      quantity,
      saleType
    );
    const actualQuantity = this.calculateActualQuantity(
      cookie,
      quantity,
      saleType
    );

    if (requiredCookies > cookie.stock) {
      return { isValid: false, message: 'Stock insuficiente' };
    }

    switch (saleType) {
      case SaleType.UNIT:
        if (quantity < 1) {
          return { isValid: false, message: 'La cantidad mínima es 1 unidad' };
        }
        break;
      case SaleType.WEIGHT:
        if (quantity < cookie.weightPerUnit) {
          return {
            isValid: false,
            message: `El peso mínimo es ${cookie.weightPerUnit}g (1 unidad)`,
          };
        }
        if (actualQuantity !== quantity) {
          return {
            isValid: true,
            message: `Se ajustó la cantidad a ${actualQuantity}g (${requiredCookies} galletas)`,
            actualQuantity,
          };
        }
        break;
      case SaleType.AMOUNT:
        if (quantity < cookie.price.unit) {
          return {
            isValid: false,
            message: `El monto mínimo es $${cookie.price.unit} (1 unidad)`,
          };
        }
        if (actualQuantity !== quantity) {
          return {
            isValid: true,
            message: `Se ajustó el monto a $${actualQuantity} (${requiredCookies} galletas)`,
            actualQuantity,
          };
        }
        break;
      case SaleType.PACKAGE_500:
      case SaleType.PACKAGE_1000:
        if (quantity < 1) {
          return { isValid: false, message: 'La cantidad mínima es 1 paquete' };
        }
        break;
    }

    return { isValid: true, message: '', actualQuantity };
  }

  addToSale(item: SaleItem): void {
    const cookie = this.cookies.find((c) => c.id === item.cookieId);
    const validation = this.validateSale(cookie!, item.quantity, item.saleType);

    if (!validation.isValid) {
      this.showNotification(validation.message, true);
      return;
    }

    if (validation.actualQuantity) {
      item.quantity = validation.actualQuantity;
      item.total = this.calculateTotal(
        item.cookieId,
        item.quantity,
        item.saleType
      );
    }

    const currentItems = this.currentSaleItems.value;
    const existingItemIndex = currentItems.findIndex(
      (i) => i.cookieId === item.cookieId && i.saleType === item.saleType
    );

    if (existingItemIndex !== -1) {
      currentItems[existingItemIndex].quantity += item.quantity;
      currentItems[existingItemIndex].total += item.total;
    } else {
      currentItems.push(item);
    }

    this.currentSaleItems.next(currentItems);
    if (validation.actualQuantity) {
      this.showNotification(validation.message);
    } else {
      this.showNotification('Producto agregado al carrito');
    }
  }

  completeSale(): void {
    const items = this.currentSaleItems.value;
    if (items.length === 0) return;

    const sale: Sale = {
      id: this.sales.length + 1,
      date: new Date(),
      items,
      total: items.reduce((sum, item) => sum + item.total, 0),
    };

    items.forEach((item) => {
      const cookie = this.cookies.find((c) => c.id === item.cookieId);
      if (cookie) {
        const stockReduction = this.calculateRequiredCookies(
          cookie,
          item.quantity,
          item.saleType
        );
        cookie.stock -= stockReduction;
      }
    });

    this.sales.push(sale);
    this.currentSaleItems.next([]);
    this.showNotification('Venta completada exitosamente');
  }

  private showNotification(message: string, isError: boolean = false) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      panelClass: [isError ? 'error-snackbar' : 'success-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  clearSale(): void {
    this.currentSaleItems.next([]);
  }
}
