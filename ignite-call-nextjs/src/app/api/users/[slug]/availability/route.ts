import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
    
    const username = params.slug;
    const searchParams = req.nextUrl.searchParams;
    const date = searchParams.get('date');  

    if(!date) {
        return NextResponse.json({error: 'Date not provided'}, {status: 405});
    }

    const user = await prisma.user.findUnique({
        where: {
            username,
        }
    })

    if(!user){
        return NextResponse.json({error: 'User not found'}, {status: 404}); 
    }

    const referenceDate = dayjs(String(date))
    const isPastDate = referenceDate.endOf('day').isBefore(new Date());// verifica se a data é passada

    if(isPastDate){
        return NextResponse.json({possibleTimes: [], availableTimes: []});
    }

    const userAvailability = await prisma.userTimeInterval.findFirst({
        where:{
            user_id: user.id,
            week_day: referenceDate.get('day'),
        }
    })

    if(!userAvailability){
        return NextResponse.json({possibleTimes: [], availableTimes: []});
    }

    const {time_end_in_minutes, time_start_in_minutes} = userAvailability

    const startHour = time_start_in_minutes / 60;
    const endHour = time_end_in_minutes / 60;

    const possibleTimes = Array.from({length: endHour - startHour}).map((_, i) => {
        return startHour + i;
    })// cria um array com os horários disponíveis

    const blockedTimes =  await prisma.scheduling.findMany({
        select:{
            date: true,
        },
        where:{
            user_id: user.id,
            date: {
                gte: referenceDate.startOf('day').toDate(),
                lte: referenceDate.endOf('day').toDate(),
            }
        }
    })

    const availableTimes = possibleTimes.filter((time) => {
        return !blockedTimes.some((blockedTime) => blockedTime.date.getHours() === time,)
    })// filtra os horários disponíveis

    return NextResponse.json({ possibleTimes, availableTimes}, { status: 200 });
}