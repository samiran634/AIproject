import  { useState, useEffect } from "react";
import ChatApp from "../../components/chat/cthat-handeler";
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

const HomePage = () => {
  const [collegeData, setCollegeData] = useState<CollegeData[]>([]);
  const [error, setError] = useState<string | null>(null); // Add error state
  const { user } = useUser();

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

  const sampleData = [
    {
      "college name": "Sample College",
      "college address": "123 College St",
      "available branch": "Engineering",
      "college phone number": "123-456-7890",
      "branch cutoff": "90%",
      "image": "sample.jpg",
      id: "1",
    },
  ];

  const topprops = {
    className: "chat-container",
    children: <ChatApp onClick={() => {}} />,
    Children: sampleData.map((college) => (
      <CollegeCard key={college.id} college={college} />
    )),
  };

  console.log("Rendering ChatApp and CollegeCards"); // Log rendering

  if (error) {
    return <div>{error}</div>; // Render error message if exists
  }

  if (!user) {
    return (
      <div style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "2rem",
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
        padding: "2rem",
        background: "#f5f5f5",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
      }}>
        Please log in to access this page
      </div>
    );
  }

  console.log("User:", user); // Log user information

  if (collegeData.length === 0 && !error) {
    return (
      <div style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center", 
        alignItems: "center",
        fontSize: "1.5rem",
        color: "#666",
        background: "#f8f9fa",
        padding: "2rem",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        animation: "pulse 1.5s infinite"
      }}>
        <style>
          {`
            @keyframes pulse {
              0% { opacity: 0.6; }
              50% { opacity: 1; }
              100% { opacity: 0.6; }
            }
          `}
        </style>
        Loading colleges...
      </div>
    );
  }

  return (
    <>
      <Top {...topprops} />
    </>
  );
};

export default HomePage;
