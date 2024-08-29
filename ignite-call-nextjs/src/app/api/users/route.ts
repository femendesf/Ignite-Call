import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
 
export async function POST(req: NextRequest) {

  const data = await req.json()
  const {name, username} = data

  const userExists = await prisma.user.findUnique({
    where: {
      username
    }
  })

  if (userExists) {
    return NextResponse.json({message: 'Username already taken'},{status: 400})
  }
  const user = await prisma.user.create({
    data:{
      name,
      username
    }
  })

  // Setando o cookie de usuário
  cookies().set('@ignitecall:userId', user.id,{
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  })
  
  return NextResponse.json(data, { status: 200 })
}