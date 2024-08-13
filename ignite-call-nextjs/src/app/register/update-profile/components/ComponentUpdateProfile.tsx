'use client'

import { Button, Heading, MultiStep, Text, TextArea } from "@ignite-ui/react";
import { Container, Header } from "../../styles";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormAnnotation, ProfileBox } from "../styles";

const updateProfileSchema = z.object({
    bio: z.string()
})

type UpdateProfileData = z.infer<typeof updateProfileSchema>


export function UpdateProfile({session}: any){

    const sessionData = session.user
    console.log(sessionData.name)
    const {
        register,
        formState: { isSubmitting },
        handleSubmit,
    } = useForm<UpdateProfileData>({
        resolver: zodResolver(updateProfileSchema)
    });

    async function handleRegisterForm(data: UpdateProfileData) {
        
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
                    Bem-vindo ao Ignite Call!
                </Heading>

                <Text>
                    Precisamos de algumas informações para criar seu perfil! Ah, você pode editar essas informações depois.
                </Text>

                <MultiStep size={4} currentStep={1} />
            </Header>

            <ProfileBox as='form' onSubmit={handleSubmit(handleRegisterForm)}>
                <label>
                    <Text size='sm'>Foto de perfil</Text>
                </label>

                <label>
                    <Text size='sm'>Nome completo</Text>
                    <TextArea placeholder='Seu nome' {...register('bio')} />
                    <FormAnnotation size='sm'>
                        Fale um pouco sobre você. Isto será exibido em sua página pessoal.
                    </FormAnnotation>
                </label>

                <Button type='submit' disabled={isSubmitting}>
                    Próximo passo
                    <ArrowRight />
                </Button>
            </ProfileBox>
        </Container>
    )
}
