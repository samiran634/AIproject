import   { useState, useEffect } from "react";
import ChatHandeler from "../../components/chat/chat-handeler";
import { RedirectToSignIn, useUser } from "@clerk/clerk-react";
import Top from "./topsecton";
import CollegeCard from "../../components/card/collegecard";

interface CollegeData {
  "college name": string;
  "college address": string;
  "available branch": string;
  "college phone number": string;
  "branch cutoff": string;
  image: string;
}

function HomePage() {
  const { user } = useUser();
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [collegeData, setCollegeData] = useState<CollegeData[]>([]);
  const [error, setError] = useState<string | null>(null);

  if (!user) return <RedirectToSignIn />;

  const handleButtonClick = () => {
    setIsChatVisible((prev) => !prev);
  };

  const chatHandler = (
    <ChatHandeler isChatVisible={isChatVisible} handleButtonClick={handleButtonClick} />
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://139.84.177.139:4000/data");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Fetched data:", data); // Log fetched data
        setCollegeData(data);
      } catch (error) {
        console.error("Error fetching college data:", error);
        setError("Failed to fetch college data.");
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Top 
        chatHandler={chatHandler} 
        card={
          <>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {collegeData.map((college, index) => (
              <CollegeCard key={index.toString()} college={college} />
            ))}
          </>
        } 
      />
    </>
  );
};

export default HomePage;
