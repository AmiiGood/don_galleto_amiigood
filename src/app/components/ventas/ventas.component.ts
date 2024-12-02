import { Component, OnInit } from '@angular/core';
import { SaleItem, SaleType } from '../../interfaces/sale.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cookie } from '../../interfaces/cookie.interface';
import { SalesService } from '../../services/sales.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css',
})
export class VentasComponent implements OnInit {
  SaleType = SaleType;
  saleForm: FormGroup;
  cookies: Cookie[] = [];
  currentItems: SaleItem[] = [];
  saleTypes = [
    { value: SaleType.UNIT, label: '🛍️ Por unidad' },
    { value: SaleType.WEIGHT, label: '⚖️ Por peso (g)' },
    { value: SaleType.PACKAGE_500, label: '📦 Paquete 500g' },
    { value: SaleType.PACKAGE_1000, label: '📦 Paquete 1000g' },
    { value: SaleType.AMOUNT, label: '💰 Por monto' },
  ];

  constructor(private fb: FormBuilder, private salesService: SalesService) {
    this.saleForm = this.fb.group({
      cookieId: [null, Validators.required],
      saleType: [SaleType.UNIT, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.cookies = this.salesService.getCookies();
    this.salesService
      .getCurrentSaleItems()
      .subscribe((items) => (this.currentItems = items));
  }

  addItem(): void {
    if (this.saleForm.valid) {
      const { cookieId, saleType, quantity } = this.saleForm.value;
      const total = this.salesService.calculateTotal(
        cookieId,
        quantity,
        saleType
      );

      this.salesService.addToSale({
        cookieId,
        saleType,
        quantity,
        total,
      });

      this.saleForm.patchValue({ quantity: 1 });
    }
  }

  getCookieName(id: number): string {
    return this.cookies.find((c) => c.id === id)?.name || '';
  }

  getItemDescription(item: SaleItem): string {
    switch (item.saleType) {
      case SaleType.UNIT:
        return `${item.quantity} unidades`;
      case SaleType.WEIGHT:
        return `${item.quantity}g`;
      case SaleType.PACKAGE_500:
        return `${item.quantity} paquetes de 500g`;
      case SaleType.PACKAGE_1000:
        return `${item.quantity} paquetes de 1000g`;
      case SaleType.AMOUNT:
        return `$${item.quantity}`;
      default:
        return '';
    }
  }

  getCurrentTotal(): number {
    return this.currentItems.reduce((sum, item) => sum + item.total, 0);
  }

  clearSale(): void {
    this.salesService.clearSale();
  }

  completeSale(): void {
    this.salesService.completeSale();
  }
}
