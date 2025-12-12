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

  order.quantity = 1;

  const myOrders = await collection.insertOne(order);
  return Response.json({
    message: "succssfully added your product",
    productId: myOrders.productId,
  });
};

// Store ID: noobb693a10731dd57
// Store Password (API/Secret Key): noobb693a10731dd57@ssl

// Merchant Panel URL: https://sandbox.sslcommerz.com/manage/ (Credential as you inputted in the time of registration)

// Store name: testnoobbbmni
// Registered URL: www.mdjosimuddin198.com
// Session API to generate transaction: https://sandbox.sslcommerz.com/gwprocess/v3/api.php
// Validation API: https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?wsdl
// Validation API (Web Service) name: https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php

// You may check our plugins available for multiple carts and libraries: https://github.com/sslcommerz
