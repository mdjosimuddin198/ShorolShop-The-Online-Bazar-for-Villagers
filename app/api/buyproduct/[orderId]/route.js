import dbConnect from "@/lib/database/db";
import { ObjectId } from "mongodb";

export const PATCH = async (req, { params }) => {
  try {
    const { deleveriStatus } = await req.json();
    const { orderId } = params; // URL এ order/product id path থেকে আসবে

    const collection = await dbConnect("MyOrder");

    const updateStatus = await collection.updateOne(
      { _id: new ObjectId(orderId) }, // filter
      { $set: { deleveriStatus } } // update
    );

    return new Response(JSON.stringify(updateStatus), { status: 200 });
  } catch (error) {
    console.log("Status update failed:", error);
    return new Response(
      JSON.stringify({ message: "Failed to update status" }),
      { status: 500 }
    );
  }
};
