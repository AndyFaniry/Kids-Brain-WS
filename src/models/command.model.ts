import { Resto } from "../collection/resto/resto.interface";

export interface DetailRequest {
  dishTypeId: String;
  qty: Number;
}

export interface DailyBenefit {
  date: String;
  benefit: number;
}

export interface RestauBenefit {
  resto: Resto;
  benefit: Number;
}
