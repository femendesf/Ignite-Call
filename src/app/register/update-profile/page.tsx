import { getServerSession } from "next-auth";
import { UpdateProfile } from "./components/ComponentUpdateProfile";
import React from "react";
import { buildNextAuthOptions } from "@/utils/buildAuth";

export const metadata = {
    title: 'Atualize seu perfil | Ignite Call'
}

export default async function PageUpdateProfile(){


    const session = await getServerSession(buildNextAuthOptions());

    if(!session){
        return (console.log('Usuário não autenticado'));
    }
    return (
        <>
          <UpdateProfile session={session}/>
        </>
    )
}