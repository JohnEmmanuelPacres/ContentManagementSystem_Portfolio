import os
# pyrefly: ignore [missing-import]
from google import genai
# pyrefly: ignore [missing-import]
from google.genai import types
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

# initialize the gemini api
client = genai.Client(api_key=api_key)

# load the brain (portfolio_brain)
with open("CONTEXT.md", "r", encoding="utf-8") as file:
    portfolio_brain = file.read()

# setup fastapi and cors
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://pacres-portfolio.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# define the request and data model

class ChatRequest(BaseModel):
    message: str

@app.post('/api/chat')
async def handle_chat(request: ChatRequest):
    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=request.message,
            config=types.GenerateContentConfig(
                system_instruction=portfolio_brain,
                temperature=0.0,
            )
        )

        return {'reply': response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))