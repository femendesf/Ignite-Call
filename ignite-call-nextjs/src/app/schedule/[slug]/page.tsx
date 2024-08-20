import { prisma } from "@/lib/prisma";
import { PageSchedule } from "./components/PageSchedule";

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


