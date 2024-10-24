'use client'
import { CaretLeft, CaretRight } from "phosphor-react";
import { CalendarActions, CalendarBody, CalendarContainer, CalendarDay, CalendarHeader, CalendarTitle } from "./styles";
import { getWeekDays } from "@/utils/get-week-days";
import { useMemo, useState } from "react";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { useParams } from "next/navigation";

interface CalendarWeek{
    week: number,
    days: Array<{
        date: dayjs.Dayjs,
        disabled: boolean
    }>
}
type CalendarWeeks = CalendarWeek[];

interface BlockedDates{
    blockedWeekDays: number[]
    blockedDates: number[]
}

interface CalendarProps{
    selectedDate: Date | null
    onDateSelected: (date: Date) => void;
}


export function Calendar({selectedDate, onDateSelected} : CalendarProps){

    const [currentDate, setCurrentDate] = useState(()=>{
        return dayjs().set('date', 1);
    });//inicia o calendário no primeiro dia do mês atual

    const shortWeekDays = getWeekDays({short: true});

    const currentMonth = currentDate.format('MMMM');
    const currentYear = currentDate.format('YYYY');

    const searchParams = useParams()
    const username = searchParams.slug

    const {data: blockedDates} = useQuery<BlockedDates>({

        queryKey: ['blockedDates', currentDate.get('year'), currentDate.get('month')],

        queryFn: async () => {
          const response = await api.get(`/users/${username}/blocked-dates`,{
              params:{
                year: currentDate.get('year'),
                month: String(currentDate.get('month') + 1).padStart(2, '0'),
          }})

          return response.data
        },
          
    })

    function handlePreviousMonth(){
        const previousMonth = currentDate.subtract(1, 'month');
        setCurrentDate(previousMonth);
    }

    function handleNextMonth(){
        const nextMonth = currentDate.add(1, 'month');
        setCurrentDate(nextMonth);
    }

    const calendarWeeks = useMemo(() => {

        if(!blockedDates){
            return []
        }

        const daysInMonthArray = Array.from({length: currentDate.daysInMonth()}).map((_, i)=>{
            return currentDate.set('date', i + 1)
        }); //cria um array com os dias do mês

        const firstWeekDay = currentDate.get('day');//primeiro dia da semana do mês
    
        const previousMonthFillArray = Array.from({length: firstWeekDay}).map((_, i) => {
            return currentDate.subtract(i + 1, 'day');
        }).reverse()//preenche os dias do mês anterior no calendário

        const lastDayInCurrentMonth = currentDate.set('date', currentDate.daysInMonth())//último dia do mês

        const lastWeekDay = lastDayInCurrentMonth.get('day');//último dia da semana do mês

        const nextMonthFillArray = Array.from({length: 6 - lastWeekDay}).map((_, i) => {
            return lastDayInCurrentMonth.add(i + 1, 'day');
        })//preenche os dias do próximo mês no calendário

        const calendarDays = [
            ...previousMonthFillArray.map((date) => {return {date, disabled: true}}),

            ...daysInMonthArray.map((date) => {return {
                date, 
                disabled: date.endOf('day').isBefore(new Date())
                
                 || blockedDates.blockedWeekDays.includes(date.get('day'))

                 || blockedDates.blockedDates.includes(date.get('date'))
            }}),//verifica se a data é anterior a data atual

            ...nextMonthFillArray.map((date) => {return {date, disabled: true}})
        ]

        const calendarWeeks = calendarDays.reduce<CalendarWeeks>(
            (weeks, _, i, original) => {
                const isNewWeek = i % 7 === 0;

                if(isNewWeek){
                    weeks.push({
                        week: i / 7 + 1,
                        days: original.slice(i, i + 7),
                    })
                }//se for uma nova semana, adiciona uma nova semana no calendário

                return weeks;
            },
            []
        )

        return calendarWeeks

    },[currentDate, blockedDates])//quando a data mudar, o calendário é recalculado

    return(
        <CalendarContainer>

            <CalendarHeader>
                <CalendarTitle>
                    {currentMonth} <span>{currentYear}</span>
                </CalendarTitle>

                <CalendarActions>
                    <button onClick={handlePreviousMonth} title="Previous month">
                        <CaretLeft/>
                    </button>

                    <button onClick={handleNextMonth} title="Next month">
                        <CaretRight/>
                    </button>
                </CalendarActions>
            </CalendarHeader>

            <CalendarBody>
                <thead>
                    <tr>
                        {shortWeekDays.map(weekDay => <th key={weekDay}>{weekDay}.</th>)}
                    </tr>
                </thead>

                <tbody>
                    {calendarWeeks.map(({ week, days }) => {
                        return(
                            <tr key={week}>
                                {days.map(({date, disabled}) => {
                                    return(
                                        <td key={date.toString()}>
                                            <CalendarDay 
                                                onClick={() => onDateSelected(date.toDate())}
                                                disabled={disabled}
                                            >{date.get('date')}</CalendarDay>
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </CalendarBody>

        </CalendarContainer>
    )
}