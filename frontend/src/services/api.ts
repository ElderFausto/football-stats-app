import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

/**
 * @param competitionCode
 * @returns
 */
export const getStandings = (competitionCode: string) => {
  return apiClient.get(`/standings/${competitionCode}`);
};

export const getTeamDetails = (teamId: string) => {
  return apiClient.get(`/teams/${teamId}`);
};

export const getMatches = (competitionCode: string, status: 'SCHEDULED' | 'FINISHED', page: number) => {
  return apiClient.get(`/matches/${competitionCode}`, {
    params: {
      status,
      page,
      limit: 20 // O limite está fixo em 20, como definimos no backend
    }
  });
};