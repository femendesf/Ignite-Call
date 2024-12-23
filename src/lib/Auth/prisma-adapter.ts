import { Adapter } from "next-auth/adapters";
import { prisma } from "../prisma";
import { cookies } from "next/headers";

export function PrismaAdapter(): Adapter {

    return {
       async createUser(user: { name: string; email: string; avatar_url: string; username: string }) {
        const cookie = await cookies()
        const userIdCookies = cookie.get('@ignitecall:userId')

        if(!userIdCookies){throw new Error('User ID not found on cookies.')}

        const prismaUser = await prisma.user.update({
          where: {
            id: userIdCookies.value,
          },
          data: {
            name: user.name,
            email: user.email,
            avatar_url: user.avatar_url
          },
        })

        cookie.delete('@ignitecall:userId')

        return {
          id: prismaUser.id,
          name: prismaUser.name!,
          username: user.username,
          email: prismaUser.email!,
          emailVerified: null,
          avatar_url: prismaUser.avatar_url!,
        }

      },

      async getUser(id) {
        // Implementation to get a user by id from your database
        const user = await prisma.user.findUnique({
            where:{
                id
            }
        })

        if(!user){
          return null
        }
        return{
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email!,
            emailVerified: null,
            avatar_url: user.avatar_url!,
            
        }
      },

      async getUserByEmail(email) {
        // Implementation to get a user by email from your database
        const user = await prisma.user.findUnique({
            where:{
                email
            }
        })

        if(!user){
          return null
        }

        return{
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email!,
            emailVerified: null,
            avatar_url: user.avatar_url!,
            
        }
      },

      async getUserByAccount({ providerAccountId, provider }) {
        // Implementation to get a user by provider account id and provider
        const account = await prisma.account.findUnique({
          where: {
            provider_provider_account_id:{
              provider,
              provider_account_id: providerAccountId,
            }
            
          },
          include:{
            user: true
          }

        })

        if(!account){
          return null
        }

        const {user} = account
        return{
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email!,
          emailVerified: null,
          avatar_url: user.avatar_url!,
          
        }
      },

      async updateUser(user) {
        // Implementation to update a user in your database
        const prismaUser = await prisma.user.update({
          where:{
            id: user.id,
          },
          data:{
            name: user.name,
            email: user.email,
            avatar_url: user.avatar_url,
          },
        })
        
        return{
          id: prismaUser.id,
          name: prismaUser.name,
          username: prismaUser.username,
          email: prismaUser.email!,
          emailVerified: null,
          avatar_url: prismaUser.avatar_url!,
          
        }

      },

      async linkAccount(account: { userId: string; type: string; provider: string; providerAccountId: string; refresh_token?: string; access_token?: string; expires_at?: number; token_type?: string; scope?: string; id_token?: string; session_state?: string; }) {
        // Implementation to link an account to a user in your database
        await prisma.account.create({
          data:{
            user_id: account.userId,
            type: account.type,
            provider: account.provider,
            provider_account_id: account.providerAccountId,
            refresh_token: account.refresh_token,
            access_token: account.access_token,
            expires_at: account.expires_at,
            token_type: account.token_type,
            scope: account.scope,
            id_token: account.id_token,
            session_state: account.session_state,
          },
        })
      },

      async createSession({sessionToken, userId, expires}){
        await prisma.session.create({
          data:{
            user_id: userId,
            expires,
            session_token: sessionToken,
          },
        })

        return {
          sessionToken,
          expires,
          userId,
        }
      },

      async getSessionAndUser(sessionToken) {
          const prismaSession = await prisma.session.findUnique({
            where:{
              session_token: sessionToken,
            },
            include:{
              user: true,
            }
          })

          if(!prismaSession){
            return null
          }

          const {user, ...session} = prismaSession

          return{
            session:{
              userId: session.user_id,
              expires: session.expires,
              sessionToken: session.session_token,
            },
            user: {
              id: user.id,
              name: user.name,
              username: user.username,
              email: user.email!,
              emailVerified: null,
              avatar_url: user.avatar_url!,
            },
          }
      },
      
      async updateSession({sessionToken, userId, expires}){

        const prismaSession = await prisma.session.update({
          where:{
            session_token: sessionToken
          },
          data:{
            expires,
            user_id: userId,
          },
        })
        
        return{
          sessionToken: prismaSession.session_token,
          userId: prismaSession.user_id,
          expires: prismaSession.expires,
        }
      },

      async deleteSession(sessionToken) {
        // Implementation to delete a session from your database
        await prisma.session.delete({
          where:{
            session_token: sessionToken,
          },
        })
      }
    }

  }