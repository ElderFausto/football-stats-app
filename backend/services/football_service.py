import os
import requests
from dotenv import load_dotenv
from utils.data_processor import process_standings_data, process_team_details_data, process_matches_data
import math

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
    
def get_matches(competition_code: str, status: str = None, page: int = 1, limit: int = 20):
    url = f"{BASE_URL}competitions/{competition_code}/matches"
    params = {}
    if status:
        params['status'] = status.upper()

    try:
        response = requests.get(url, headers=headers, params=params)
        response.raise_for_status()

        raw_data = response.json()
        all_matches = process_matches_data(raw_data)

        # Lógica de Paginação
        total_matches = len(all_matches)
        total_pages = math.ceil(total_matches / limit)

        # Calcula o início e o fim do "fatiamento"
        start_index = (page - 1) * limit
        end_index = start_index + limit

        # Fatia a lista de partidas para retornar apenas a página desejada
        paginated_matches = all_matches[start_index:end_index]

        # Retorna um dicionário com os dados paginados e o total de páginas
        return {
            "matches": paginated_matches,
            "totalPages": total_pages
        }

    except requests.exceptions.RequestException as e:
        print(f"Erro ao buscar partidas: {e}")
        return None
    
def get_team_matches(team_id: int):

    url = f"{BASE_URL}teams/{team_id}/matches"

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()

        raw_data = response.json()
        # Reutilizamos o mesmo processador de dados que já tínhamos!
        processed_data = process_matches_data(raw_data)

        return processed_data

    except requests.exceptions.RequestException as e:
        print(f"Erro ao buscar partidas do time: {e}")
        return None