from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional

from services.football_service import get_standings, get_team_details, get_matches, get_team_matches

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

@app.get("/api/teams/{team_id}")
async def fetch_team_details(team_id: int):
    data = get_team_details(team_id)
    if data is None:
        raise HTTPException(status_code=500, detail="Não foi possível buscar os detalhes do time.")
    return data

@app.get("/api/matches/{competition_code}")
async def fetch_matches(competition_code: str, status: Optional[str] = None, page: int = 1, limit: int = 20):
    data = get_matches(competition_code, status, page, limit)
    if data is None:
        raise HTTPException(status_code=500, detail="Não foi possível buscar as partidas.")
    return data

@app.get("/api/teams/{team_id}/matches")
async def fetch_team_matches(team_id: int):
    data = get_team_matches(team_id)
    if data is None:
        raise HTTPException(status_code=500, detail="Não foi possível buscar as partidas do time.")
    return data