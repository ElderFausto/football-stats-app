import os
import requests
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("FOOTBALL_DATA_API_KEY")
BASE_URL = "https://api.football-data.org/v4/"

if not API_KEY:
    raise ValueError("A chave da API (FOOTBALL_DATA_API_KEY) não foi encontrada no arquivo .env")

headers = {
    "X-Auth-Token": API_KEY
}

def get_standings(competition_code: str):
  
    url = f"{BASE_URL}competitions/{competition_code}/standings"

    try:
        response = requests.get(url, headers=headers)

        response.raise_for_status()

        return response.json()

    except requests.exceptions.RequestException as e:
        print(f"Erro ao buscar dados da API: {e}")
        return None