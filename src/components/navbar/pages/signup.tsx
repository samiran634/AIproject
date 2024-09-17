import styled from "styled-components";
 
import SignupForm from "../../accountfolder/signup"
const Container=styled.div`
display:flex;
justify-content:center;
margin-top:8em;
margin-bottom:2em;

`
const Signup = () => {
    return (
        <Container>
            <SignupForm/>
        </Container>
 
       
    );
};

export default  Signup;