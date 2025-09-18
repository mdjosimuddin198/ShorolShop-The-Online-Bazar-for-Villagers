import dbConnect from "@/lib/database/db";

const collection = await dbConnect("ShorolShop_products");
export const GET = async () => {
  const products = await collection.find().toArray();

  return Response.json(products);
};

export const POST = async (req) => {
  const productData = await req.json();
  const product = await collection.insertOne(productData);
  return Response.json(product);
};
