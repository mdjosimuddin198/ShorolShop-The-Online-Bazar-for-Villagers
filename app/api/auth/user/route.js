import dbConnect from "@/lib/database/db";
import bcrypt from "bcrypt";

export const GET = async () => {
  try {
    const collection = await dbConnect("UserCollection");
    const res = await collection.find().toArray();
    return new Response(JSON.stringify(res));
  } catch (err) {
    throw new Error("error find check it again ", err);
  }
};

export const POST = async (req) => {
  try {
    const collection = await dbConnect("UserCollection");
    const { name, email, password, image } = await req.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await collection.insertOne({
      name,
      email,
      password: hashedPassword,
      image,
    });

    return new Response(
      JSON.stringify({ message: "User created", userId: user.insertedId }),
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to create user" }), {
      status: 500,
    });
  }
};
