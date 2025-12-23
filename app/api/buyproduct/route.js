import dbConnect from "@/lib/database/db";

const collection = await dbConnect("MyOrder");

export const GET = async () => {
  const myOrders = await collection.find().toArray();
  return Response.json(myOrders);
};

export const POST = async (req) => {
  const order = await req.json();
  const { productId, email } = order;

  const existingOrder = await collection.findOne({
    productId,
    email,
  });
  if (existingOrder) {
    await collection.updateOne(
      { productId, email },
      {
        $inc: { quantity: 1 },
      }
    );

    return Response.json({
      message: "Quantity updated",
      status: 200,
    });
  }

  // order.quantity = 1;

  const myOrders = await collection.insertOne(order);
  return Response.json({
    message: "succssfully added your product",
    productId: myOrders.productId,
  });
};
