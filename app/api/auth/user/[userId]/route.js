import dbConnect from "@/lib/database/db";
import { ObjectId } from "mongodb";
import { useId } from "react";

export const GET = async (req, { params }) => {
  const { userId } = await params;
  try {
    const collection = await dbConnect("UserCollection");
    const res = await collection.findOne({ _id: new ObjectId(userId) });
    return new Response(JSON.stringify(res));
  } catch (error) {
    throw new Error("error find check it again", error);
  }
};

export const DELETE = async (req, { params }) => {
  const { userId } = await params;
  try {
    const collection = await dbConnect("UserCollection");
    const res = await collection.deleteOne({ _id: new ObjectId(userId) });
    return new Response(JSON.stringify(res));
  } catch (error) {
    console.error("Error deleting user:", error);
    return new Response(JSON.stringify({ error: "Error deleting user" }), {
      status: 500,
    });
  }
};
