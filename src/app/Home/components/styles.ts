import { Heading, Text, Box, styled } from "@ignite-ui/react";

export const Container = styled('div', {
    maxWidth: 'calc(100vw - (100vw - 1160px) / 2)',
    marginLeft: 'auto',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    gap: '$20'
})

export const Hero = styled('div', {
    maxWidth: 480,
    padding: '0 $10',

    [ `${Heading}`]: {
        '@media(max-width:600px)': {
            fontSize: '$6xl'
        }
    },

    [ `${Text}`]: {
        marginTop: '$2',
        color: '$gray200'
    }
})

export const Preview = styled('div', {
    paddingRight: '$8',
    overflow: 'hidden',

    '@media (max-width:600px)': {
        display: 'none',
    }
})

export const ProfileBox = styled(Box,{
    marginTop: '$6',
    display: 'flex',
    flexDirection: 'column',
    gap: '$4',

    label:{
        display: 'flex',
        flexDirection: 'column',
        gap: '$2'
    }
})

export const FormAnnotation = styled(Text,{
    color: '$gray200'
})

export const Form = styled('form', {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gap: '$2',
    marginTop: '$4',
    padding: '$4',

    '@media (max-width:600px)': {
        gridTemplateColumns: '1fr',
    }
})