import React from 'react';
import { SqlResult } from '../types';

interface ResultTableProps {
  result: SqlResult | null;
}

export const ResultTable: React.FC<ResultTableProps> = ({ result }) => {
  if (!result) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500 text-sm bg-gray-900 border border-gray-800 rounded-lg">
        Run a query to see results
      </div>
    );
  }

  if (result.error) {
    return (
      <div className="h-full p-4 bg-red-900/20 border border-red-900/50 rounded-lg text-red-200 font-mono text-sm overflow-auto">
        <h4 className="font-bold text-red-400 mb-2">Error</h4>
        {result.error}
      </div>
    );
  }

  if (result.columns.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-green-400 text-sm bg-gray-900 border border-gray-800 rounded-lg">
        Query executed successfully (No rows returned)
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gray-900 border border-gray-700 rounded-lg overflow-hidden shadow-xl">
        <div className="px-4 py-2 bg-gray-800 border-b border-gray-700">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Query Results</span>
            <span className="ml-2 text-xs text-gray-500">{result.values.length} rows</span>
        </div>
      <div className="flex-1 overflow-auto">
        <table className="min-w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-gray-800 sticky top-0 z-10">
            <tr>
              {result.columns.map((col, idx) => (
                <th key={idx} className="px-4 py-3 font-medium text-gray-300 border-b border-gray-700">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {result.values.map((row, rowIdx) => (
              <tr key={rowIdx} className="hover:bg-gray-800/50 transition-colors">
                {row.map((cell, cellIdx) => (
                  <td key={cellIdx} className="px-4 py-2 text-gray-400 border-r border-gray-800 last:border-r-0">
                    {cell === null ? <span className="text-gray-600 italic">NULL</span> : String(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
