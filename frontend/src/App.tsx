import { useState, useEffect } from 'react';
import { CompetitionSelector } from './components/CompetitionSelector';
import { StandingsTable } from './components/StandingsTable';
import { getStandings } from './services/api';

// Define o tipo para cada linha da tabela (pode ser movido para um arquivo de tipos no futuro)
interface Standing {
  posicao: number;
  escudo: string;
  time: string;
  pontos: number;
  jogos: number;
  vitorias: number;
  empates: number;
  derrotas: number;
  saldoGols: number;
}

function App() {
  // --- GERENCIAMENTO DE ESTADO ---
  const [selectedCompetition, setSelectedCompetition] = useState<string>('BSA'); // Começa com o Brasileirão selecionado
  const [standings, setStandings] = useState<Standing[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // --- EFEITO PARA BUSCAR DADOS ---
  // Este hook será executado sempre que a variável 'selectedCompetition' mudar
  useEffect(() => {
    // Define que estamos carregando e limpa erros antigos
    setIsLoading(true);
    setError(null);

    // Chama a função da nossa API
    getStandings(selectedCompetition)
      .then(response => {
        // Quando a resposta chegar, atualiza o estado com os dados
        setStandings(response.data);
      })
      .catch(err => {
        // Se der erro, atualiza o estado de erro
        console.error("Erro ao buscar dados:", err);
        setError("Não foi possível carregar os dados. Verifique a API ou tente novamente.");
      })
      .finally(() => {
        // Independentemente de sucesso ou erro, define que o carregamento terminou
        setIsLoading(false);
      });
  }, [selectedCompetition]); // O array de dependências: re-executa o efeito quando este valor mudar

  // --- FUNÇÃO PARA LIDAR COM A SELEÇÃO ---
  const handleCompetitionSelect = (competitionId: string) => {
    setSelectedCompetition(competitionId);
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <header className="bg-white shadow">
        <div className="container mx-auto p-4 flex items-center space-x-3">
          <img src="/football-icon.svg" alt="Ícone de Futebol" className="w-8 h-8"/>
          <h1 className="text-2xl font-bold text-gray-800">
            Painel de Futebol
          </h1>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <CompetitionSelector 
          onSelect={handleCompetitionSelect} 
          selectedCompetition={selectedCompetition}
          isLoading={isLoading}
        />
        <StandingsTable 
          standings={standings} 
          isLoading={isLoading} 
          error={error} 
        />
      </main>
    </div>
  );
}

export default App;