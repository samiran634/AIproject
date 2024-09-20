 import Chat from "../../components/navbar/pages/chatbot";
 import { useUser } from "@clerk/clerk-react";
 import Top from "./topsecton";
 
  
  
 
const HomePage=( )=>{
    if(!useUser){


    }
    else{
        return ( 
            <Top>
       <Chat/>
            </Top> 
         )
    }
    
       
  
    
}
export default HomePage