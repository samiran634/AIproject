// HomePage.tsx
import React, { useState, useEffect } from "react";
import ChatHandeler from "../../components/chat/chat-handeler";
import { RedirectToSignIn, useUser } from "@clerk/clerk-react";
import Top from "./topsecton";
import CollegeCard from "../../components/card/collegecard";
interface collegeData {
  "college name": string;
  "college address": string;
  "available branch": string;
  "college phone number": string;
  "branch cutoff": string;
  image: string;
}

const HomePage = () => {
  const { user } = useUser();
  const [isChatVisible, setIsChatVisible] = useState(false);

  if (!user) return <RedirectToSignIn />;

  const handleButtonClick = () => {
    setIsChatVisible((prev) => !prev);
  };

  const chatHandler = (
    <ChatHandeler isChatVisible={isChatVisible} handleButtonClick={handleButtonClick} />
  );


 
    const [collegeData, setCollegeData] = useState<collegeData[]>([]);
    const [error, setError] = useState<string | null>(null); // Add error state
 
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:4000/data");
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          console.log("Fetched data:", data); // Log fetched data
          setCollegeData(data);
        } catch (error) {
          console.error("Error fetching college data:", error);
          setError("Failed to fetch college data."); // Set error message
        }
      };
  
      fetchData();
    }, []);
  
 

   
  return (
    <>
      <Top 
        chatHandler={chatHandler} 
        card={collegeData.map((college, index) => (
          <CollegeCard college={college} key={index.toString()}/>
        ))} 
      />
    </>
  );
};

export default HomePage;
