# Football Stats API

[![Python](https://img.shields.io/badge/Python-3.10+-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110-green.svg)](https://fastapi.tiangolo.com/)
[![Pandas](https://img.shields.io/badge/Pandas-2.2-blueviolet.svg)](https://pandas.pydata.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

<img width="1031" height="839" alt="image" src="https://github.com/user-attachments/assets/35ffddf8-0f34-479a-9ef8-8b14a6a2aba9" />
<img width="1031" height="839" alt="image" src="https://github.com/user-attachments/assets/604b8ed0-9bb0-4f60-918e-07891d55c954" />
<img width="1031" height="839" alt="image" src="https://github.com/user-attachments/assets/817574e3-3d28-4266-9fdf-b334c2135b5b" />
<img width="1029" height="493" alt="image" src="https://github.com/user-attachments/assets/d86aa968-369f-4829-8003-4ae6106e5eb5" />
<img width="1004" height="473" alt="image" src="https://github.com/user-attachments/assets/bf1fa098-d0d0-4631-99cc-f0780792d099" />



Esta é uma API de backend construída com **Python** e **FastAPI** que atua como um intermediário seguro e inteligente para a API do `football-data.org`. Ela busca dados brutos de futebol, os processa, limpa e os serve em um formato simples e pronto para consumo por qualquer cliente frontend.

## 🏛️ Arquitetura e Propósito

O principal objetivo desta API é atuar como um **Backend for Frontend (BFF)**, seguindo as melhores práticas de segurança e eficiência:

1.  **Segurança de API Keys:** A chave secreta da API do `football-data.org` é armazenada de forma segura no servidor e nunca é exposta ao cliente, protegendo-a contra uso indevido.
2.  **Processamento de Dados no Servidor:** A lógica de limpeza, formatação e paginação dos dados é feita aqui, utilizando a biblioteca **Pandas**. Isso reduz a carga de processamento no frontend e garante que os dados enviados sejam leves e estruturados.
3.  **Interface Simplificada:** Oferece endpoints simples e diretos para o frontend, abstraindo a complexidade da API externa.

## 🚀 Funcionalidades Principais

-   **Proxy Seguro:** Centraliza todas as chamadas para a API externa, gerenciando a autenticação com a `X-Auth-Token`.
-   **Processamento de Dados com Pandas:** Transforma respostas JSON complexas e aninhadas em listas de dados limpas e "achatadas" (`flat`), ideais para renderização em tabelas e listas.
-   **Paginação no Backend:** Implementa a lógica de paginação para as listas de partidas, enviando para o cliente apenas os 20 itens da página solicitada, garantindo performance.
-   **Documentação Automática:** Graças ao FastAPI, a API é 100% autodocumentada. Acesse a documentação interativa em `/docs`.

## 🛠️ Tecnologias Utilizadas

-   **Python 3.10+**
-   **FastAPI:** Framework web moderno e de alta performance para a construção da API.
-   **Uvicorn:** Servidor ASGI para rodar a aplicação FastAPI.
-   **Pandas:** Para manipulação e processamento de dados.
-   **Requests:** Para fazer as requisições HTTP para a API externa.
-   **Python-dotenv:** Para gerenciar variáveis de ambiente e segredos.

## 📄 Endpoints da API

-   `GET /api/standings/{competition_code}`: Retorna a tabela de classificação de um campeonato.
-   `GET /api/matches/{competition_code}`: Retorna as partidas de um campeonato. Aceita o parâmetro de query `?status=SCHEDULED|FINISHED`.
-   `GET /api/teams/{team_id}`: Retorna os detalhes de um time específico, incluindo o elenco.

## ⚙️ Como Executar o Projeto

1.  **Pré-requisitos:**
    -   Python 3.10 ou superior.
    -   Obtenha uma chave de API gratuita em [football-data.org](https://www.football-data.org/).

2.  **Clone o repositório e navegue até a pasta `backend`:**
    ```bash
    git clone [https://github.com/seu-usuario/football-stats-app.git](https://github.com/seu-usuario/football-stats-app.git)
    cd football-stats-app/backend
    ```

3.  **Crie e ative um ambiente virtual:**
    ```bash
    python3 -m venv venv
    source venv/bin/activate
    ```

4.  **Instale as dependências:**
    ```bash
    pip install -r requirements.txt
    ```

5.  **Configure suas credenciais:**
    -   Crie um arquivo chamado `.env` na pasta `backend`.
    -   Adicione sua chave de API nele: `FOOTBALL_DATA_API_KEY=sua_chave_aqui`.

6.  **Execute o servidor:**
    ```bash
    python3 -m uvicorn main:app --reload
    ```

7.  A API estará disponível em `http://localhost:8000`.
