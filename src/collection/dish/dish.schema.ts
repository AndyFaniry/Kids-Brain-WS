import * as mongoose from "mongoose";
import { DishType } from "./dish.interface";
import { RestoSchema } from "../resto/resto.schema";

export interface DishDocument extends DishType, mongoose.Document {}

export const DishTypeSchema = new mongoose.Schema({
  resto: { type: RestoSchema, required: true },
  code: { type: String, required: true },
  image: { type: String, required: true },
  name: { type: String, required: true },
  pR: { type: Number, required: true },
  pV: { type: Number, required: true },
  visibility: { type: Boolean, required: true },
});


export const DishModel = mongoose.model<DishDocument>(
  "Dish",
  DishTypeSchema,
);
