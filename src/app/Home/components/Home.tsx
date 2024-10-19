'use client'

import { Heading, Text } from "@ignite-ui/react"
import Image from "next/image"
import React from "react"
import { Container, Hero, Preview } from "../styles"
import { ClaimUsernameForm } from "./ClaimUsernameForm"
import previewImage from '../../../assets/app-preview.png'


export default function Home() {

    return (
    <>
        {/* <NextSeo
          title="Descomplique sua agenda | Ignite Call"
          description="Conecte seu calendário e permita que as pessoas marquem agendamentos no seu tempo livre."
        /> */}

        <Container>
          <Hero>
            <Heading size='sm'>Agendamento descomplicado</Heading>
            <Text size='xl'>
              Conecte seu calendário e permita que as pessoas marquem agendamentos no seu tempo livre.
            </Text>

            <ClaimUsernameForm/>
          </Hero>

          <Preview>
            <Image
            src={previewImage}
            height={400}
            quality={100}
            priority
            alt="Calendário simbolizando aplicação em funcionamento"/>
          </Preview>

        </Container>

      </>
      
    )
  }