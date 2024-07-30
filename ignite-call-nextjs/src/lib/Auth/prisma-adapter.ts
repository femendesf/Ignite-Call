import { Adapter } from "next-auth/adapters";
import { prisma } from "../prisma";

function MyAdapter(): Adapter {
    return {
      async createUser(user) {
        // Implementation to create a user in your database
      },
      async getUser(id) {
        // Implementation to get a user by id from your database
        const user = await prisma.user.findUniqueOrThrow({
            where:{
                id
            }
        })

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
        const user = await prisma.user.findUniqueOrThrow({
            where:{
                email
            }
        })

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
      },
      async updateUser(user) {
        // Implementation to update a user in your database
      },
      async linkAccount(account) {
        // Implementation to link an account to a user in your database
      },
      // Implement other required methods...
    }
  }