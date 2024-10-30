'use client'

import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button, Text, TextInput } from "@ignite-ui/react";
import { FormAnnotation, Form} from "./styles";
import dynamic from "next/dynamic";

// Define o esquema do formulário de reserva de nome de usuário
const claimUsernameFormSchema = z.object({
    username: z.string()
        .min(3, {message: 'Digite pelo menos 3 letras'})
        .regex(/^([a-z\\-]+)$/i, {message: 'O usuário pode ter letras e hifens'})
        .transform(username => username.toLowerCase()),
})

type ClaimUsernameFormData= z.infer<typeof claimUsernameFormSchema>

const ClaimUsernameForm = () =>{

    // Configura o formulário com os dados e validações
    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<ClaimUsernameFormData>({
        resolver: zodResolver(claimUsernameFormSchema)
    })
    
    // Utiliza o router para redirecionar para outra página
    const router = useRouter()
    
    // Quando o formulário é enviado, redireciona para a página de agendamento
    async function handleClaimUserForm(data: ClaimUsernameFormData){
        const { username} = data
        await router.push(`/register?username=${username}`)
    }
    return(
        <>
            <Form as='form' onSubmit={handleSubmit(handleClaimUserForm)}>
                <TextInput
                    size="sm"
                    prefix="ignite.com/"
                    placeholder='seu-usuario'
                    crossOrigin=""
                    {...register('username')}
                />

                <Button size="sm" type="submit" disabled={isSubmitting} style={{ borderRadius: '8px' }}>
                    Reservar
                    <ArrowRight/>
                </Button>
            </Form>

            <FormAnnotation>
            <Text as='span' size='sm'>
                {errors.username ? errors.username.message : 'Digite o nome do usuário desejado'}
            </Text>
            </FormAnnotation>
        </>
  
    )
}
export default dynamic (() => Promise.resolve(ClaimUsernameForm), {ssr: false}) 