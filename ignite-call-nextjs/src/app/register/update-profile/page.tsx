import { buildNextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { UpdateProfile } from "./components/ComponentUpdateProfile";

export default async function TesteUpdate(){

    const session = await getServerSession(buildNextAuthOptions);

    if(!session){
        return (console.log('Usuário não autenticado'));
    }
    return (
        <>
          <UpdateProfile session={session}/>
        </>
    )
}