import { motion } from "framer-motion";
import styled from "styled-components";

// Define the CollegeData interface
interface CollegeData {
  "college name": string;
  "college address": string;
  "available branch": string;
  "college phone number": string;
  "branch cutoff": string;
  image: string;
}

interface CollegeCardProps {
  college: CollegeData;
}

const CollegeCardContainer = styled.div`
  max-width: 400px;
  margin: 2rem;
  background-color: rgba(0, 0, 0, 0.7);  /* Adding a semi-transparent background */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 1px 1px 10px 0 blue;
  border-radius: 8px;
  overflow-y: auto;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);  /* Lighter border color for better contrast */
  transition: transform 0.5s ease, box-shadow 0.5s ease;
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2), 2px 2px 15px 0 blue;
  }
`;

const CollegeCardContent = styled.div`
  padding: 1.5rem;  /* Adjusted padding for more compact layout */
`;

const CollegeCardImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 4px;
  margin-bottom: 1rem;  /* Adds spacing below the image */
`;

export default function CollegeCard({ college }: CollegeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <CollegeCardContainer>
        <CollegeCardImage
          src={college.image}
          alt={`Image of ${college["college name"]}`}
        />
        <CollegeCardContent>
          <h2>{college["college name"]}</h2>
          <p>Address: {college["college address"]}</p>
          <p>Branch: {college["available branch"]}</p>
          <p>Phone: {college["college phone number"]}</p>
          <p>Cutoff: {college["branch cutoff"]}</p>
        </CollegeCardContent>
      </CollegeCardContainer>
    </motion.div>
  );
}
