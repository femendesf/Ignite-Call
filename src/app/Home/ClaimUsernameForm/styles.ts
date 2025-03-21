import { styled, Text } from "@ignite-ui/react"

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