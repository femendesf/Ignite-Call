import { getServerSession } from "next-auth";
import React from "react";
import { buildNextAuthOptions } from "@/utils/buildAuth";

import dynamic from "next/dynamic"
const UpdateProfile = dynamic(() => import('./components/ComponentUpdateProfile'), { ssr: false })

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