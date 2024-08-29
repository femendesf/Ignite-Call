'use client'

import { Avatar, Button, Heading, MultiStep, Text, TextArea } from "@ignite-ui/react";
import { Container, Header } from "../../styles";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormAnnotation, ProfileBox } from "../styles";
import { Session } from "next-auth";
import { api } from "@/lib/axios";
import { useRouter } from "next/navigation";

const updateProfileSchema = z.object({
    bio: z.string(),
})

type UpdateProfileProps = {
    session: Session
}

type UpdateProfileData = z.infer<typeof updateProfileSchema>


export function UpdateProfile({session}: UpdateProfileProps){
    
    const {avatar_url, name} = session.user
    const router = useRouter()
    const {
        register,
        formState: { isSubmitting },
        handleSubmit,
    } = useForm<UpdateProfileData>({
        resolver: zodResolver(updateProfileSchema)
    });

    async function handleRegisterForm(data: UpdateProfileData) {
       
        await api.put('/users/profile', data)

        await router.push(`/schedule/${session.user.username}`)
    }
    
    // OUTRA SOLUÇÃO PARA VERIFICAR SE O USUÁRIO ESTÁ AUTENTICADO
    
    // const { data: session, status } = useSession(); // Usa o hook useSession para obter a sessão do lado do cliente
    // const [loading, setLoading] = useState(true);
  
    // useEffect(() => {
    //   if (status === "loading") return; // Espera enquanto a sessão está sendo carregada
  
    //   if (!session) {
    //     signIn(); // Redireciona para login se não estiver autenticado
    //   } else {
    //     setLoading(false); // Define loading como falso quando a sessão é obtida
    //   }
    // }, [session, status]);
  
    // // if (loading) {
    // //   return <div>Carregando...</div>; // Exibe um carregando enquanto verifica a sessão
    // // }

    return (
        <Container>
            <Header>
                <Heading as='strong'>
                    Defina sua disponibilidade
                </Heading>

                <Text>
                    Por último, uma breve descrição e uma foto de perfil.
                </Text>

                <MultiStep size={4} currentStep={4} />
            </Header>

            <ProfileBox as='form' onSubmit={handleSubmit(handleRegisterForm)}>
                <label>
                    <Text size='sm'>Foto de perfil</Text>
                    <Avatar src={avatar_url} alt={name}/>
                </label>

                <label>
                    <Text size='sm'>Sobre você</Text>
                    <TextArea placeholder='Seu nome' {...register('bio')} />
                    <FormAnnotation size='sm'>
                        Fale um pouco sobre você. Isto será exibido em sua página pessoal.
                    </FormAnnotation>
                </label>

                <Button type='submit' disabled={isSubmitting}>
                    Finalizar
                    <ArrowRight />
                </Button>
            </ProfileBox>
        </Container>
    )
}
