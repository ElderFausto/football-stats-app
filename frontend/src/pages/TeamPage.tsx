import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTeamDetails } from '../services/api'; // Precisaremos adicionar esta função ao nosso serviço

// --- Interfaces para definir os tipos de dados que esperamos ---
interface Coach {
  nome: string;
  nacionalidade: string;
}

interface Player {
  id: number;
  nome: string;
  posicao: string;
  nacionalidade: string;
}

interface TeamDetails {
  id: number;
  nome: string;
  escudo: string;
  fundacao: number;
  estadio: string;
  tecnico: Coach;
  elenco: Player[];
}

export function TeamPage() {
  // O hook useParams() lê os parâmetros da URL.
  // Como nossa rota será "/team/:teamId", ele nos dará o valor de "teamId".
  const { teamId } = useParams<{ teamId: string }>();

  const [team, setTeam] = useState<TeamDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!teamId) return; // Garante que temos um ID antes de buscar

    setIsLoading(true);
    setError(null);

    getTeamDetails(teamId)
      .then(response => {
        setTeam(response.data);
      })
      .catch(err => {
        console.error("Erro ao buscar detalhes do time:", err);
        setError("Não foi possível carregar os detalhes do time.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [teamId]); // Re-executa o efeito se o teamId na URL mudar

  if (isLoading) {
    return <p className="text-center text-gray-500 py-8">Carregando detalhes do time...</p>;
  }

  if (error || !team) {
    return <p className="text-center text-red-500 font-medium py-8">{error}</p>;
  }

  return (
    <div className="space-y-8">
      {/* Cabeçalho do Time */}
      <div className="flex items-center space-x-6 bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <img src={team.escudo} alt={`Escudo do ${team.nome}`} className="w-24 h-24 object-contain" />
        <div>
          <h2 className="text-4xl font-bold text-gray-800">{team.nome}</h2>
          <p className="text-gray-500">Fundado em {team.fundacao} | Estádio: {team.estadio}</p>
          <p className="text-gray-600 font-semibold">Técnico: {team.tecnico.nome} ({team.tecnico.nacionalidade})</p>
        </div>
      </div>

      {/* Tabela do Elenco */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Elenco</h3>
        <table className="min-w-full text-sm">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="py-2 px-3 text-left font-semibold">Nome</th>
              <th className="py-2 px-3 text-left font-semibold">Posição</th>
              <th className="py-2 px-3 text-left font-semibold">Nacionalidade</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {team.elenco.map(player => (
              <tr key={player.id} className="odd:bg-white even:bg-slate-50 border-t">
                <td className="py-2 px-3 font-medium">{player.nome}</td>
                <td className="py-2 px-3">{player.posicao}</td>
                <td className="py-2 px-3">{player.nacionalidade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-center mt-6">
        <Link to="/" className="bg-purple-800 text-white font-semibold px-6 py-2 rounded-md hover:bg-gray-400 transition-colors">
          &larr; Voltar para a Classificação
        </Link>
      </div>
    </div>
  );
}