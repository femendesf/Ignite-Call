import { globalCss } from '@ignite-ui/react'

export const globalStyles = globalCss({

    '*': {
        boxSizing: 'border-box',
        padding: 0,
        margin: 0
    },
    
    body: {
        backgroundColor: '$gray900',
        color: '$gray100',
        '-webkit-font-smoothing': 'antialiased', 
    },

    button: {
        borderRadius: '$md !important', // Aqui você pode usar os tokens de radii do Ignite UI, como $md ou qualquer outro
      },

})