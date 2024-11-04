import styled from "styled-components";
import jobImage from "../../../imeges/marvin-meyer-SYTO3xs06fU-unsplash.jpg"

// Define the type for props
type Props = {
    text: string;
};

const ImageContainer = styled.div`
height:100vh;
width:100%;
padding:2em;
  display: flex;
 
  background:linear-gradient(to left, rgba(231,136,136, 1), rgba(116,15,15,  0)), url(${jobImage});;
  justify-content: center;
  margin-top: 1rem; /* Adds spacing between input and image */
`;

const About = ({ text }: Props) => {
    return (
        <div>
            <ImageContainer>
                <div style={{
                    color: '#fff',
                    fontSize: '1.2rem',
                    lineHeight: '1.8',
                    maxWidth: '800px',
                    maxHeight: '80vh',
                    padding: '2rem',
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    borderRadius: '10px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    whiteSpace: 'pre-wrap',
                    overflowY: 'auto',
                    wordWrap: 'break-word'
                }}>
                    {text}
                </div>
            </ImageContainer>
        </div>
    );
};

export default About;