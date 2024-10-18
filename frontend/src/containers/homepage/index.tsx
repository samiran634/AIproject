 
 import { useUser } from "@clerk/clerk-react";
 import Top from "./topsecton";
 import ChatContainer from '../../components/chat-bot/chat';
  import ChatButton from '../../components/chatbutton';
  let topprops={
    className:"chat-container",
    children:<ChatContainer/>,
    ondelete:true,
    children2:<ChatButton/>,
   
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