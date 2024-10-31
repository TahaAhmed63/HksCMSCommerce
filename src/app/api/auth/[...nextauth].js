import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/app/lib/prisma';
import { verifyJWT } from '@/app/lib/token';
import { compare } from 'bcryptjs';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Find user by email
        const user = await prisma.AdminUser.findUnique({
          where: { email: credentials.email },
        });

        // If user or password is incorrect, throw an error
        if (!user || !(await compare(credentials.password, user.password))) {
          throw new Error('Invalid email or password');
        }

        // Return user object with essential fields
        return { id: user.id, email: user.email, role: user.role };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // Attach user data to session
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      // On first sign-in, add user data to token
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  secret: process.env.JWT_SECRET_KEY,
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error', // Error code passed in query string as ?error=
  },
});
