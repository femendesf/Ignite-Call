import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
 
export async function POST(req: Request) {

  const data = await req.json()
  const {name, username} = data

  const user = await prisma.user.create({
    data:{
      name,
      username
    }
  })

  console.log(req)
  return NextResponse.json(data, { status: 200 })
}