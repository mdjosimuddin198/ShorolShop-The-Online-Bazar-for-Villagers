import bcrypt from "bcrypt";
import dbConnect from "@/lib/database/db";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "next-auth/react";
// josimuddin0505
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter Your Email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const collection = await dbConnect("UserCollection");
          const userInfo = await collection.findOne({
            email: credentials.email,
          });

          if (!userInfo) {
            console.log("User not found");
            return null;
          }

          const isPasswordOk = await bcrypt.compare(
            credentials.password,
            userInfo.password
          );

          if (!isPasswordOk) {
            console.log("Incorrect password");
            return null;
          }

          return {
            id: userInfo._id.toString(),
            name: userInfo.name,
            email: userInfo.email,
            image: userInfo.image,
          };
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      },
    }),
  ],
  page: {
    signIn: "/api/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
