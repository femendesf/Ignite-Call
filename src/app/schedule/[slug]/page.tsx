import { prisma } from "@/lib/prisma";
// import dynamic from "next/dynamic"
import { notFound } from 'next/navigation';
import { PageSchedule } from "./components/PageSchedule";

// const PageSchedule = dynamic(() => import('./components/PageSchedule'), { ssr: false })

export interface ScheduleProps {
  user: {
    name: string;
    bio: string;
    avatar_url: string;
  };
}

// Função para gerar os metadados dinamicamente
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const user = await prisma.user.findUnique({
    where: {
      username: params.slug,
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

  return users.map(user => ({
    slug: user.username,
  }));
}

// Componente da página
export default async function Schedule({ params }: { params: { slug: string } }) {
  const user = await prisma.user.findUnique({
    where: {
      username: params.slug,
    },
    select: {
      name: true,
      bio: true,
      avatar_url: true,
    },
  });

  // Se o usuário não for encontrado, lance um erro de "não encontrado"
  if (!user) {
    notFound();
  }

  return (
    <>
      <PageSchedule user={user as ScheduleProps["user"]} />
      
    </>
  );
}

// Função para gerar os metadados dinamicamente
// export async function generateMetadata({ params }: { params: { slug: string } }) {
//   const user = await prisma.user.findUnique({
//     where: {
//       username: params.slug,
//     },
//     select: {
//       name: true,
//     },
//   });

//   // Verifica se o usuário existe
//   if (!user) {
//     return {
//       title: "Usuário não encontrado | Ignite Call",
//     };
//   }

//   return {
//     title: `Agendar com ${user.name} | Ignite Call`,
//   };
// }

// // Função para gerar as rotas estáticas, se necessário (substituto do getStaticPaths)
// export async function generateStaticParams() {
//   const users = await prisma.user.findMany({
//     select: {
//       username: true,
//     },
//   });

//   return users.map(user => ({
//     slug: user.username,
//   }));
// }

// // Componente da página
// export default async function Schedule({ params }: { params: { slug: string } }) {
//   const user = await prisma.user.findUnique({
//     where: {
//       username: params.slug,
//     },
//     select: {
//       name: true,
//       bio: true,
//       avatar_url: true,
//     },
//   });

//   if (!user) {
//     return {
//       notFound: true,
//     };
//   }

//   // Revalida a página a cada 24 horas
//   const revalidate = 60 * 60 * 24; // 24 horas

//   return (
//     <>
//       <PageSchedule user={user as ScheduleProps["user"]} />
//     </>
//   );
// }


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