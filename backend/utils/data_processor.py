import pandas as pd
from datetime import datetime

def process_standings_data(api_data: dict):
   
    standings = api_data.get("standings", [])
    if not standings:
        return []

    table_data = standings[0].get("table", [])

    clean_data = []

    for row in table_data:
        team_info = row.get("team", {})

        team_dict = {
            "posicao": row.get("position"),
            "time_id": team_info.get("id"),
            "escudo": team_info.get("crest"),
            "time": team_info.get("name"),
            "pontos": row.get("points"),
            "jogos": row.get("playedGames"),
            "vitorias": row.get("won"),
            "empates": row.get("draw"),
            "derrotas": row.get("lost"),
            "golsPro": row.get("goalsFor"),
            "golsContra": row.get("goalsAgainst"),
            "saldoGols": row.get("goalDifference")
        }
        clean_data.append(team_dict)

    df = pd.DataFrame(clean_data)

    return df.to_dict(orient="records")

def process_team_details_data(api_data: dict):
   
    squad = []
    for player in api_data.get("squad", []):
        squad.append({
            "id": player.get("id"),
            "nome": player.get("name"),
            "posicao": player.get("position"),
            "nacionalidade": player.get("nationality")
        })

    coach = api_data.get("coach", {})

    processed_data = {
        "id": api_data.get("id"),
        "nome": api_data.get("name"),
        "sigla": api_data.get("tla"),
        "escudo": api_data.get("crest"),
        "fundacao": api_data.get("founded"),
        "estadio": api_data.get("venue"),
        "tecnico": {
            "id": coach.get("id"),
            "nome": coach.get("name"),
            "nacionalidade": coach.get("nationality")
        },
        "elenco": squad
    }

    return processed_data

def format_date(date_string: str):
    if not date_string:
        return {"data": "A definir", "hora": ""}

    # Converte a string ISO (ex: '2025-10-21T22:00:00Z') para um objeto datetime
    dt_object = datetime.fromisoformat(date_string.replace('Z', '+00:00'))
    return {
        "data": dt_object.strftime('%d/%m/%Y'),
        "hora": dt_object.strftime('%H:%M')
    }
    
def process_matches_data(api_data: dict):
    """Processa os dados brutos de partidas."""
    clean_data = []
    for match in api_data.get("matches", []):
        match_dict = {
            "id": match.get("id"),
            "dataHora": format_date(match.get("utcDate")),
            "status": match.get("status"),
            "rodada": match.get("matchday"),
            "timeCasa": {
                "id": match.get("homeTeam", {}).get("id"),
                "nome": match.get("homeTeam", {}).get("name"),
                "escudo": match.get("homeTeam", {}).get("crest")
            },
            "timeFora": {
                "id": match.get("awayTeam", {}).get("id"),
                "nome": match.get("awayTeam", {}).get("name"),
                "escudo": match.get("awayTeam", {}).get("crest")
            },
            "placar": {
                "casa": match.get("score", {}).get("fullTime", {}).get("home"),
                "fora": match.get("score", {}).get("fullTime", {}).get("away")
            }
        }
        clean_data.append(match_dict)

    return clean_data