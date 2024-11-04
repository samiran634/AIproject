 
const HTTP="http://localhost:5000";
import { createContext, useState, useEffect } from "react";
import ChatApp from "../../components/parent";
import CollegeCard from "../../components/card/collegecard";
import { useUser } from "@clerk/clerk-react";
import Top from "./topsecton";
interface CollegeData {
  "college name": string;
  "college address": string;
  "available branch": string;
  "college phone number": string;
  "branch cutoff": string;
  "image": string;
  id: string;
}

const [collegeData, setCollegeData] = useState<CollegeData[]>([]);
        
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(`${HTTP}/data`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCollegeData(data);
    } catch (error) {
      console.error("Error fetching college data:", error);
    }
  };

  fetchData();
}, []);

 

  
interface CollegeCardProps {
  college: CollegeData;
  }
 

let topprops = {
    className: "chat-container",
    children: <ChatApp />,  
    Children: collegeData.map((college) => (
        <CollegeCard key={college.id} college={college} />
    )),
    ondelete: true,
}

const HomePage = () => {
    if (!useUser) {
        throw new Error("User not found");
    }
    else {
        console.log("user found", useUser);

        return (
            <>
                <Top   {...topprops}>
                </Top>
            </>
        )
    }
}

export default HomePage