'use client'
import { Avatar, Heading, Text } from "@ignite-ui/react";
import { Container, UserHeader } from "./styles";
import { ScheduleProps } from "../page";
import { ScheduleForm } from "../ScheduleForm";
import React from "react";
import { NextSeo } from "next-seo";

export function PageSchedule({user}: ScheduleProps){
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