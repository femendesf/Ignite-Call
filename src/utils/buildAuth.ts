import { PrismaAdapter } from "@/lib/Auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";

 export function buildNextAuthOptions(): NextAuthOptions {
    return {
      adapter: PrismaAdapter(), // Para usar o banco de dados do prisma na autenticação
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
}