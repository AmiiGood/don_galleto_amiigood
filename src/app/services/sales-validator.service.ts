import { Injectable } from '@angular/core';
import { Cookie } from '../interfaces/cookie.interface';
import { SaleType } from '../interfaces/sale.interface';

@Injectable({
  providedIn: 'root',
})
export class SalesValidatorService {
  validateSale(
    cookie: Cookie,
    quantity: number,
    saleType: SaleType
  ): { isValid: boolean; message: string } {
    if (!cookie) {
      return { isValid: false, message: 'Galleta no encontrada' };
    }

    switch (saleType) {
      case SaleType.UNIT:
        return this.validateUnitSale(cookie, quantity);
      case SaleType.WEIGHT:
        return this.validateWeightSale(cookie, quantity);
      case SaleType.PACKAGE_500:
        return this.validatePackageSale(cookie, quantity, 500);
      case SaleType.PACKAGE_1000:
        return this.validatePackageSale(cookie, quantity, 1000);
      case SaleType.AMOUNT:
        return this.validateAmountSale(cookie, quantity);
      default:
        return { isValid: false, message: 'Tipo de venta inválido' };
    }
  }

  private validateUnitSale(
    cookie: Cookie,
    quantity: number
  ): { isValid: boolean; message: string } {
    if (quantity < 1) {
      return { isValid: false, message: 'La cantidad mínima es 1 unidad' };
    }
    if (quantity > cookie.stock) {
      return { isValid: false, message: 'Stock insuficiente' };
    }
    return { isValid: true, message: '' };
  }

  private validateWeightSale(
    cookie: Cookie,
    quantity: number
  ): { isValid: boolean; message: string } {
    const minWeight = cookie.weightPerUnit;
    if (quantity < minWeight) {
      return {
        isValid: false,
        message: `El peso mínimo es ${minWeight}g (1 unidad)`,
      };
    }
    const requiredUnits = Math.ceil(quantity / cookie.weightPerUnit);
    if (requiredUnits > cookie.stock) {
      return {
        isValid: false,
        message: 'Stock insuficiente para el peso solicitado',
      };
    }
    return { isValid: true, message: '' };
  }

  private validatePackageSale(
    cookie: Cookie,
    quantity: number,
    packageSize: number
  ): { isValid: boolean; message: string } {
    if (quantity < 1) {
      return { isValid: false, message: 'La cantidad mínima es 1 paquete' };
    }
    const unitsPerPackage = packageSize / cookie.weightPerUnit;
    const totalUnitsNeeded = unitsPerPackage * quantity;
    if (totalUnitsNeeded > cookie.stock) {
      return {
        isValid: false,
        message: 'Stock insuficiente para los paquetes solicitados',
      };
    }
    return { isValid: true, message: '' };
  }

  private validateAmountSale(
    cookie: Cookie,
    amount: number
  ): { isValid: boolean; message: string } {
    const unitPrice = cookie.price.unit;
    if (amount < unitPrice) {
      return {
        isValid: false,
        message: `El monto mínimo es $${unitPrice} (1 unidad)`,
      };
    }
    const unitsNeeded = Math.ceil(amount / unitPrice);
    if (unitsNeeded > cookie.stock) {
      return {
        isValid: false,
        message: 'Stock insuficiente para el monto solicitado',
      };
    }
    return { isValid: true, message: '' };
  }
}
