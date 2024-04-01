import { Schema, model, models } from "mongoose";

const ClothItemSchema = new Schema(
  {
    image: { type: String },
    name: { type: String },
    description: { type: String },
    basePrice: { type: Number },
  },
  { timestamps: true }
);

export const ClothItem =
  models?.ClothItem || model("ClothItem", ClothItemSchema);
