import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";

import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.DATABASE_URL!);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: { 
    enabled: true, 
  }, 
  socialProviders: { 
    github: { 
      clientId: process.env.GITHUB_CLIENT_ID as string, 
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
    }, 
  }, 
  plugins: [
        jwt(), 
    ],
  session:{
    cookieCache: {
      enabled:true,
      strategy: "jwt",
      maxAge: 7 * 24 * 60 * 60
    }
  }
});