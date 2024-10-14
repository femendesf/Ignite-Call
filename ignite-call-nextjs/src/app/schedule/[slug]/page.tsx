import { prisma } from "@/lib/prisma";
import { PageSchedule } from "./components/PageSchedule";
import React from "react";

export interface ScheduleProps{
    user:{
        name: string,
        bio: string,
        avatar_url: string,
    }
}

export async function getStaticPaths(){
    return{
        paths:[],
        fallback: 'blocking'
    }
}

type Props = {
    params: { slug: string };
};

export async function generateMetadata({ params }: Props) {
    const user = await prisma.user.findUnique({
      where: {
        username: params.slug,
      },
      select: {
        name: true,
      },
    });
  
    // Verifica se o usuário existe
    if (!user) {
      return {
        title: "Usuário não encontrado | Ignite Call",
      };
    }
  
    return {
      title: `Agendar com ${user.name} | Ignite Call`,
    };
}

export default async function Schedule({ params }: { params: { slug: string } }){
    
    const user = await prisma.user.findUnique({
        where:{
            username: params.slug
        },
        select: {
            name: true,
            bio: true,
            avatar_url: true,
        }
    })

    if (!user){
        return{
            notFound: true
    }}
   
    revalidate: 60 * 60 * 24 // 24 hours

    return(

        <> 
            <PageSchedule user={user as ScheduleProps['user']}/>
        </>
       
    )
}


