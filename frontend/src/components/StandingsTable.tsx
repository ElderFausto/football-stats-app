import { Link } from "react-router-dom";

// Define o tipo para cada linha da tabela de classificação
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

// Define o tipo das props que o componente receberá
interface StandingsTableProps {
  standings: Standing[];
  error: string | null;
}

export function StandingsTable({ standings, error }: StandingsTableProps) {
  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (standings.length === 0) {
    return (
      <p className="text-center text-gray-500">
        Selecione um campeonato para ver a classificação.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
      <table className="min-w-full bg-white text-sm">
        <thead className="bg-slate-800 text-white">
          <tr>
            <th className="py-3 px-4 text-left font-semibold">#</th>
            <th className="py-3 px-4 text-left font-semibold" colSpan={2}>
              Time
            </th>
            <th className="py-3 px-4 text-center font-semibold">P</th>
            <th className="py-3 px-4 text-center font-semibold">J</th>
            <th className="py-3 px-4 text-center font-semibold">V</th>
            <th className="py-3 px-4 text-center font-semibold">E</th>
            <th className="py-3 px-4 text-center font-semibold">D</th>
            <th className="py-3 px-4 text-center font-semibold">SG</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {standings.map((team) => (
            <tr
              key={team.posicao}
              className="odd:bg-white even:bg-slate-50 hover:bg-slate-100"
            >
              <td className="py-3 px-4 font-semibold text-center w-12">
                {team.posicao}
              </td>
              <td className="py-3 px-1 w-10">
                <img
                  src={team.escudo}
                  alt={team.time}
                  className="w-6 h-6 object-contain"
                />
              </td>
              <td className="py-3 px-2 font-medium text-slate-900">
                <Link to={`/team/${team.time_id}`} className="hover:underline">
                  {team.time}
                </Link>
              </td>
              <td className="py-3 px-4 text-center font-bold text-slate-900">
                {team.pontos}
              </td>
              <td className="py-3 px-4 text-center">{team.jogos}</td>
              <td className="py-3 px-4 text-center text-green-600">
                {team.vitorias}
              </td>
              <td className="py-3 px-4 text-center text-gray-500">
                {team.empates}
              </td>
              <td className="py-3 px-4 text-center text-red-600">
                {team.derrotas}
              </td>
              <td className="py-3 px-4 text-center font-medium">
                {team.saldoGols}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
