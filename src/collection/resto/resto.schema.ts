import * as mongoose from "mongoose";
import { Resto } from "./resto.interface";
import { userSchema } from "../user/user.schema";

export interface RestoDocument extends Resto, mongoose.Document {}

export const RestoSchema = new mongoose.Schema({
  user: { type: userSchema, required: true },
  pourcentage: { type: Number, required: true },
  address: { type: String, required: true },
});

export const RestoModel = mongoose.model<RestoDocument>(
  "Resto",
  RestoSchema,
);
