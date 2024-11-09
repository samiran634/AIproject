import styled from "styled-components";
import jobImage from "../../../images/marvin-meyer-SYTO3xs06fU-unsplash.jpg"
import { motion } from "framer-motion";
import  { useState } from 'react';

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
    const [isVisible, setIsVisible] = useState(true);

    return (
        <div>
            <ImageContainer>
                <div style={{
                
                    color: '#fff',
                    fontSize: '1.2rem',
                    lineHeight: '1.8',
                    maxWidth: '800px',
                    maxHeight: '80vh',
                    marginTop: '4rem',
                    padding: '2rem',
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    borderRadius: '10px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    whiteSpace: 'pre-wrap',
                    overflowY: 'auto',
                    wordWrap: 'break-word'
                }}>
                    <motion.div
                    initial={{ opacity: 0, y: -100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 5, type: "spring", stiffness: 120, damping: 10,delay: 1 }}
                    onAnimationComplete={() => {
                        setTimeout(() => setIsVisible(false), 3000);
                    }}
                    style={{display: isVisible ? 'block' : 'none',
                        fontSize: '4rem', fontWeight: 'bold',
                        fontFamily: 'cursive',color: 'blue',
                        paddingTop: '2rem',
                    }}
                    >Well in the age of AI every thing is automated... why not counseling?
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: -100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 3, type: "spring", stiffness: 120, damping: 10,delay: 3 }}
                  
                    style={{display: isVisible ? 'none' : 'flex',
                     
                    }}>{text}</motion.div>
                </div>  
            </ImageContainer>
        </div>
    );
};

export default About;