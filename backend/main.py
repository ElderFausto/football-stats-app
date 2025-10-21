from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from services.football_service import get_standings

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Bem-vindo à API de Estatísticas de Futebol!"}

@app.get("/api/standings/{competition_code}")
async def fetch_standings(competition_code: str):
    data = get_standings(competition_code)
    if data is None:
        raise HTTPException(status_code=500, detail="Não foi possível buscar os dados do campeonato.")
    return data