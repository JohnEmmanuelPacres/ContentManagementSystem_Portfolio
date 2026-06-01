import os
# pyrefly: ignore [missing-import]
from google import genai
# pyrefly: ignore [missing-import]
from dotenv import load_dotenv
# pyrefly: ignore [missing-import]
from pydantic import BaseModel
# pyrefly: ignore [missing-import]
from fastapi import FastAPI, HTTPException
# pyrefly: ignore [missing-import]
from fastapi.middleware.cors import CORSMiddleware

# load environment variables

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

# initialize the gemini
client = genai.Client(api_key=api_key)

# setup fastapi and cors
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# define the request and data model

class ChatRequest(BaseModel):
    message: str

@app.post('/chat')
async def handle_chat(request: ChatRequest):
    try:
        response = client.models.generate_content(
            model='gemini-3.5-flash',
            contents=request.message,
        )
        return {'response': response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))