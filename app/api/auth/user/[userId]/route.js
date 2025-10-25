import dbConnect from "@/lib/database/db";

export const GET = async (user) => {
  try {
    const collection = await dbConnect("UserCollection");
    const res = await collection.findOne({ user });
    return new Response(JSON.stringify(res));
  } catch (error) {
    throw new Error("error find check it again", error);
  }
};
