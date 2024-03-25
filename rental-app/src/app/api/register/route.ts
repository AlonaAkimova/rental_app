import mongoose from "mongoose";
import { User } from "./../../../models/User";

export async function POST(req: any) {
  const body = await req.json();

  if (!process.env.MONGO_URL) {
    throw new Error("MongoDB connection URL is not defined.");
  }

  await mongoose.connect(process.env.MONGO_URL);
  const createdUser = await User.create(body);

  return Response.json(createdUser);
}
