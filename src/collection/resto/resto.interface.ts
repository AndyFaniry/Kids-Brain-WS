import { User } from "../user/user.interface";

export interface Resto {
  _id?: any;
  user: User;
  pourcentage: number;
  address: String;
}
