import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";
import { NextRequest, NextResponse } from "next/server";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<Record<string, string>> }
) {
  const resolvedParams = await params;
  const username = resolvedParams.slug;
  const searchParams = req.nextUrl.searchParams;
  const date = searchParams.get("date");
  const timezoneOffset = searchParams.get("timezoneOffset");

  console.log(`TIMEZONE: ********************${timezoneOffset}*********************`);

  if (!date || !timezoneOffset) {
    return NextResponse.json({ error: "Date or TimezoneOffSet not provided" }, { status: 405 });
  }

  const user = await prisma.user.findUnique({
    where: { username },
  });

  const timezoneOffsetInHours = typeof timezoneOffset === 'string' ? Number(timezoneOffset) / 60 : Number(timezoneOffset[0]) / 60;
  

  if (!user) {
    return NextResponse.json({ error: "User not foun" }, { status: 404 });
  }

  const referenceDate = dayjs(String(date));  

  const referenceDateTimeZoneOffsetInHours = referenceDate.toDate().getTimezoneOffset() / 60;

  const isPastDate = referenceDate.endOf("day").isBefore(new Date());

  if (isPastDate) {
    return NextResponse.json({ possibleTimes: [], availableTimes: [] });
  }

  const userAvailability = await prisma.userTimeInterval.findFirst({
    where: {
      user_id: user.id,
      week_day: referenceDate.get("day"),
    },
  });

  if (!userAvailability) {
    return NextResponse.json({ possibleTimes: [], availableTimes: [] });
  }

  const { time_end_in_minutes, time_start_in_minutes } = userAvailability;
  const startHour = time_start_in_minutes / 60;
  const endHour = time_end_in_minutes / 60;

  const possibleTimes = Array.from({ length: endHour - startHour }).map(
    (_, i) => startHour + i
  );

  const blockedTimes = await prisma.scheduling.findMany({
    select: {
      date: true,
    },
    where: {
      user_id: user.id,
      date: {
        gte: referenceDate.set("hour", startHour).add(timezoneOffsetInHours, 'hour').toDate(),  
        lte: referenceDate.set("hour", endHour).add(timezoneOffsetInHours, 'hour').toDate(),
      },
    },
  });

  const availableTimes = possibleTimes.filter((time) => {
    const isTimeBlocked = blockedTimes.some(
      (blockedTime) => blockedTime.date.getUTCHours() - timezoneOffsetInHours === time
    );

    const isTimeInPast = referenceDate
    .set("hour", time)
    .subtract(referenceDateTimeZoneOffsetInHours, 'hour')
    .isBefore(dayjs().utc().subtract(timezoneOffsetInHours, 'hour'));

    return !isTimeBlocked && !isTimeInPast;
  });

  return NextResponse.json({ possibleTimes, availableTimes }, { status: 200 });
}

// const blockedTimes = await prisma.scheduling.findMany({
//   select: {
//     date: true,
//   },
//   where: {
//     user_id: user.id,
//     date: {
//       gte: referenceDate.startOf("day").toDate(),
//       lte: referenceDate.endOf("day").toDate(),
//     },
//   },
// });
