import { buildNextAuthOptions } from "@/utils/buildAuth";
import NextAuth from "next-auth/next";

// Configurando o handler do NextAuth
const handler = NextAuth(buildNextAuthOptions());

export { handler as GET, handler as POST };