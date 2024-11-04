import { prisma } from "@/lib/prisma";
import { notFound } from 'next/navigation';
import { PageSchedule } from "./components/PageSchedule";

export interface ScheduleProps {
  user: {
    name: string;
    bio: string;
    avatar_url: string;
  };
}
interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: {params: Promise<{slug: string}>}) {

  const user = await prisma.user.findUnique({
    where: {
      username: (await params).slug,
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

// Função para gerar as rotas estáticas
export async function generateStaticParams() {
  const users = await prisma.user.findMany({
    select: {
      username: true,
    },
  });

  return users.map((user) => ({
    slug: user.username,
  }));
}


// Componente da página
export default async function Schedule({ params }:{params: Promise<{slug: string}>}) {

  const user = await prisma.user.findUnique({
    where: {
      username:(await params).slug,
    },
    select: {
      name: true,
      bio: true,
      avatar_url: true,
    },
  });

  // Se o usuário não for encontrado, chame notFound() para renderizar a página de erro 404
  if (!user) {
    notFound();
  }

  return (
    <>
      <PageSchedule user={user as ScheduleProps["user"]} />
    </>
  );
}


//Função para pegar os dados do usuário (assíncrona)
// async function getUserData(slug: string) {
//   const user = await prisma.user.findUnique({
//     where: { username: slug },
//     select: { name: true, bio: true, avatar_url: true },
//   });

//   return user;
// }

// // Componente da página
// export default async function Schedule({ params }: { params: { slug: string } }) {
//   const user = await getUserData(params.slug);

//   if (!user) {
//     // Retorna um fallback ou página de erro se o usuário não for encontrado
//     return <div>Usuário não encontrado</div>;
//   }

//   return (
//     <>
//       <PageSchedule user={user as ScheduleProps["user"]} />
//     </>
//   );
// }