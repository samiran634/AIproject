import express from "express";
import axios from "axios";
import cookieParser from "cookie-parser";
import { connectToDatabase, streamAllData, closeConnection } from "./database.js";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import fetch from "node-fetch";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
 
const apiKey = process.env.API_KEY;
app.use(cors());
// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());

// Route to get models
app.get("/model", async (req, res) => {
  try {
    const response = await fetch("https://api.vultrinference.com/v1/models", {
      method: "GET",
      headers: {
        authorization: `Bearer ${apiKey}`,
      },
    });
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.error("Error fetching models:", error);
    res.status(500).json({ error: "Failed to fetch models" });
  }
});

// Hello World route
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.post("/chat", async (req, res) => {
  const url="https://api.vultrinference.com/v1/chat/completions";
async function postRequest(message) {
    try {
        const response = await axios.post(url, {
            "model": "zephyr-7b-beta-Q5_K_M",
            "messages": [
                {
                    "role": "user",
                    "content": message
                }
            ],
            "max_tokens": 512,
            "seed": -1,
            "temperature": 0.8,
            "top_k": 40,
            "top_p": 0.9,
            "stream": true
        }, {
            headers: {
                authorization: `Bearer ${apiKey}`,
            }
        });
        return response;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
console.log(req.body.message);
      let data=await postRequest(req.body.message);
      console.log(data);
      res.json(data);
});

// Route to stream data from MongoDB
app.get("/data", async (req, res) => {
  try {
    const dataArray = [];
    for await (const doc of streamAllData()) {
      dataArray.push(doc);
    }
    console.log(dataArray);
    res.json(dataArray);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data from database" });
  }
});

// Start the server and connect to the database
app.listen(PORT, async () => {
  try {
     await connectToDatabase();
    console.log("Connected to database");
    console.log(`Server is running on http://localhost:${PORT}`);
  } catch (error) {
    console.error("Failed to connect to database", error);
  }
 
});
