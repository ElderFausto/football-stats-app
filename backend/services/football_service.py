import os
import requests
from dotenv import load_dotenv
from utils.data_processor import process_standings_data, process_team_details_data

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
        
        raw_data = response.json()

        processed_data = process_standings_data(raw_data)
        
        return processed_data

    except requests.exceptions.RequestException as e:
        print(f"Erro ao buscar dados da API: {e}")
        return None

def get_team_details(team_id: int):
    
    url = f"{BASE_URL}teams/{team_id}"

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()

        raw_data = response.json()

        processed_data = process_team_details_data(raw_data)

        return processed_data

    except requests.exceptions.RequestException as e:
        print(f"Erro ao buscar detalhes do time: {e}")
        return None