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