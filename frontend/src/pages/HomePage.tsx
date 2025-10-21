import { useState, useEffect } from 'react';
import { CompetitionSelector } from '../components/CompetitionSelector';
import { StandingsTable } from '../components/StandingsTable';
import { SkeletonTable } from '../components/SkeletonTable';
import { getStandings } from '../services/api';

// A interface pode ser movida para um arquivo de tipos no futuro
interface Standing {
  posicao: number;
  time_id: number; // Precisamos do ID para o link
  escudo: string;
  time: string;
  pontos: number;
  jogos: number;
  vitorias: number;
  empates: number;
  derrotas: number;
  saldoGols: number;
}

export function HomePage() {
  // Toda a lógica de estado agora vive aqui
  const [selectedCompetition, setSelectedCompetition] = useState<string>('BSA');
  const [standings, setStandings] = useState<Standing[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    getStandings(selectedCompetition)
      .then(response => {
        setStandings(response.data);
      })
      .catch(err => {
        console.error("Erro ao buscar dados:", err);
        setError("Não foi possível carregar os dados. Verifique a API ou tente novamente.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [selectedCompetition]);

  const handleCompetitionSelect = (competitionId: string) => {
    setSelectedCompetition(competitionId);
  };

  return (
    <>
      <CompetitionSelector 
        onSelect={handleCompetitionSelect} 
        selectedCompetition={selectedCompetition}
        isLoading={isLoading}
      />

      {isLoading ? (
        <SkeletonTable />
      ) : (
        <StandingsTable 
          standings={standings} 
          error={error} 
        />
      )}
    </>
  );
}