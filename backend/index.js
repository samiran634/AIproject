import express from "express"
import  exec  from 'child_process';
import { error } from "console";
 
const app = express();
const port = 5000;

app.get('/run-python', (req, res) => {
    const pythonFile =  "C:\\chat.py";
    if(pythonFile)
    console.log(pythonFile);
else console.log(error)
  exec(`python ${pythonFile}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing Python script: ${error}`);
      return res.status(500).send(`Error: ${error.message}`);
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return res.status(500).send(`stderr: ${stderr}`);
    }
    console.log(`stdout: ${stdout}`);
    res.send(stdout);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
