import {   useUser } from "@clerk/clerk-react";
import { motion } from "framer-motion";
  
import { Navigate } from 'react-router-dom';
import styled from "styled-components";
const Containerdiv = styled.div`
    margin-top: 30%;
    text-align: center; 
    display: flex;
    justify-content: center;
    align-items: center;
    font-style: italic; 
    font-weight: bold; 
    color: #333;
 
    @media (max-width: 768px) {
      margin-top: 20%;
    }

    @media (max-width: 500px) {
      margin-top: 20em;
    }
`;
function UnProtectedPage() {
  const { user } = useUser();
  if(user){
    return <Navigate to="/home" />;
   } 


  return (
    <Containerdiv>
      <motion.div
      initial={{ opacity: 0, y: -100, padding: "10px", position: "relative", top: "10px" }}
      animate={{ opacity: 1, y: 0, scale: [1, 1.5, 1] }}
      transition={{ duration: 3, type: "spring", stiffness: 120, damping: 10, repeat: Infinity }}
      >
      This page is not protected please sign in to use our services
      </motion.div>
    </Containerdiv>
  );
};

export default UnProtectedPage;
