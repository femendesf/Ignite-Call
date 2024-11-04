import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
 
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

  const response = NextResponse.json(data, { status: 200 })
  response.cookies.set('@ignitecall:userId', user.id, {
    maxAge: 60 * 60 * 24 * 7, // 7 dias
    path: '/',
  })

  return response
}