import { Cookie } from "./cookie.interface";

export interface ProductionStatus {
  preparacion: CookieProduction[];
  horneado: CookieProduction[];
  enfriamiento: CookieProduction[];
  lista: CookieProduction[];
}

export type ProductionStatusType =
  | 'preparacion'
  | 'horneado'
  | 'enfriamiento'
  | 'lista';

export interface CookieProduction extends Cookie {
  productionStatus: ProductionStatusType;
}
