import dynamic from "next/dynamic"

const TimeIntervals = dynamic(() => import('./components/TimeIntervals'), { ssr: false })

export const metadata = {
    title: 'Selecione sua disponibilidade| Ignite Call'
}

export default function PageTimeIntervals(){
    return(
        <TimeIntervals/>
    )
}