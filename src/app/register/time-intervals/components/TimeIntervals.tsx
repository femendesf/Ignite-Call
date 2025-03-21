'use client'
import { Button, Checkbox, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";

import { FormError, IntervalBox, IntervalContainer, IntervalDay, IntervalInputs, IntervalItem } from "./styles";
import { ArrowRight } from "phosphor-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { getWeekDays } from "@/utils/get-week-days";
import { zodResolver } from "@hookform/resolvers/zod";
import { convertTimeStringToMinutes } from "@/utils/convert-time-to-minutes";
import { api } from "@/lib/axios";
import { useRouter } from "next/navigation";

import { Container, Header } from "../../components/styles";


const timeIntervalsFormSchema = z.object({
    intervals: z.array(z.object({
        weekday: z.number().min(0).max(6),
        enabled: z.boolean(),
        startTime: z.string(),
        endTime: z.string()
    }))
    .length(7)
    .transform((intervals) => intervals.filter((interval) => interval.enabled))
    .refine((intervals) => intervals.length > 0, {message: 'Selecione pelo menos um dia da semana!'})
    .transform((intervals) => {
        return intervals.map((interval) => {
            return{
                weekDay: interval.weekday,
                startTimeInMinutes: convertTimeStringToMinutes(interval.startTime),
                endTimeInMinutes: convertTimeStringToMinutes(interval.endTime)
            }
        })
    })
    .refine(intervals => {
        return intervals.every((item) => item.endTimeInMinutes - 60 >= item.startTimeInMinutes)
    }, {message: 'O horário final deve ser pelo menos 1 hora maior que o horário inicial!'}),
})

type TimeIntervalsFormInput = z.input<typeof timeIntervalsFormSchema>
type TimeIntervalsFormOutput = z.output<typeof timeIntervalsFormSchema>

const TimeIntervals = () => {

    const {register, handleSubmit, control, watch, formState:{isSubmitting, errors}} = useForm<TimeIntervalsFormInput>({
        resolver: zodResolver(timeIntervalsFormSchema),
        defaultValues:{
            intervals:[
                {weekday: 0, enabled: false, startTime: '08:00', endTime: '19:00'},
                {weekday: 1, enabled: true, startTime: '08:00', endTime: '19:00'},
                {weekday: 2, enabled: true, startTime: '08:00', endTime: '19:00'},
                {weekday: 3, enabled: true, startTime: '08:00', endTime: '19:00'},
                {weekday: 4, enabled: true, startTime: '08:00', endTime: '19:00'},
                {weekday: 5, enabled: true, startTime: '08:00', endTime: '19:00'},
                {weekday: 6, enabled: false, startTime: '08:00', endTime: '19:00'},
            ]
        }
    })

    const { fields } = useFieldArray({
        control,
        name: 'intervals'
    })

    const weekDays = getWeekDays()

    const intervals = watch('intervals')
    
    const  router = useRouter()
    
    async function handleSetTimeIntervals(data: any){
        const {intervals} = data as TimeIntervalsFormOutput
    
        await api.post("/users/time-intervals", {
            intervals,
       });

       await router.push('/register/update-profile')
    }

    return (
        <>
            {/* <NextSeo
                title="Selecione sua disponibilidade| Ignite Call"
                noindex
            /> */}

            <Container>
                <Header>
                    <Heading as='strong'> Quase lá </Heading>
                    <Text>
                    Defina o intervalo de horários que você está disponível em cada dia da semana.
                    </Text>
                    <MultiStep size={4} currentStep={3}/>
                </Header>

                {/* 
                    Lidando com o formulário utilizando o Form do react-hook-form para as novas versões

                    <Form<TimeIntervalsFormInput, TimeIntervalsFormOutput>
                    control={control}
                    onSubmit={handleSubmit(async (data) => await handleSetTimeIntervals(data))}

                */}

                
                {/* Mantendo a estrutura da aula */}
                
                <IntervalBox as='form' onSubmit={handleSubmit(handleSetTimeIntervals)}>   
                    <IntervalContainer>
                        {fields.map((field, index)=> {
                            return(
                                <IntervalItem key={field.id}>
                                    <IntervalDay>
                                        <Controller
                                            name={`intervals.${index}.enabled`}
                                            control={control}
                                            render={({field}) => {
                                                return(
                                                    <Checkbox
                                                        onCheckedChange={(checked) => {
                                                            field.onChange(checked===true)
                                                        }}
                                                        checked={field.value}
                                                    />
                                                )
                                            }}
                                        />
                                        
                                        <Text>{weekDays[field.weekday]}</Text>
                                    </IntervalDay>
            
                                    <IntervalInputs>
                                        <TextInput 
                                            size='sm' 
                                            type='time' 
                                            step={60}
                                            disabled={intervals[index].enabled === false}
                                            {...register(`intervals.${index}.startTime`)}
                                            crossOrigin=""
                                            onPointerEnterCapture={() => {}}
                                            onPointerLeaveCapture={() => {}}
                                        />
                                        
                                        <TextInput 
                                            size='sm'
                                            type='time'
                                            step={60} 
                                            disabled={intervals[index].enabled === false}
                                            {...register(`intervals.${index}.endTime`)}
                                            crossOrigin=""
                                            onPointerEnterCapture={() => {}}
                                            onPointerLeaveCapture={() => {}}
                                        />
                                    </IntervalInputs>
                                </IntervalItem>
                            )
                        })}
                    </IntervalContainer>

                    {errors.intervals && <FormError size='sm'>{errors.intervals.root?.message}</FormError>}

                    <Button type='submit' disabled={isSubmitting}>
                        Próximo passo
                        <ArrowRight/>
                    </Button>
                </IntervalBox>
                {/* </Form> */}
            </Container>
        </>
    )
}

export default TimeIntervals