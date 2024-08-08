import { Box, styled } from "@ignite-ui/react";

export const IntervalBox= styled(Box, {
    marginTop: '$6',
    display: 'flex',
    flexDirection: 'column',
})

export const IntervalContainer = styled('div', {
    border: '1px solid $gray600',
    borderRadius: '$md',
    marginBottom: '$4',
})

export const IntervalItem = styled('div', {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '$3 $4',

    '& + &':{
        borderTop: '1px solid $gray600'
    }
})

export const IntervalDay = styled('div',{
    display: 'flex',
    gap: '$3',
    alignItems: 'center',
})

export const IntervalInputs = styled('div',{
    display: 'flex',
    gap: '$2',
    alignItems: 'center',

    'input::-webkit-calendar-picker-indicator':{
        filter: 'invert(100%) brightness(40%)'
    }
})
