'use client'

import { Button, Heading, MultiStep, Text} from "@ignite-ui/react";
import { ArrowRight, Check } from "phosphor-react";
import { AuthError, ConnectBox, ConnectItem } from "./styles";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { NextSeo } from "next-seo";
import { Container, Header } from "../../components/styles";


export function ConnectCalendar(){

    const session =  useSession()

    const router = useRouter()
    
    async function handleConnectCalendar(){
        await signIn('google')
    }

    async function handleNavigateToNextStep(){
        await router.push('/register/time-intervals')
    }
    const searchParams = useSearchParams()
    const hasAuthError = searchParams.has('error')
    const isSignedIn = session.status === 'authenticated'

    return(
        <> 
            {/* <NextSeo
                title="Conecte sua agenda do Google | Ignite Call"
                noindex
            /> */}

            <Container>
                <Header>
                    <Heading as='strong'>
                        Conecte sua agenda!
                    </Heading>

                    <Text>
                        Conecte o seu calendário para verificar automaticamente as horas ocupadas e os novos eventos à medida em que são agendados.
                    </Text>

                    <MultiStep size={4} currentStep={2}/>
                </Header>

                <ConnectBox>

                    <ConnectItem>
                        <Text>Google Calendar</Text>
                    
                        {isSignedIn ? 
                            (<Button size='sm' disabled>
                                Conectado
                                <Check/>
                            </Button> )
                            

                            :(<Button variant='secondary' size='sm' onClick={handleConnectCalendar}
                            >
                                Conectar
                                <ArrowRight/>
                            </Button>)
                        }
                    </ConnectItem>
                    
                    {hasAuthError && (
                        <AuthError size='sm'>
                            Falha ao conectar ao Google, verifique se você habilitou as permissões de acessio ao Google Calendar.
                        </AuthError>
                    )}
                    <Button onClick={handleNavigateToNextStep} type='submit' disabled={!isSignedIn}>
                        Próximo passo
                        <ArrowRight/>
                    </Button>

                </ConnectBox>
                

            </Container>
        </>
    )
}