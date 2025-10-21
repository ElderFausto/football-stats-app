import { Link } from 'react-router-dom';
import { Pagination } from './Pagination';

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
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export function MatchesList({ matches, title, currentPage, totalPages, onPageChange }: MatchesListProps) {
  if (matches.length === 0) {
    return <p className="text-center text-gray-500 py-8">Nenhuma partida encontrada para esta página.</p>;
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 p-4 border-b">{title}</h3>
        <div className="divide-y divide-gray-200">
          {/* O CÓDIGO QUE FALTAVA ESTÁ AQUI */}
          {matches.map(match => (
            <div key={match.id} className="p-4 grid grid-cols-3 items-center gap-4">
              {/* Time da Casa */}
              <div className="flex justify-end items-center space-x-3">
                <Link to={`/team/${match.timeCasa.id}`} className="font-semibold text-gray-800 hover:underline text-right">{match.timeCasa.nome}</Link>
                <img src={match.timeCasa.escudo} alt={match.timeCasa.nome} className="w-8 h-8 object-contain" />
              </div>

              {/* Placar ou Horário */}
              <div className="text-center">
                {match.status === 'FINISHED' ? (
                  <span className="text-2xl font-bold text-gray-800">{match.placar.casa} - {match.placar.fora}</span>
                ) : (
                  <div className="text-sm text-gray-500">
                    <div>{match.dataHora.data}</div>
                    <div>{match.dataHora.hora}</div>
                  </div>
                )}
              </div>

              {/* Time de Fora */}
              <div className="flex items-center space-x-3">
                <img src={match.timeFora.escudo} alt={match.timeFora.nome} className="w-8 h-8 object-contain" />
                <Link to={`/team/${match.timeFora.id}`} className="font-semibold text-gray-800 hover:underline">{match.timeFora.nome}</Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </>
  );
}