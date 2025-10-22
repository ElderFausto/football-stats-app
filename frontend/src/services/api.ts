import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

/**
 * Busca a tabela de classificação de um campeonato.
 */
export const getStandings = (competitionCode: string) => {
  return apiClient.get(`/standings/${competitionCode}`);
};

/**
 * Busca os detalhes de um time específico.
 */
export const getTeamDetails = (teamId: string) => {
  return apiClient.get(`/teams/${teamId}`);
};

/**
 * Busca as partidas de um campeonato (com paginação).
 */
export const getMatches = (competitionCode: string, status: 'SCHEDULED' | 'FINISHED', page: number) => {
  return apiClient.get(`/matches/${competitionCode}`, {
    params: {
      status,
      page,
      limit: 20
    }
  });
};

/**
 * Busca todas as partidas de um time específico.
 */
export const getTeamMatches = (teamId: string) => {
  return apiClient.get(`/teams/${teamId}/matches`);
};