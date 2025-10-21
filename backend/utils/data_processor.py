import pandas as pd

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