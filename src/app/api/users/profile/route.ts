import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { buildNextAuthOptions } from "@/utils/buildAuth";


const updateProfileBodySchema = z.object({
    bio: z.string(),
})

export async function PUT(req: NextRequest) {

    const data = await req.json();

    const { bio } = updateProfileBodySchema.parse(data);

    const session = await getServerSession(buildNextAuthOptions())
   
    if(!session){
        return NextResponse.json({error: 'Usuário não autenticado'}, {status: 405});
    }

    await prisma.user.update({
        where:{
            id: session.user.id,
        },
        data:{
            bio: bio,
        }
    })

    return NextResponse.json({message: 'Perfil atualizado com sucesso'}, {status: 200});
}