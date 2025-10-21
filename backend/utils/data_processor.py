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