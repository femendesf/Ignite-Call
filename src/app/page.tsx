import dynamic from "next/dynamic"

const Home = dynamic(() => import('../app/home/PageHome/index'), { ssr: false })

export const metadata = {
    title: 'Descomplique sua agenda | Ignite Call',
}
  
  export default function PageHome() {
  
      return (
        <Home/>
      )
    }