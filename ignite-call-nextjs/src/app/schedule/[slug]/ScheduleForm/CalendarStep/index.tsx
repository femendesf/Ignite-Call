import { Calendar } from "@/app/components/Calendar";
import { Container, TimePicker, TimePickerHeader, TimePickerItem, TimePickerList } from "./styles";
import { useState } from "react";

export function CalendarStep() {

  const [selectedDate, setSelectedDay] = useState<Date | null>(null)

  const isDateSelected = !!selectedDate;
  
  return(
    <Container isTimePickerOpen={isDateSelected}>

      <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDay}/>

      {isDateSelected && (
        <TimePicker>
          <TimePickerHeader>
            terça-feira <span>20 de setembro</span>
          </TimePickerHeader>

          <TimePickerList>
            <TimePickerItem>08:00h</TimePickerItem>
            <TimePickerItem>09:00h</TimePickerItem>
            <TimePickerItem>10:00h</TimePickerItem>
            <TimePickerItem>11:00h</TimePickerItem>
            <TimePickerItem>12:00h</TimePickerItem>
            <TimePickerItem>13:00h</TimePickerItem>
            <TimePickerItem>14:00h</TimePickerItem>
            <TimePickerItem>15:00h</TimePickerItem>
            <TimePickerItem>16:00h</TimePickerItem>
            <TimePickerItem>17:00h</TimePickerItem>
            <TimePickerItem>18:00h</TimePickerItem>
          </TimePickerList>
          
        </TimePicker>
      )}
    </Container>
  )
}