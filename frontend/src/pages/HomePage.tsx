import { useState, useEffect } from 'react';
import { CompetitionSelector } from '../components/CompetitionSelector';
import { StandingsTable } from '../components/StandingsTable';
import { SkeletonTable } from '../components/SkeletonTable';
import { MatchesList } from '../components/MatchesList';
import { getStandings, getMatches } from '../services/api';

// --- Definindo os tipos de dados (interfaces) ---
interface Standing {}
interface Match {}
type View = 'standings' | 'results' | 'schedules';

export function HomePage() {
  // --- Gerenciamento de Estado ---
  const [selectedCompetition, setSelectedCompetition] = useState<string>('BSA');
  const [activeView, setActiveView] = useState<View>('standings'); // Novo estado para controlar a aba ativa

  // Estados para armazenar os dados de cada aba
  const [standings, setStandings] = useState<Standing[]>([]);
  const [finishedMatches, setFinishedMatches] = useState<Match[]>([]);
  const [scheduledMatches, setScheduledMatches] = useState<Match[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // --- Efeito para Buscar Dados ---
  // Este hook agora busca todos os dados do campeonato selecionado de uma vez
  useEffect(() => {
    setIsLoading(true);
    setError(null);

    // Cria um array de "promessas" para buscar todos os dados em paralelo
    const dataPromises = [
      getStandings(selectedCompetition),
      getMatches(selectedCompetition, 'FINISHED'),
      getMatches(selectedCompetition, 'SCHEDULED')
    ];

    // Promise.all espera que todas as requisições terminem
    Promise.all(dataPromises)
      .then(([standingsResponse, finishedResponse, scheduledResponse]) => {
        setStandings(standingsResponse.data);
        setFinishedMatches(finishedResponse.data);
        setScheduledMatches(scheduledResponse.data);
      })
      .catch(err => {
        console.error("Erro ao buscar dados do campeonato:", err);
        setError("Não foi possível carregar os dados. Verifique a API ou tente novamente.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [selectedCompetition]);

  const handleCompetitionSelect = (competitionId: string) => {
    setSelectedCompetition(competitionId);
    setActiveView('standings'); // Sempre volta para a aba de classificação ao mudar de campeonato
  };

  // --- Componente de Abas ---
  const renderTabs = () => (
    <div className="mb-6 border-b border-gray-200">
      <nav className="-mb-px flex space-x-6 justify-center" aria-label="Tabs">
        <button onClick={() => setActiveView('standings')} className={activeView === 'standings' ? 'border-purple-800 text-purple-800 whitespace-nowrap py-3 px-1 border-b-2 font-medium' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-3 px-1 border-b-2 font-medium'}>
          Classificação
        </button>
        <button onClick={() => setActiveView('results')} className={activeView === 'results' ? 'border-purple-800 text-purple-800 whitespace-nowrap py-3 px-1 border-b-2 font-medium' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-3 px-1 border-b-2 font-medium'}>
          Resultados
        </button>
        <button onClick={() => setActiveView('schedules')} className={activeView === 'schedules' ? 'border-purple-800 text-purple-800 whitespace-nowrap py-3 px-1 border-b-2 font-medium' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-3 px-1 border-b-2 font-medium'}>
          Próximos Jogos
        </button>
      </nav>
    </div>
  );

  // --- Renderização do Conteúdo da Aba Ativa ---
  const renderActiveView = () => {
    if (isLoading) return <SkeletonTable />;
    if (error) return <p className="text-center text-red-500 font-medium py-8">{error}</p>;

    switch (activeView) {
      case 'standings':
        return <StandingsTable standings={standings} error={null} />;
      case 'results':
        return <MatchesList matches={finishedMatches} title="Últimos Resultados" />;
      case 'schedules':
        return <MatchesList matches={scheduledMatches} title="Próximos Jogos" />;
      default:
        return <StandingsTable standings={standings} error={null} />;
    }
  };

  return (
    <>
      <CompetitionSelector 
        onSelect={handleCompetitionSelect} 
        selectedCompetition={selectedCompetition}
        isLoading={isLoading}
      />
      {renderTabs()}
      {renderActiveView()}
    </>
  );
}