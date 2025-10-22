import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTeamDetails, getTeamMatches } from '../services/api';
import { MatchesList } from '../components/MatchesList';

// --- Interfaces para os tipos de dados ---
interface Coach { nome: string; nacionalidade: string; }
interface Player { id: number; nome: string; posicao: string; nacionalidade: string; }
interface Team { id: number; nome: string; escudo: string; }
interface Match { id: number; dataHora: { data: string; hora: string }; status: string; rodada: number; timeCasa: Team; timeFora: Team; placar: { casa: number | null; fora: number | null }; }
interface TeamDetails { id: number; nome: string; escudo: string; fundacao: number; estadio: string; tecnico: Coach; elenco: Player[]; }
type TeamView = 'squad' | 'results' | 'schedules';

// --- Componente interno para a Tabela de Elenco ---
function SquadTable({ squad }: { squad: Player[] }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Elenco Principal</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="py-2 px-3 text-left font-semibold">Nome</th>
              <th className="py-2 px-3 text-left font-semibold">Posição</th>
              <th className="py-2 px-3 text-left font-semibold">Nacionalidade</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {squad.map(player => (
              <tr key={player.id} className="odd:bg-white even:bg-slate-50 border-t">
                <td className="py-2 px-3 font-medium">{player.nome}</td>
                <td className="py-2 px-3">{player.posicao || 'N/A'}</td>
                <td className="py-2 px-3">{player.nacionalidade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// --- Componente Principal da Página ---
export function TeamPage() {
  const { teamId } = useParams<{ teamId: string }>();
  const [activeView, setActiveView] = useState<TeamView>('squad');
  const [team, setTeam] = useState<TeamDetails | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!teamId) return;
    setIsLoading(true);
    setError(null);

    Promise.all([ getTeamDetails(teamId), getTeamMatches(teamId) ])
      .then(([teamDetailsResponse, matchesResponse]) => {
        setTeam(teamDetailsResponse.data);
        setMatches(matchesResponse.data);
      })
      .catch(err => {
        console.error("Erro ao buscar dados do time:", err);
        setError("Não foi possível carregar os dados do time.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [teamId]);

  const finishedMatches = useMemo(() => matches.filter(m => m.status === 'FINISHED').reverse(), [matches]);
  const scheduledMatches = useMemo(() => matches.filter(m => m.status === 'SCHEDULED'), [matches]);

  if (isLoading) {
    return <p className="text-center text-gray-500 py-8">Carregando detalhes do time...</p>;
  }
  if (error || !team) {
    return <p className="text-center text-red-500 font-medium py-8">{error || "Time não encontrado."}</p>;
  }

  return (
    <div className="space-y-8">
      {/* Cabeçalho do Time */}
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <img src={team.escudo} alt={`Escudo do ${team.nome}`} className="w-24 h-24 object-contain" />
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center md:text-left">{team.nome}</h2>
          <p className="text-gray-500 text-center md:text-left">Fundado em {team.fundacao} | Estádio: {team.estadio}</p>
          <p className="text-gray-600 font-semibold text-center md:text-left">Técnico: {team.tecnico.nome} ({team.tecnico.nacionalidade})</p>
        </div>
      </div>
      {/* Abas de Navegação */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex justify-center space-x-6" aria-label="Tabs">
          <button onClick={() => setActiveView('squad')} className={activeView === 'squad' ? 'border-purple-800 text-purple-800 whitespace-nowrap py-3 px-1 border-b-2 font-medium' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-3 px-1 border-b-2 font-medium'}>
            Elenco
          </button>
          <button onClick={() => setActiveView('results')} className={activeView === 'results' ? 'border-purple-800 text-purple-800 whitespace-nowrap py-3 px-1 border-b-2 font-medium' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-3 px-1 border-b-2 font-medium'}>
            Resultados
          </button>
          <button onClick={() => setActiveView('schedules')} className={activeView === 'schedules' ? 'border-purple-800 text-purple-800 whitespace-nowrap py-3 px-1 border-b-2 font-medium' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-3 px-1 border-b-2 font-medium'}>
            Próximos Jogos
          </button>
        </nav>
      </div>
      {/* Renderização Condicional do Conteúdo da Aba */}
      <div>
        {activeView === 'squad' && <SquadTable squad={team.elenco} />}
        {activeView === 'results' && <MatchesList matches={finishedMatches} title="Últimos Resultados" />}
        {activeView === 'schedules' && <MatchesList matches={scheduledMatches} title="Próximos Jogos" />}
      </div>
      <div className="text-center mt-6">
        <Link to="/" className="bg-purple-800 text-white font-semibold px-6 py-2 rounded-md hover:bg-purple-900 transition-colors">
          &larr; Voltar para a Classificação
        </Link>
      </div>
    </div>
  );
}