// Define os campeonatos que queremos exibir
const competitions = [
  { id: 'BSA', name: 'Brasileirão' },
  { id: 'BL1', name: 'Bundesliga' },
  { id: 'CL', name: 'Champions League' },
  { id: 'PD', name: 'La Liga' },
  { id: 'FL1', name: 'Ligue 1' },
  { id: 'PL', name: 'Premier League' },
  { id: 'SA', name: 'Serie A' },
];

interface CompetitionSelectorProps {
  onSelect: (competitionId: string) => void;
  selectedCompetition: string;
  isLoading: boolean;
}

export function CompetitionSelector({ onSelect, selectedCompetition, isLoading }: CompetitionSelectorProps) {
  return (
    <div className="flex justify-center space-x-2 mb-6">
      {competitions.map((comp) => (
        <button
          key={comp.id}
          onClick={() => onSelect(comp.id)}
          disabled={isLoading}
          className={`px-4 py-2 rounded-md font-semibold transition-colors duration-200 
            ${selectedCompetition === comp.id
              ? 'bg-purple-800 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }
            ${isLoading ? 'cursor-not-allowed opacity-50' : ''}
          `}
        >
          {comp.name}
        </button>
      ))}
    </div>
  );
}