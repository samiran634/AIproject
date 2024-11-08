from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os
import sqlite3
import google.generativeai as genai
import uvicorn

load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
app = FastAPI()

schema = """
tables:
 TABLE colleges (college_id INTEGER, name VARCHAR(255), address VARCHAR(255), contact_info VARCHAR(100));\n
 TABLE college_courses (college_id INTEGER, course_id INTEGER);\n
 TABLE courses (course_id INTEGER, name VARCHAR(255), duration INTEGER, fees NUMERIC(10, 2));\n
 TABLE scholarships (scholarship_id INTEGER, college_id INTEGER, name VARCHAR(255), eligibility VARCHAR(255), amount NUMERIC(10, 2));\n
 TABLE cutoffs (cutoff_id INTEGER, course_id INTEGER, year INTEGER, cutoff NUMERIC(5, 2));\n
 TABLE faculty (faculty_id INTEGER, name VARCHAR(255), department VARCHAR(255), college_id INTEGER);\n
 TABLE faculty_courses (faculty_id INTEGER, course_id INTEGER);\n
 TABLE hostel (college_id INTEGER, course_id INTEGER, boys_hostel_count INTEGER, girls_hostel_count INTEGER, security_measures VARCHAR(255));\n
"""
prompt = [
    f"""
    You are an expert in converting English questions to SQL query!
    The database has the following schema:{schema}\nFor example,\nExample 1 - How many entries of records are present?, 
    the SQL command will be something like this SELECT COUNT(*) FROM colleges ;
    \n
    only use the provided schema to answer the question, if you are confused about the question, output the nearest possible answer you could make,
    but the sql queary should be absolutely correct\n
    after generating the queary again recheck if all the columns are present according to schema, if not then do the whole thing again\n
    use joins as much as required to produce correct output\n
    also the sql code should not have ``` in beginning or end and sql word in output
    """
]

class QueryRequest(BaseModel):
    question: str

def get_gemini_response(question):
    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content([prompt[0], question])
    return response.text

def read_sql_query(sql, db):
    conn = sqlite3.connect(db)
    cur = conn.cursor()
    try:
        cur.execute(sql)
        rows = cur.fetchall()
    except Exception as e:
        conn.close()
        raise HTTPException(status_code=400, detail=str(e))
    conn.close()
    return rows

def generate_prompt(question, answer):
    return f"""
    Given the following database query question and the corresponding SQL query answer, generate a natural, human-like response based on both.
    The response should sound as if a knowledgeable person is explaining or summarizing the answer.
    Use conversational language and avoid overly technical jargon and do not mention that they are according to our database. The answer should be to the point.
    Question: {question} 
    Answer: {answer}
    """
    
def modify_response(prompt):
    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content([prompt])
    return response.text

@app.get("/")
def read_root():
    return {"message": "Welcome to the end"}

@app.post("/query")
async def query_database(request: QueryRequest):
    try:
        sql_query = get_gemini_response(request.question)

        data = read_sql_query(sql_query, "college.db")

        prompt2 = generate_prompt(request.question, data)

        modified_data = modify_response(prompt2)
        
        return {"sql_query": sql_query, "data": data, "explanation": modified_data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
