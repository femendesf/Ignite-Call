import { CaretLeft, CaretRight } from "phosphor-react";
import { CalendarActions, CalendarBody, CalendarContainer, CalendarDay, CalendarHeader, CalendarTitle } from "./styles";
import { getWeekDays } from "@/utils/get-week-days";
import { useMemo, useState } from "react";
import dayjs from "dayjs";

interface CalendarWeek{
    week: number,
    days: Array<{
        date: dayjs.Dayjs,
        disabled: boolean
    }>
}

type CalendarWeeks = CalendarWeek[];

interface CalendarProps{
    selectedDate?: Date
    onDateSelected: (date: Date) => void;
}


export function Calendar({selectedDate, onDateSelected} : CalendarProps){

    const [currentDate, setCurrentDate] = useState(()=>{
        return dayjs().set('date', 1);
    });//inicia o calendário no primeiro dia do mês atual

    const shortWeekDays = getWeekDays({short: true});

    const currentMonth = currentDate.format('MMMM');
    const currentYear = currentDate.format('YYYY');

    
    function handlePreviousMonth(){
        const previousMonth = currentDate.subtract(1, 'month');
        setCurrentDate(previousMonth);
    }

    function handleNextMonth(){
        const nextMonth = currentDate.add(1, 'month');
        setCurrentDate(nextMonth);
    }

    const calendarWeeks = useMemo(() => {

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
            ...daysInMonthArray.map((date) => {return {date, disabled: date.endOf('day').isBefore(new Date())}}),
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

    },[currentDate])//quando a data mudar, o calendário é recalculado

    console.log(calendarWeeks);

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