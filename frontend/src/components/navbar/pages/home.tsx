 
 
import {   useUser } from "@clerk/clerk-react";
import Container from "../../../containers/Container";  
import { Navigate } from 'react-router-dom';

const UnProtectedPage = () => {
  const { user } = useUser();
  if(user){
    return <Navigate to="/home" />;
   } 


  return (
    
 
    <Container text="This page is not protected please sign in to use our services"/>

     
 
  );
};

export default UnProtectedPage;
