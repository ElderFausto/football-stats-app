import os
import requests
import math
from dotenv import load_dotenv
from utils.data_processor import process_standings_data, process_team_details_data, process_matches_data
from datetime import datetime, timedelta

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
        
        # 2. Adiciona os filtros de data
        today = datetime.now()
        if status.upper() == 'SCHEDULED':
            # Para jogos futuros, busca do dia de hoje até 30 dias no futuro.
            future_date = today + timedelta(days=30)
            params['dateFrom'] = today.strftime('%Y-%m-%d')
            params['dateTo'] = future_date.strftime('%Y-%m-%d')
        elif status.upper() == 'FINISHED':
            # Para jogos passados, busca dos últimos 90 dias até hoje.
            past_date = today - timedelta(days=90)
            params['dateFrom'] = past_date.strftime('%Y-%m-%d')
            params['dateTo'] = today.strftime('%Y-%m-%d')

    try:
        response = requests.get(url, headers=headers, params=params)
        response.raise_for_status()
        
        raw_data = response.json()
        all_matches = process_matches_data(raw_data)
        
        # Lógica de Paginação (permanece igual)
        total_matches = len(all_matches)
        total_pages = math.ceil(total_matches / limit) if limit > 0 else 1
        
        start_index = (page - 1) * limit
        end_index = start_index + limit
        
        paginated_matches = all_matches[start_index:end_index]
        
        return {
            "matches": paginated_matches,
            "totalPages": total_pages
        }

    except requests.exceptions.RequestException as e:
        print(f"Erro ao buscar partidas: {e}")
        return None
    
def get_team_matches(team_id: int, status: str = None):
    url = f"{BASE_URL}teams/{team_id}/matches"
    params = {}

    if status:
        params['status'] = status.upper()
    
        today = datetime.now()
        if status.upper() == 'SCHEDULED':
            # Para jogos futuros, busca do dia de hoje até 30 dias no futuro.
            future_date = today + timedelta(days=30)
            params['dateFrom'] = today.strftime('%Y-%m-%d')
            params['dateTo'] = future_date.strftime('%Y-%m-%d')
        elif status.upper() == 'FINISHED':
            # Para jogos passados, busca dos últimos 90 dias até hoje.
            past_date = today - timedelta(days=90)
            params['dateFrom'] = past_date.strftime('%Y-%m-%d')
            params['dateTo'] = today.strftime('%Y-%m-%d')

    try:
        response = requests.get(url, headers=headers, params=params)
        response.raise_for_status()
        
        raw_data = response.json()
        processed_data = process_matches_data(raw_data)

        # Inverte a ordem dos jogos finalizados para mostrar os mais recentes primeiro
        if status and status.upper() == 'FINISHED':
            processed_data.reverse()
        
        return processed_data

    except requests.exceptions.RequestException as e:
        print(f"Erro ao buscar partidas do time: {e}")
        return None