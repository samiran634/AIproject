

import styled from "styled-components";
import jobImage from "../../../imeges/marvin-meyer-SYTO3xs06fU-unsplash.jpg"
 
 
 
const ImageContainer = styled.div`
height:100vh;
width:100%;
padding:2em;
  display: flex;
 
  background:linear-gradient(to left, rgba(231,136,136, 1), rgba(116,15,15,  0)), url(${jobImage});;
  justify-content: center;
  margin-top: 1rem; /* Adds spacing between input and image */
`;

const About = () => {
    return (
         <div>

<ImageContainer>
            
          </ImageContainer>
         </div>
    );
};

export default About;