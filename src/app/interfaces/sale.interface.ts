export enum SaleType {
  UNIT = 'unit',
  AMOUNT = 'amount',
  WEIGHT = 'weight',
  PACKAGE_500 = 'package500',
  PACKAGE_1000 = 'package1000',
}

export interface SaleItem {
  cookieId: number;
  quantity: number;
  saleType: SaleType;
  total: number;
}

export interface Sale {
  id: number;
  date: Date;
  items: SaleItem[];
  total: number;
}
