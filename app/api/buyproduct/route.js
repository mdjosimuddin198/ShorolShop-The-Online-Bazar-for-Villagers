import dbConnect from "@/lib/database/db";

const collection = await dbConnect("MyOrder");

export const GET = async () => {
  const myOrders = await collection.find().toArray();
  return Response.json(myOrders);
};

export const POST = async (req) => {
  const order = await req.json();
  const { productId } = order;

  const existingOrder = await collection.findOne({
    productId,
  });
  if (existingOrder) {
    return Response.json({
      message: "You have already ordered this product",
      status: 400,
    });
  }
  const myOrders = await collection.insertOne(order);
  return Response.json({
    message: "succssfully added your product",
    productId: myOrders.productId,
  });
};
