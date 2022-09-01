import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth/next";
import Github from "next-auth/providers/github";
import clientPromise from "../../../config/database/connection";

export default NextAuth({
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  secret: process.env.SECRET,
  jwt: {
    secret: process.env.SECRET,
    maxAge: 60 * 60 * 24 * 30,
  },
  session:{
    jwt: true
  },
  adapter: MongoDBAdapter(clientPromise),
});
