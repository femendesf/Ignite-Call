import { Box, styled, Text } from "@ignite-ui/react";

export const ConfirmForm = styled(Box,{
    maxWidth: 540,
    margin: '$6 auto 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '$4',

    label:{
        display: 'flex',
        flexDirection: 'column',
        gap: '$2',
    }
})

export const FormHeader = styled('div',{
    display: 'flex',
    gap: '$4',
    alignItems: 'center',

    paddingBottom: '$6',
    marginBottom: '$4',
    borderBottom: '1px solid $gray600',

    [`${Text}`]:{
        display: 'flex',
        gap: '$2',
        alignItems: 'center',

        svg:{
            color: '$gray200',
            width: '$5',
            height: '$5',
        }
    }

})

export const FormError = styled(Text,{
    color: '#f75a68',
})

export const FormActions = styled('div',{
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '$4',
    marginTop: '$2',
})