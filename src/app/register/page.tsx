import dynamic from "next/dynamic"

const Register = dynamic(() => import('./components/Register'), { ssr: false })

export default function PageRegister(){
    return(
        <Register/>
    )
}