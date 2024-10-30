'use client'

import { Heading, Text } from "@ignite-ui/react"
import Image from "next/image"
import previewImage from '../../../assets/app-preview.png'
import { Container, Hero, Preview } from "./styles"
import dynamic from "next/dynamic"
import ClaimUsernameForm from "../ClaimUsernameForm"

const Home = () => {

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

export default dynamic (() => Promise.resolve(Home), {ssr: false}) 
