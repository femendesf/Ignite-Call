import { buildNextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { UpdateProfile } from "./components/ComponentUpdateProfile";
import React from "react";

export const metadata = {
    title: 'Atualize seu perfil | Ignite Call'
}

export default async function PageUpdateProfile(){

    const authOptions = buildNextAuthOptions;
    const session = await getServerSession(authOptions);

    if(!session){
        return (console.log('Usuário não autenticado'));
    }
    return (
        <>
          <UpdateProfile session={session}/>
        </>
    )
}