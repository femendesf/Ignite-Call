import { getServerSession } from "next-auth";
import { buildNextAuthOptions } from "@/app/api/auth/[...nextauth]/route"; // Certifique-se de ajustar o caminho corretamente
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const timeIntervalsBodySchema = z.object({
  intervals: z.array(
    z.object({
      weekDay: z.number(),
      startTimeInMinutes: z.number(),
      endTimeInMinutes: z.number(),
    }),
    { message: "Intervalos inválidos" }
  ),
});

export async function POST(req: NextRequest) {
  const data = await req.json();

  const authOptions = buildNextAuthOptions;
  const session = await getServerSession({ req, ...authOptions }); // Passa o req como primeiro parâmetro

  if (!session) {
    return NextResponse.json({ error: "Usuário não autenticado" }, { status: 401 });
  }

  const { intervals } = timeIntervalsBodySchema.parse(data);

  await Promise.all(
    intervals.map((interval) => {
      return prisma.userTimeInterval.create({
        data: {
          week_day: interval.weekDay,
          time_start_in_minutes: interval.startTimeInMinutes,
          time_end_in_minutes: interval.endTimeInMinutes,
          user_id: session.user?.id,
        },
      });
    })
  );

  return NextResponse.json({ message: "Horários salvos com sucesso!" }, { status: 201 });
}
