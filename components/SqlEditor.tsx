import React from 'react';

interface SqlEditorProps {
  value: string;
  onChange: (value: string) => void;
  onRun: () => void;
}

export const SqlEditor: React.FC<SqlEditorProps> = ({ value, onChange, onRun }) => {
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      onRun();
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] border border-gray-700 rounded-lg overflow-hidden shadow-xl">
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">SQL Editor</span>
            <span className="text-xs text-gray-500">Ctrl + Enter to Run</span>
        </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 w-full p-4 bg-[#1e1e1e] text-blue-100 font-mono text-sm resize-none focus:outline-none focus:ring-0 leading-relaxed"
        spellCheck={false}
        placeholder="SELECT * FROM..."
      />
    </div>
  );
};
