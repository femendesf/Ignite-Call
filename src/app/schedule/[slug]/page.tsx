import { prisma } from "@/lib/prisma";
import { PageSchedule } from "./components/PageSchedule";
import React from "react";

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

// Função para gerar as rotas estáticas, se necessário (substituto do getStaticPaths)
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

  if (!user) {
    return {
      notFound: true,
    };
  }

  // Revalida a página a cada 24 horas
  const revalidate = 60 * 60 * 24; // 24 horas

  return (
    <>
      <PageSchedule user={user as ScheduleProps["user"]} />
    </>
  );
}
