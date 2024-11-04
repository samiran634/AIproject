import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./database.js";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
 const apiUrl="https://api.vultrinference.com/v1/chat/completions";

dotenv.config();

// Initialize express app
const app = express();
const PORT =  4000;

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());
app.get("/model",async(req,res)=>{
	const response=await  fetch("https://api.vultrinference.com/v1/models",{
		method:"GET",
		headers:{
			'authorization': "Bearer Y4EO6EF6XN5YC2IAEERWB3VKHXA42UOT33QA",
		}
	});
	const data=await response.json();
	res.send(data);
});
app.get("/", (req, res) => {
  res.send("Hello World");
});
 
app.get("/data", async (req, res) => {
  try {
    const { streamAllData } = connectDB();
    const dataArray = [];
    
    // Stream all documents and collect them into an array
    for await (const doc of streamAllData()) {
      dataArray.push(doc);
    }

    res.json(dataArray);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data from database" });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
