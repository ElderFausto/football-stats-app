# Football Stats Dashboard

[![Python](https://img.shields.io/badge/Python-3.10+-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110-green.svg)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5-purple.svg)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-38B2AC.svg)](https://tailwindcss.com/)


<img width="1031" height="839" alt="image" src="https://github.com/user-attachments/assets/35ffddf8-0f34-479a-9ef8-8b14a6a2aba9" />
<img width="1031" height="839" alt="image" src="https://github.com/user-attachments/assets/604b8ed0-9bb0-4f60-918e-07891d55c954" />
<img width="1031" height="839" alt="image" src="https://github.com/user-attachments/assets/817574e3-3d28-4266-9fdf-b334c2135b5b" />
<img width="1029" height="493" alt="image" src="https://github.com/user-attachments/assets/d86aa968-369f-4829-8003-4ae6106e5eb5" />
<img width="1004" height="473" alt="image" src="https://github.com/user-attachments/assets/bf1fa098-d0d0-4631-99cc-f0780792d099" />

Um painel de estatísticas de futebol full-stack que une a análise de dados com a paixão por esportes. A aplicação exibe classificações, resultados, próximos jogos e detalhes de times de diversos campeonatos, utilizando uma arquitetura moderna com backend em Python (FastAPI) e frontend em React (Vite).

## 🏛️ Arquitetura do Projeto

Este projeto foi construído seguindo o padrão **Backend for Frontend (BFF)**, uma arquitetura que garante segurança, performance e organização:

1.  **Frontend (React):** A interface do usuário, responsável apenas pela apresentação dos dados. Ela faz chamadas exclusivamente para a nossa API de backend.
2.  **Backend (Python/FastAPI):** Atua como um intermediário inteligente. Ele guarda a chave secreta da API externa, busca os dados brutos, os processa e formata usando **Pandas**, e os serve de forma limpa e paginada para o frontend.
3.  **API Externa (`football-data.org`):** A fonte de dados original.

Essa abordagem protege a chave da API, reduz a carga de processamento no navegador e otimiza a quantidade de dados trafegados.

## 🚀 Funcionalidades Principais

### Backend
-   **Proxy Seguro:** Centraliza todas as chamadas para a API externa, gerenciando a autenticação com a `X-Auth-Token` de forma segura.
-   **Processamento de Dados com Pandas:** Transforma respostas JSON complexas e aninhadas em listas de dados limpas e prontas para o consumo.
-   **Paginação no Servidor:** Implementa a lógica de paginação para as listas de partidas, garantindo que o frontend carregue os dados de forma eficiente.
-   **Documentação Automática:** Graças ao FastAPI, a API é 100% autodocumentada com Swagger UI, disponível em `/docs`.

### Frontend
-   **Arquitetura Multi-Página:** Utiliza **React Router** para uma navegação fluida entre a página principal e as páginas de detalhes de cada time.
-   **Roteamento Dinâmico:** Implementa rotas com parâmetros (`/team/:teamId`) para buscar e renderizar conteúdo específico.
-   **Interface com Abas e Paginação:** Permite que o usuário explore diferentes conjuntos de dados (Classificação, Resultados, Próximos Jogos) com controles de paginação.
-   **UX Profissional:** Exibe um **Skeleton Loader** animado enquanto os dados são buscados, melhorando drasticamente a percepção de performance.
-   **Design Moderno com Tailwind CSS:** Totalmente estilizado com Tailwind CSS para uma interface customizada, responsiva e profissional.

## 🛠️ Stack Tecnológico

| Área | Tecnologia | Propósito |
| :--- | :--- | :--- |
| **Backend** | Python 3.10+ | Linguagem principal |
| | FastAPI | Framework web para a construção da API |
| | Pandas | Análise e processamento de dados |
| | Requests | Requisições HTTP para a API externa |
| | Python-dotenv | Gerenciamento de segredos (API Key) |
| **Frontend**| React 18 | Biblioteca para a construção da UI |
| | Vite | Ferramenta de build e desenvolvimento |
| | TypeScript | Tipagem estática para o JavaScript |
| | React Router | Roteamento e navegação |
| | Tailwind CSS | Estilização da interface |
| | Axios | Requisições HTTP para o backend |

## ⚙️ Como Executar o Projeto Localmente

Siga os passos abaixo para rodar a aplicação completa na sua máquina.

### Pré-requisitos
-   Python 3.10 ou superior
-   Node.js e npm
-   Git
-   Uma chave de API gratuita do [football-data.org](https://www.football-data.org/)

### 1. Backend

Primeiro, inicie o servidor da API.

```bash
# Clone o repositório
git clone [https://github.com/seu-usuario/football-stats-app.git](https://github.com/seu-usuario/football-stats-app.git)
cd football-stats-app/backend

# Crie e ative o ambiente virtual
python3 -m venv venv
source venv/bin/activate

# Instale as dependências
pip install -r requirements.txt

# Crie o arquivo .env e adicione sua chave
echo "FOOTBALL_DATA_API_KEY=sua_chave_aqui" > .env

# Inicie o servidor
python3 -m uvicorn main:app --reload
```
✅ O backend estará rodando em `http://localhost:8000`. Deixe este terminal aberto.

### 2. Frontend

Agora, em um **novo terminal**, inicie a interface do usuário.

```bash
# Navegue até a pasta do frontend
cd football-stats-app/frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```
✅ A aplicação estará disponível em `http://localhost:5173`.
