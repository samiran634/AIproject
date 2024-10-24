 
 import { useUser } from "@clerk/clerk-react";
 import Top from "./topsecton";
 
  import ChatApp from '../../components/parent';
  let topprops={
    className:"chat-container",
    children:<ChatApp />,
    ondelete:true,
  }
 
const HomePage=( )=>{
    if(!useUser){
throw new Error("User not found");

    }
    else{
console.log("user found",useUser);

        return (    
            <>
            <Top   {...topprops}>
            </Top>
            </>
         )
    }
    
       
  
    
}
export default HomePage