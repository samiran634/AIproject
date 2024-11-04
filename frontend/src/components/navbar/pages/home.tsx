
import Top from "../../../containers/homepage/topsecton";
import {   useUser, RedirectToSignIn } from '@clerk/clerk-react';
import styled from 'styled-components';
 
let Container = styled.div`
width: 100%;
height: 100vh;
display: flex;
margin-top: 10rem;
color: black;
background-color: red;
justify-content: center;
align-items: center;
`
const ProtectedPage = () => {

  const { user } = useUser();

  if (!user) {
    return <RedirectToSignIn />;
  }

  return (
   
  <Top>
    <h1 >This page was protected</h1>
 
      </Top>
 
  );
};

export default ProtectedPage;
