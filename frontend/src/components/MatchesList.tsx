import { Link } from 'react-router-dom';

// --- Interfaces para definir os tipos de dados ---
interface Team {
  id: number;
  nome: string;
  escudo: string;
}

interface Match {
  id: number;
  dataHora: { data: string; hora: string };
  status: string;
  rodada: number;
  timeCasa: Team;
  timeFora: Team;
  placar: { casa: number | null; fora: number | null };
}

interface MatchesListProps {
  matches: Match[];
  title: string;
}

export function MatchesList({ matches, title }: MatchesListProps) {
  if (matches.length === 0) {
    return <p className="text-center text-gray-500 py-8">Nenhuma partida encontrada.</p>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200">
      <h3 className="text-xl font-bold text-gray-800 p-4 border-b">{title}</h3>
      <div className="divide-y divide-gray-200">
        {matches.map(match => (
          <div key={match.id} className="p-4 flex items-center justify-between">
            {/* Time da Casa */}
            <div className="flex-1 flex justify-end items-center space-x-3">
              <Link to={`/team/${match.timeCasa.id}`} className="font-semibold text-gray-800 hover:underline text-right">{match.timeCasa.nome}</Link>
              <img src={match.timeCasa.escudo} alt={match.timeCasa.nome} className="w-8 h-8 object-contain" />
            </div>

            {/* Placar ou Horário */}
            <div className="text-center w-32">
              {match.status === 'FINISHED' ? (
                <span className="text-2xl font-bold">{match.placar.casa} - {match.placar.fora}</span>
              ) : (
                <div className="text-sm text-gray-500">
                  <div>{match.dataHora.data}</div>
                  <div>{match.dataHora.hora}</div>
                </div>
              )}
            </div>

            {/* Time de Fora */}
            <div className="flex-1 flex items-center space-x-3">
              <img src={match.timeFora.escudo} alt={match.timeFora.nome} className="w-8 h-8 object-contain" />
              <Link to={`/team/${match.timeFora.id}`} className="font-semibold text-gray-800 hover:underline">{match.timeFora.nome}</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}