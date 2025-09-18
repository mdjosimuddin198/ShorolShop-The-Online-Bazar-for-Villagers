import dbConnect from "@/lib/database/db";
import DammyData from "@/public/DammyData.json";
import { ObjectId } from "mongodb";

const collection = await dbConnect("ShorolShop_products");
export const GET = async (req, { params }) => {
  const { id } = await params;
  console.log(params);

  const product = await collection.findOne({ _id: new ObjectId(id) });

  if (!product) {
    return new Response(JSON.stringify({ message: "faild to find product " }));
  }

  return new Response(JSON.stringify(product));
};

export const DELETE = async (req, { params }) => {
  const { id } = await params;
  const delProduct = await collection.deleteOne({ _id: new ObjectId(id) });
  return new Response("delete succssfully");
};
