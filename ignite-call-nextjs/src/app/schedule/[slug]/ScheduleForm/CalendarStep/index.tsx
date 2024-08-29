import { Calendar } from "@/app/components/Calendar";
import { Container, TimePicker, TimePickerHeader, TimePickerItem, TimePickerList } from "./styles";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useParams } from "next/navigation";
import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface Availability {
  possibleTimes: number[];
  availableTimes: number[];
}

export function CalendarStep() {

  const [selectedDate, setSelectedDay] = useState<Date | null>(null)

  //const [availability, setAvailability] = useState<Availability | null>(null);

  const {slug: username} = useParams()

  const isDateSelected = !!selectedDate;

  const weekDay = selectedDate ?  dayjs(selectedDate).format('dddd') : null; // dia da semana

  const describeDate = selectedDate ? dayjs(selectedDate).format('DD [de] MMMM') : null; // dia e mês

  const selectedDateWithoutTime = selectedDate ? dayjs(selectedDate).format('YYYY-MM-DD') : null; 

  const {data: availability} = useQuery<Availability>({
    queryKey: ['availability', selectedDateWithoutTime],
    queryFn: async () => {
      const response = await api.get(`/users/${username}/availability`,{
          params:{
            date: selectedDateWithoutTime
          }
      })
      return response.data
    },
      enabled: !!selectedDate ,
  });// hook para fazer a requisição

  // useEffect(() => {
  //   if(!selectedDate){
  //     return 
  //   }

  //   api.get(`/users/${username}/availability`,{
  //     params:{
  //       date: dayjs(selectedDate).format('YYYY-MM-DD')
  //     }
  //   }).then((response) => {
  //     setAvailability(response.data)
  //   })

  // }, [selectedDate, username])

  return(
    <Container isTimePickerOpen={isDateSelected}>

      <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDay}/>

      {isDateSelected && (

        <TimePicker>
          <TimePickerHeader>
            {weekDay} <span>{describeDate}</span>
          </TimePickerHeader>

          <TimePickerList>
            {availability?.possibleTimes.map((hour) => {
              return(
                <TimePickerItem key={hour} disabled={!availability.availableTimes?.includes(hour)}>
                  {String(hour).padStart(2, '0')}:00h
                </TimePickerItem>
              )
            })}
          </TimePickerList>
          
        </TimePicker>
      )}
    </Container>
  )
}