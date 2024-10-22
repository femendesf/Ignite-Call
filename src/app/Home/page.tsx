// import dynamic from "next/dynamic"

import { Home } from "./PageHome"

// const Home = dynamic(() => import('./PageHome'), { ssr: false })

export const metadata = {
    title: 'Descomplique sua agenda | Ignite Call',
  }
  
  export default function PageHome() {
  
      return (
        <Home/>
      )
    }