import { PrismaAdapter } from "@/lib/Auth/prisma-adapter"
import NextAuth from 'next-auth'
import GoogleProvider, {GoogleProfile} from 'next-auth/providers/google'

export const handler = NextAuth ({
 
    adapter: PrismaAdapter(),

    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID ?? '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
        authorization: {
          params: {
            scope: 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email'
          }
        },

        profile(profile: GoogleProfile) {
          return {
            id: profile.sub,
            name: profile.name,
            username: '',
            email: profile.email,
            avatar_url: profile.picture,
          }
        },
      })
    ],

    callbacks: {
      async signIn({ account }) {

        if(!account?.scope?.includes('https://www.googleapis.com/auth/calendar')){
          return '/register/connect-calendar/?error=permissions'
        }
        return true
      },

      async session({ session, user }) {
        return{
          ...session,
          user
        }
      }

  }
})

export { handler as GET, handler as POST }
