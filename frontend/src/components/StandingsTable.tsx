// Define o tipo para cada linha da tabela de classificação
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

// Define o tipo das props que o componente receberá
interface StandingsTableProps {
  standings: Standing[];
  isLoading: boolean;
  error: string | null;
}

export function StandingsTable({ standings, isLoading, error }: StandingsTableProps) {
  if (isLoading) {
    return <p className="text-center text-gray-500">Carregando dados...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (standings.length === 0) {
    return <p className="text-center text-gray-500">Selecione um campeonato para ver a classificação.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-3 px-4 text-left">#</th>
            <th className="py-3 px-4 text-left" colSpan={2}>Time</th>
            <th className="py-3 px-4 text-center">P</th>
            <th className="py-3 px-4 text-center">J</th>
            <th className="py-3 px-4 text-center">V</th>
            <th className="py-3 px-4 text-center">E</th>
            <th className="py-3 px-4 text-center">D</th>
            <th className="py-3 px-4 text-center">SG</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {standings.map((team) => (
            <tr key={team.posicao} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-4 font-semibold">{team.posicao}</td>
              <td className="py-3 px-1 w-10">
                <img src={team.escudo} alt={team.time} className="w-6 h-6" />
              </td>
              <td className="py-3 px-2 font-medium">{team.time}</td>
              <td className="py-3 px-4 text-center font-bold">{team.pontos}</td>
              <td className="py-3 px-4 text-center">{team.jogos}</td>
              <td className="py-3 px-4 text-center">{team.vitorias}</td>
              <td className="py-3 px-4 text-center">{team.empates}</td>
              <td className="py-3 px-4 text-center">{team.derrotas}</td>
              <td className="py-3 px-4 text-center">{team.saldoGols}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}