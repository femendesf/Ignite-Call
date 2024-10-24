'use client'
import { Avatar, Heading, Text } from "@ignite-ui/react";
import { Container, UserHeader } from "./styles";
import { ScheduleProps } from "../page";
import { ScheduleForm } from "../ScheduleForm";
// import { NextSeo } from "next-seo";

const PageSchedule = ({user}: ScheduleProps) => {
    return(
        <>
            {/* <NextSeo
                title={`Agendar com ${user.name} | Ignite Call`}
            /> */}

            <Container>
                <UserHeader>
                    <Avatar src={user.avatar_url}/>
                    <Heading>{user.name}</Heading>
                    <Text>{user.bio}</Text>
                </UserHeader>

                <ScheduleForm/>
                
            </Container>  
        </>
    )
}

export default PageSchedule;