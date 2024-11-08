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
  const [error ] = useState<string | null>(null);

  if (!user) return <RedirectToSignIn />;

  const handleButtonClick = () => {
    setIsChatVisible((prev) => !prev);
  };

  const chatHandler = (
    <ChatHandeler isChatVisible={isChatVisible} handleButtonClick={handleButtonClick} />
  );
//main data fom the backend
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("http://139.84.177.139:4000/data");
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       const data = await response.json();
  //       console.log("Fetched data:", data); // Log fetched data
  //       setCollegeData(data);
  //     } catch (error) {
  //       console.error("Error fetching college data:", error);
  //       setError("Failed to fetch college data.");
  //     }
  //   };

  //   fetchData();
  // }, []);


  useEffect(() => {
    const collegeData: CollegeData[] = [
      {
        "college name": "Indian Institute of Technology, Bombay",
          "college address": "Powai, Mumbai",
        "available branch": "CSE",
        "branch cutoff": "2819",
        "college phone number": "+91 9954629993",
        "image": "https://cdn.pixabay.com/photo/2021/10/11/04/08/university-6699377_1280.jpg"
      },
      {
       
        "college name": "Indian Institute of Technology, Bombay",
        "college address": "Powai, Mumbai",
        "available branch": "ECE",
        "branch cutoff": "1692",
        "college phone number": "+91 9954629993",
        "image": "https://cdn.pixabay.com/photo/2021/10/11/04/08/university-6699377_1280.jpg"
      },
      {
 
        "college name": "Indian Institute of Technology, Delhi",
        "college address": "Hauz Khas, New Delhi",
        "available branch": "ME",
        "branch cutoff": "2511",
        "college phone number": "+91 9954629994",
        "image": "https://cdn.pixabay.com/photo/2021/10/11/04/08/university-6699377_1280.jpg"
      },
      {
   
        "college name": "Indian Institute of Technology, Delhi",
        "college address": "Hauz Khas, New Delhi",
        "available branch": "CE",
        "branch cutoff": "2019",
        "college phone number": "+91 9954629994",
        "image": "https://cdn.pixabay.com/photo/2021/10/11/04/08/university-6699377_1280.jpg"
      },
      {
   
        "college name": "Indian Institute of Technology, Kanpur",
        "college address": "Kalyanpur, Kanpur",
        "available branch": "EE",
        "branch cutoff": "2211",
        "college phone number": "+91 9954629995",
        "image": "https://cdn.pixabay.com/photo/2021/10/11/04/08/university-6699377_1280.jpg"
      },
      {
   
        "college name": "Indian Institute of Technology, Kanpur",
        "college address": "Kalyanpur, Kanpur",
        "available branch": "CHE",
        "branch cutoff": "1911",
        "college phone number": "+91 9954629995",
        "image": "https://cdn.pixabay.com/photo/2021/10/11/04/08/university-6699377_1280.jpg"
      }
    ];
    setCollegeData(collegeData);
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
