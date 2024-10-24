import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
// import { Configuration, OpenAIApi } from 'openai';

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
console.log(process.env.OPENAI_API_KEY)
// OpenAI Configuration
// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const openai = new OpenAIApi(configuration);

app.get("/", (req, res) => {
  res.send("Hello World");
});
async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/google-t5/t5-small",
		{
			headers: {
				Authorization: "Bearer hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}
app.post("/chat", async (req, res) => {
  const { message } = req.body;
  try {
    // Use createChatCompletion instead of chat.completions.create
//     const completion = await openai.createChatCompletion({
//       model: "text-davinci-003",
//       prompt: message,  
//       max_tokens: 512,
//       temperature: 0.5,
//       top_p: 1,
//       frequency_penalty: 0,
//       presence_penalty: 0
//     });
// console.log(completion.data.choices[0].message)
    // Send the first message from the assistant as a response
    // res.json(completion.data.choices[0].message);
   
query({"inputs":message}).then((response) => {
	console.log(JSON.stringify(response));
  res.send(JSON.stringify(response));
});
   
  } catch (error) {
    console.error("Error in chat endpoint:", error);
    res.status(500).json({ error: "An error occurred while processing your request." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
