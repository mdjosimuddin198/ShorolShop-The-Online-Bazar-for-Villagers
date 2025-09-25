import dbConnect from "@/lib/database/db";

const collection = await dbConnect("ShorolShop_products");
export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const limit = parseInt(searchParams.get("limit"));
  let products;
  if (limit) {
    products = await collection.find().limit(limit).toArray();
  } else {
    products = await collection.find().toArray();
  }

  return Response.json(products);
};

export const POST = async (req) => {
  const productData = await req.json();
  const product = await collection.insertOne(productData);
  return Response.json(product);
};
