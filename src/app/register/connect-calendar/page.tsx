import dynamic from "next/dynamic"

const ConnectCalendar = dynamic(() => import('./components/ConnectCalendar'), { ssr: false })

export const metadata = {
    title: 'Conecte sua agenda do Google | Ignite Call'
}

export default function PageConnectCalendar(){

    return(
        <ConnectCalendar/> 
    )
}