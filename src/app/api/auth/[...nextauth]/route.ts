import { PrismaAdapter } from "@/lib/Auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";

// Define the NextAuth options
export const buildNextAuthOptions = (): NextAuthOptions => {
  return {
    adapter: PrismaAdapter(),

    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID ?? '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
        authorization: {
          params: {
            prompt: 'consent',
            access_type: 'offline',
            response_type: 'code',
            scope: 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
          },
        },

        profile(profile: GoogleProfile) {
          return {
            id: profile.sub,
            name: profile.name,
            username: '',
            email: profile.email,
            avatar_url: profile.picture,
          };
        },
      }),
    ],

    callbacks: {
      async signIn({ account }) {
        if (!account?.scope?.includes('https://www.googleapis.com/auth/calendar')) {
          return '/register/connect-calendar/?error=permissions';
        }
        return true;
      },

      async session({ session, user }) {
        return {
          ...session,
          user,
        };
      },
    },
  };
};

// Handler for NextAuth, passing in the options
const handler = NextAuth(buildNextAuthOptions());

// Correctly export the handler for GET and POST methods
export { handler as GET, handler as POST };
