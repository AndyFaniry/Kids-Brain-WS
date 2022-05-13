import { DishType } from "../dish/dish.interface";
import { User } from "../user/user.interface";

export const DELIVERY_PRICE: Number = 3000;

export interface DetailType {
  dish: DishType;
  qty: Number;
}

export interface Commande {
  _id?: any;
  date: Date;
  etat: Boolean;
  detail: DetailType[];
  client: User;
  delivery_man: User;
  delivery_price: Number;
  delivery_place: String;
}
