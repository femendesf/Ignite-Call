
// import dynamic from "next/dynamic"

import { Register } from "./components/Register";

// const Register = dynamic(() => import('./components/Register'), { ssr: false })

export default function PageRegister(){
    return(
        <Register/>
    )
}