import { getGoogleOAuthToken } from "@/lib/google";
import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";
import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: NextRequest, { params }: { params: { slug: string } }) {
    
    const username = params.slug;

    const user = await prisma.user.findUnique({
        where: {
            username,
        }
    })

    const createSchedulingBody = z.object({
        name: z.string(),
        email: z.string().email(),
        observations: z.string(),
        date: z.string().datetime(),
    })

    const dates = await req.json();
    
    const {name, email, observations, date} = await createSchedulingBody.parse(dates);

    const schedulingDate = dayjs(date).startOf('hour');
    
    if (schedulingDate.isBefore(new Date())) {
        return NextResponse.json({error: 'Data inválida'}, {status: 400});
    }

    if(!user){
        return NextResponse.json({error: 'User not found'}, {status: 404}); 
    }

    const conflictingScheduling = await prisma.scheduling.findFirst({
        where:{
            user_id: user.id,
            date: schedulingDate.toDate(),
        }
    })

    if(conflictingScheduling){
        return NextResponse.json({error: 'There is another scheduling at the same time'}, {status: 409});
    }

    const scheduling = await prisma.scheduling.create({
        data:{
            name,
            email,
            observations,
            date: schedulingDate.toDate(),
            user_id: user.id
        }
    })

    const calendar = google.calendar({
        version: 'v3',
        auth: await getGoogleOAuthToken(user.id)
    })

    await calendar.events.insert({
        calendarId: 'primary',
        conferenceDataVersion: 1,
        requestBody:{
            summary: `Ignite Call: ${name}`,
            description: observations,
            start:{
                dateTime: schedulingDate.format()
            },
            end:{
                dateTime: schedulingDate.add(1, 'hour').format()
            },
            attendees:[{email, displayName: name}],
            conferenceData: {
                createRequest: {
                    requestId: scheduling.id,
                    conferenceSolutionKey: {
                        type: 'hangoutsMeet'
                    }
                }
            }
        }
    })

    return NextResponse.json({message: 'Scheduling created'}, {status: 201});
}

// export async function getServerSideProps(req: NextRequest, { params }: { params: { slug: string } }) {
//     const username = params.slug;
  
//     // Busca o usuário pelo nome de usuário
//     const user = await prisma.user.findUnique({
//       where: {
//         username,
//       },
//     });
  
//     if (!user) {
//       return {
//         notFound: true,
//       };
//     }
  
//     // Processar o agendamento quando o formulário for enviado
//     const createSchedulingBody = z.object({
//       name: z.string(),
//       email: z.string().email(),
//       observations: z.string(),
//       date: z.string().datetime(),
//     });
  
//     const data = await req; // Ou use um estado local para armazenar os dados do formulário
//     const { name, email, observations, date } = createSchedulingBody.parse(data);
  
//     const schedulingDate = dayjs(date).startOf("hour");
  
//     if (schedulingDate.isBefore(new Date())) {
//       return {
//         props: {
//           error: "Data inválida",
//         },
//       };
//     }
  
//     const conflictingScheduling = await prisma.scheduling.findFirst({
//       where: {
//         user_id: user.id,
//         date: schedulingDate.toDate(),
//       },
//     });
  
//     if (conflictingScheduling) {
//       return {
//         props: {
//           error: "Conflito de agendamento.",
//         },
//       };
//     }
  
//     const scheduling = await prisma.scheduling.create({
//       data: {
//         name,
//         email,
//         observations,
//         date: schedulingDate.toDate(),
//         user_id: user.id,
//       },
//     });
  
//     // Integração com o Google Calendar
//     const calendar = google.calendar({
//       version: "v3",
//       auth: await getGoogleOAuthToken(user.id),
//     });
  
//     await calendar.events.insert({
//       calendarId: "primary",
//       conferenceDataVersion: 1,
//       requestBody: {
//         summary: `Ignite Call: ${name}`,
//         description: observations,
//         start: {
//           dateTime: schedulingDate.format(),
//         },
//         end: {
//           dateTime: schedulingDate.add(1, "hour").format(),
//         },
//         attendees: [{ email, displayName: name }],
//         conferenceData: {
//           createRequest: {
//             requestId: scheduling.id,
//             conferenceSolutionKey: {
//               type: "hangoutsMeet",
//             },
//           },
//         },
//       },
//     });
  
//     return {
//       props: {
//         message: "Agendamento criado com sucesso",
//       },
//     };
//   }