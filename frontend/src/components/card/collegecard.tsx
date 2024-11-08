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
    key: string;
}

const CollegeCardContainer = styled.div`
    max-width: 400px;
    margin: 2rem;
    background-color: transparent;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow-y: auto;
    color: white;
    box-shadow: 1px 1px 10px 0 blue;
    border: 1px solid rgba(0, 0, 0, 0.1);
    transition: transform 0.5s ease;
    &:hover {
        transform: translateY(-10px);
    }
`;

const CollegeCardContent = styled.div`
    padding: 2rem;
`;

const CollegeCardImage = styled.img`
    width: 100%;
    height: auto;
    border-radius: 4px;
`;

export default function CollegeCard({ college }: CollegeCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <CollegeCardContainer>
                <CollegeCardContent>
                    <h2>{college["college name"]}</h2>
                    <p>Address: {college["college address"]}</p>
                    <p>Branch: {college["available branch"]}</p>
                    <p>Phone: {college["college phone number"]}</p>
                    <p>Cutoff: {college["branch cutoff"]}</p>
                </CollegeCardContent>
                <CollegeCardImage
                    src={college.image}
                    alt={`${college["college name"]} image`}
                />
            </CollegeCardContainer>
        </motion.div>
    );
}

// Assuming you have an array of college data
const colleges: CollegeData[] = [
    {
        "college name": "College A",
        "college address": "Address A",
        "available branch": "Branch A",
        "college phone number": "1234567890",
        "branch cutoff": "90%",
        image: "imageA.jpg"
    },
    {
        "college name": "College B",
        "college address": "Address B",
        "available branch": "Branch B",
        "college phone number": "0987654321",
        "branch cutoff": "85%",
        image: "imageB.jpg"
    },
    // Add more college data objects as needed
];

// Render the CollegeCard components
function CollegeList() {
    return (
        <div>
            {colleges.map((college) => (
                <CollegeCard key={college["college name"]} college={college} />
            ))}
        </div>
    );
}
