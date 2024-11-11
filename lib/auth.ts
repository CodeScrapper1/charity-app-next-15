import { getServerSession, NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { JWT } from "next-auth/jwt";
import { db } from "./db";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        const { email, password, isUpdate } = credentials;
        try {
          if (!email) {
            throw new Error("Please enter valid credentials");
          }

          const userData = await db.user.findUnique({ where: { email } });

          if (!userData) {
            throw new Error("No user found with this email");
          }

          if (isUpdate) {
            return userData;
          }

          if (!password) {
            throw new Error("Please enter valid credentials");
          }
          const passwordMatch = await bcrypt.compare(
            password,
            userData.password
          );

          if (!passwordMatch) {
            throw new Error("Incorrect password");
          }

          return userData;
        } catch (error: any) {
          throw new Error(
            error?.message || "An error occured during authentication"
          );
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/error",
  },
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }: { token: JWT; user: any }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
      }

      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.role = token.role;
      }
      return session;
    },
  },
};
export const getAuthSession = () => getServerSession(authOptions);
