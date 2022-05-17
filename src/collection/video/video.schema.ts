import * as mongoose from "mongoose";
import { Video } from "./video.interface";

export interface VideoDocument extends Video, mongoose.Document {}

export const videoSchema = new mongoose.Schema({
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  login: { type: String, required: true ,unique: true},
  password: { type: String, required: true },
});

export const videoModel = mongoose.model<VideoDocument>(
  "Video",
  videoSchema,
);
