import mongoose from "mongoose";
import { ClothItem } from "@/models/ClothItem";

export async function POST(req) {
  mongoose.connect(process.env.MONGO_URL);
  const data = await req.json();
  const clothItemDoc = await ClothItem.create(data);
  return Response.json(clothItemDoc);
}

export async function GET(req) {
  mongoose.connect(process.env.MONGO_URL);
  return Response.json(await ClothItem.find());
}
