'use client'

import { Button, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { Container, Form, FormError, Header } from "./styles";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "@/lib/axios";
import { AxiosError } from "axios";
import { NextSeo } from "next-seo";
import React from "react";

// Define o esquema do formulário de reserva de nome de usuário
const registerFormSchema = z.object({
    username: z.string()
        .min(3, {message: 'Usuário precisa de pelo menos 3 letras'})
        .regex(/^([a-z\\-]+)$/i, {message: 'O usuário pode ter letras e hifens'})
        .transform(username => username.toLowerCase()),

    name: 
        z.string()
        .min(3, {message: 'Nome precisa de pelo menos 3 letras'}),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export default function Register(){

    // Adicionar mais validações e campos para o formulário de registro
    const {
        register,
        formState: { errors, isSubmitting},
        handleSubmit,
        setValue
    } = useForm<RegisterFormData>(
        {
            resolver: zodResolver(registerFormSchema)
        }
    )

    const searchParams = useSearchParams()
    const query = searchParams.get('username')
    const router = useRouter()

    // Atualiza o valor do campo username caso seja passado como query paramentro na URL
    useEffect(() => {
        if(query){
            setValue('username', query)
        }
    }, [query, setValue])

    // Função para o formulário de registro
    async function handleRegisterForm(data: RegisterFormData){

       try {
        await api.post('/users', {
            name: data.username,
            username: data.username,
        })

        await router.push('/register/connect-calendar')
       } catch (err) {
        
        if (err instanceof AxiosError && err?.response?.data?.message) {
            alert(err.response.data.message)
            return
        }

        console.log(err)
       }
    }

    return(
        <>
            {/* <NextSeo
                title="Crie uma conta | Ignite Call"
                
            /> */}
        
            <Container>
                <Header>
                    <Heading as='strong'>
                        Bem-vindo ao Ignite Call!
                    </Heading>

                    <Text>
                        Precisamos de algumas informações para criar seu perfil! Ah, você pode editar essas informações depois.
                    </Text>

                    <MultiStep size={4} currentStep={1}/>
                </Header>

                <Form as='form' onSubmit={handleSubmit(handleRegisterForm)}>
                    <label>
                        <Text size='sm'>Nome de usuário</Text>
                        <TextInput prefix="ignite.com/" placeholder='seu-usuario' {...register('username')}/>
                        
                        {errors.username && (
                            <FormError size='sm'>
                                {errors.username.message}
                            </FormError>
                        )}

                    </label>

                    <label>
                        <Text size='sm'>Nome completo</Text>
                        <TextInput placeholder='Seu nome' {...register('name')}/>

                        {errors.name && (
                            <FormError size='sm'>
                                {errors.name.message}
                            </FormError>
                        )}
                    </label>

                    <Button type='submit' disabled={isSubmitting} >
                        Próximo passo
                        <ArrowRight/>
                    </Button>
                </Form>
            </Container>
        </>
    )
}