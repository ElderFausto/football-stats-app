from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS
origins = [
    "http://localhost:3000", # React
    "http://localhost:5173", # Vite
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Cria primeiro endpoint na raiz ("/") da API
@app.get("/")
def read_root():
    return {"message": "Bem-vindo à API de Estatísticas de Futebol!"}