import NextAuth, { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import prisma from "@/lib/prisma"
import CredentialsProvider from "next-auth/providers/credentials"
import * as bcrypt from 'bcrypt';
import { User } from "@prisma/client";

export const authOptions: AuthOptions = {
  pages: {
    signIn: `/sign-in`,
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
        name: 'Credentials',
        credentials: {
            username: { label: 'Username Here', type: 'text', placeholder: 'Username' },
            password: { label: 'Password', type: 'password'}
        },
        async authorize(credentials) {
            const user = await prisma.user.findUnique({
                where: {
                    email: credentials?.username
                },
            });

            if (!user) throw new Error('Invalid information');

            if (!credentials?.password) throw new Error('Invalid information');
            
            const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

            if (!isPasswordCorrect) throw new Error('Invalid information');

            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        },
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user as User;
      return token;
    },

    async session({ token, session }) {
      session.user = token.user;
      return session;
    }
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }