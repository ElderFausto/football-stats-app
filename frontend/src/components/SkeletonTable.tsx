export function SkeletonTable() {
  // Cria um array com 10 itens para renderizar 10 linhas falsas
  const skeletonRows = Array.from({ length: 10 });

  return (
    <div className="overflow-x-auto rounded-lg shadow-md animate-pulse">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-4 px-4" colSpan={9}></th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {skeletonRows.map((_, index) => (
            <tr key={index} className="border-b border-gray-200">
              <td className="py-4 px-4">
                <div className="h-4 bg-gray-200 rounded"></div>
              </td>
              <td className="py-4 px-4" colSpan={2}>
                <div className="h-4 bg-gray-300 rounded"></div>
              </td>
              <td className="py-4 px-4">
                <div className="h-4 bg-gray-200 rounded"></div>
              </td>
              <td className="py-4 px-4">
                <div className="h-4 bg-gray-200 rounded"></div>
              </td>
              <td className="py-4 px-4">
                <div className="h-4 bg-gray-200 rounded"></div>
              </td>
              <td className="py-4 px-4">
                <div className="h-4 bg-gray-200 rounded"></div>
              </td>
              <td className="py-4 px-4">
                <div className="h-4 bg-gray-200 rounded"></div>
              </td>
              <td className="py-4 px-4">
                <div className="h-4 bg-gray-200 rounded"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}