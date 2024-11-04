'use client'

import { Heading, Text } from "@ignite-ui/react"
import Image from "next/image"
import previewImage from '../../../assets/app-preview.png'
import { Container, Hero, Preview } from "./styles"
import ClaimUsernameForm from "../ClaimUsernameForm"

const Home = () => {

    return (
    <>
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

export default Home 
