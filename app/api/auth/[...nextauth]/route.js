import prisma from "@/lib/prisma";
import NextAuth from "next-auth"
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    // Set to jwt in order to CredentialsProvider works properly
    strategy: 'jwt'
  }
})

export { handler as GET, handler as POST }