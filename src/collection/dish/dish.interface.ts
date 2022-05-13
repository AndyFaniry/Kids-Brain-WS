import { Resto } from "../resto/resto.interface";

export interface DishType {
    _id?: any;
    resto: Resto,
    code: String;
    image: String;
    name: String;
    pR: Number;
    pV: Number;
    visibility: Boolean;
  }
  