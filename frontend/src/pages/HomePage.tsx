import { useState, useEffect } from 'react';
import { CompetitionSelector } from '../components/CompetitionSelector';
import { StandingsTable } from '../components/StandingsTable';
import { SkeletonTable } from '../components/SkeletonTable';
import { MatchesList } from '../components/MatchesList';
import { getStandings, getMatches } from '../services/api';

// --- Definindo os tipos de dados (interfaces) ---
interface Standing {
  posicao: number;
  time_id: number;
  escudo: string;
  time: string;
  pontos: number;
  jogos: number;
  vitorias: number;
  empates: number;
  derrotas: number;
  saldoGols: number;
}

interface Match {
  id: number;
  dataHora: { data: string; hora: string };
  status: string;
  rodada: number;
  timeCasa: { id: number; nome: string; escudo: string };
  timeFora: { id: number; nome: string; escudo: string };
  placar: { casa: number | null; fora: number | null };
}

type View = 'standings' | 'results' | 'schedules';

export function HomePage() {
  // --- Gerenciamento de Estado ---
  const [selectedCompetition, setSelectedCompetition] = useState<string>('BSA');
  const [activeView, setActiveView] = useState<View>('standings');

  // Novos estados para controlar a página atual de cada aba
  const [resultsPage, setResultsPage] = useState(1);
  const [schedulesPage, setSchedulesPage] = useState(1);

  // Estados de dados atualizados para armazenar a lista de itens e o total de páginas
  const [standings, setStandings] = useState<Standing[]>([]);
  const [finishedMatches, setFinishedMatches] = useState({ matches: [] as Match[], totalPages: 1 });
  const [scheduledMatches, setScheduledMatches] = useState({ matches: [] as Match[], totalPages: 1 });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // --- Efeito para Buscar Dados (Refatorado para Paginação) ---
  useEffect(() => {
    setIsLoading(true);
    setError(null);

    let dataPromise;

    // A busca de dados agora depende da aba ativa e da página correspondente
    switch (activeView) {
      case 'results':
        dataPromise = getMatches(selectedCompetition, 'FINISHED', resultsPage);
        break;
      case 'schedules':
        dataPromise = getMatches(selectedCompetition, 'SCHEDULED', schedulesPage);
        break;
      case 'standings':
      default:
        // A busca da classificação não é paginada, então não precisa de alterações
        dataPromise = getStandings(selectedCompetition);
        break;
    }

    dataPromise
      .then(response => {
        // Atualiza o estado correto com base na aba ativa
        switch (activeView) {
          case 'results':
            setFinishedMatches(response.data);
            break;
          case 'schedules':
            setScheduledMatches(response.data);
            break;
          case 'standings':
            setStandings(response.data);
            break;
        }
      })
      .catch(err => {
        console.error(`Erro ao buscar dados para a aba ${activeView}:`, err);
        setError("Não foi possível carregar os dados. Verifique a API ou tente novamente.");
      })
      .finally(() => {
        setIsLoading(false);
      });
      
  // O efeito agora é acionado pela mudança de campeonato, aba ou página
  }, [selectedCompetition, activeView, resultsPage, schedulesPage]);

  const handleCompetitionSelect = (competitionId: string) => {
    setSelectedCompetition(competitionId);
    setActiveView('standings'); // Sempre volta para a aba de classificação
    // Reseta a paginação ao mudar de campeonato
    setResultsPage(1); 
    setSchedulesPage(1);
  };

  const handleViewChange = (view: View) => {
    setActiveView(view);
  };

  // --- Componente de Abas ---
  const renderTabs = () => (
    <div className="mb-6 border-b border-gray-200">
      <nav className="-mb-px flex space-x-6 justify-center" aria-label="Tabs">
        <button onClick={() => handleViewChange('standings')} className={activeView === 'standings' ? 'border-purple-800 text-purple-800 whitespace-nowrap py-3 px-1 border-b-2 font-medium' : 'border-transparent text-gray-500 hover:text-purple-700 hover:border-gray-300 whitespace-nowrap py-3 px-1 border-b-2 font-medium'}>
          Classificação
        </button>
        <button onClick={() => handleViewChange('results')} className={activeView === 'results' ? 'border-purple-800 text-purple-800 whitespace-nowrap py-3 px-1 border-b-2 font-medium' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-purple-300 whitespace-nowrap py-3 px-1 border-b-2 font-medium'}>
          Resultados
        </button>
        <button onClick={() => handleViewChange('schedules')} className={activeView === 'schedules' ? 'border-purple-800 text-purple-800 whitespace-nowrap py-3 px-1 border-b-2 font-medium' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-purple-300 whitespace-nowrap py-3 px-1 border-b-2 font-medium'}>
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
        return <MatchesList 
          matches={finishedMatches.matches} 
          title="Últimos Resultados"
          currentPage={resultsPage}
          totalPages={finishedMatches.totalPages}
          onPageChange={setResultsPage} // Passa a função para mudar a página
        />;
      case 'schedules':
        return <MatchesList 
          matches={scheduledMatches.matches} 
          title="Próximos Jogos"
          currentPage={schedulesPage}
          totalPages={scheduledMatches.totalPages}
          onPageChange={setSchedulesPage} // Passa a função para mudar a página
        />;
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