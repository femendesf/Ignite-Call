import { Button, Text, TextArea, TextInput } from "@ignite-ui/react";
import { ConfirmForm, FormActions, FormError, FormHeader } from "./styles";
import { CalendarBlank, Clock } from "phosphor-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { useParams} from "next/navigation";
import { api } from "@/lib/axios";

const confirmFormSchema = z.object({
    name: z.string().min(3, {message: 'o nome precisa no mínimo 3 caracteres'}),
    email: z.string().email({message: 'o email precisa ser válido'}),
    observations: z.string().nullable(),
})

type ConfirmFormData = z.infer<typeof confirmFormSchema>

interface ConfirmStepProps {
    schedulingDate: Date;
    onCancelConfirmation: () => void;
}
export function ConfirmStep({schedulingDate, onCancelConfirmation}: ConfirmStepProps){

    const { register, handleSubmit, formState:{isSubmitting, errors}} = useForm<ConfirmFormData>({
        resolver: zodResolver(confirmFormSchema)
    })

    const {slug: username} = useParams()

    async function handleConfirmScheduling(data: ConfirmFormData){

        const {name, email, observations} = data

        await api.post(`/users/${username}/schedule`, {
            name,
            email,
            observations,
            date: schedulingDate
        })

        onCancelConfirmation()
    }

    const dateWithTime = dayjs(schedulingDate).format('DD [de] MMMM [de] YYYY')

    const describedTime  = dayjs(schedulingDate).format('HH:mm[h]')

    return(
        <ConfirmForm as='form' onSubmit={handleSubmit(handleConfirmScheduling)}>
            <FormHeader>
                <Text>
                    <CalendarBlank/>
                    {dateWithTime}
                </Text>
                
                <Text>
                    <Clock/>
                    {describedTime}
                </Text>
            </FormHeader>

            <label>
                <Text size='sm'>Nome completo</Text>
                <TextInput 
                    placeholder='Seu nome'
                    {...register('name')}
                    crossOrigin=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                />
                {errors.name && (<FormError size='sm'>{errors.name.message}</FormError>)}
            </label>

            <label>
                <Text size='sm'>Endereço de email</Text>
                <TextInput 
                    type='email' 
                    placeholder='johndoe@gmail.com' 
                    {...register('email')}
                    crossOrigin=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                />
                {errors.email && (<FormError size='sm'>{errors.email.message}</FormError>)}
            </label>

            <label>
                <Text size='sm'>Observações</Text>
                <TextArea {...register('observations')}/>
            </label>

            <FormActions>
                <Button type='button' variant='tertiary'
                    onClick={onCancelConfirmation}
                >Cancelar
                </Button>

                <Button type='submit' disabled={isSubmitting}>
                    Confirmar
                </Button>
            </FormActions>
            
        </ConfirmForm>
    )
}