import React, { useState, useEffect } from 'react';
import { LESSONS } from './constants';
import { executeQuery, initDatabase } from './services/dbService';
import { SqlResult } from './types';
import { SqlEditor } from './components/SqlEditor';
import { ResultTable } from './components/ResultTable';
import { Button } from './components/Button';
import { AiTutor } from './components/AiTutor';
import { Database, ChevronRight, ChevronLeft, CheckCircle2, Play, RefreshCw, LayoutTemplate } from 'lucide-react';

const App: React.FC = () => {
  const [dbReady, setDbReady] = useState(false);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [query, setQuery] = useState(LESSONS[0].initialQuery);
  const [result, setResult] = useState<SqlResult | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const currentLesson = LESSONS[currentLessonIndex];

  useEffect(() => {
    initDatabase().then((success) => {
      setDbReady(success);
    });
  }, []);

  useEffect(() => {
    setQuery(currentLesson.initialQuery);
    setResult(null);
  }, [currentLessonIndex]);

  const handleRunQuery = () => {
    const res = executeQuery(query);
    setResult(res);
  };

  const handleNextLesson = () => {
    if (currentLessonIndex < LESSONS.length - 1) {
      setCurrentLessonIndex(prev => prev + 1);
    }
  };

  const handlePrevLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(prev => prev - 1);
    }
  };

  const handleReset = () => {
      setQuery(currentLesson.initialQuery);
      setResult(null);
  }

  if (!dbReady) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-900 text-white">
        <div className="animate-spin mb-4">
          <RefreshCw size={32} className="text-blue-500" />
        </div>
        <p className="text-lg font-medium animate-pulse">Initializing Database...</p>
        <p className="text-sm text-gray-500 mt-2">Loading SQLite WASM engine</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-950 text-gray-100 font-sans">
      
      {/* Sidebar - Lesson Navigation */}
      <div className={`${isSidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 bg-gray-900 border-r border-gray-800 flex flex-col flex-shrink-0 overflow-hidden`}>
        <div className="p-6 border-b border-gray-800">
           <div className="flex items-center gap-2 mb-6 text-blue-400">
               <Database className="w-6 h-6" />
               <span className="font-bold text-lg tracking-tight text-gray-100">SQL Masterclass</span>
           </div>
           <div className="flex items-center justify-between text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
               <span>Course Progress</span>
               <span>{currentLessonIndex + 1} / {LESSONS.length}</span>
           </div>
           <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
               <div 
                  className="h-full bg-blue-600 transition-all duration-500 ease-out"
                  style={{ width: `${((currentLessonIndex + 1) / LESSONS.length) * 100}%` }}
               />
           </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {LESSONS.map((lesson, idx) => (
                <button
                    key={lesson.id}
                    onClick={() => setCurrentLessonIndex(idx)}
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all border ${
                        idx === currentLessonIndex 
                        ? 'bg-blue-900/20 border-blue-800 text-blue-100 ring-1 ring-blue-500/20' 
                        : 'bg-transparent border-transparent text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                    }`}
                >
                    <div className="flex items-center gap-3">
                        <div className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold border ${
                            idx === currentLessonIndex 
                            ? 'bg-blue-600 border-blue-600 text-white' 
                            : 'border-gray-600 text-gray-500'
                        }`}>
                            {idx + 1}
                        </div>
                        <span className="truncate">{lesson.title}</span>
                        {idx < currentLessonIndex && <CheckCircle2 size={14} className="ml-auto text-green-500" />}
                    </div>
                </button>
            ))}
        </div>
        
        <div className="p-4 border-t border-gray-800 bg-gray-900">
            <div className="text-xs text-gray-600 text-center">
                Powered by SQL.js & Gemini
            </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-14 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-4 flex-shrink-0">
            <div className="flex items-center gap-4">
                <button 
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
                >
                    <LayoutTemplate size={18} />
                </button>
                <h1 className="font-medium text-gray-200 truncate">{currentLesson.title}</h1>
            </div>
            
            <div className="flex items-center gap-2">
                 <Button variant="secondary" size="sm" onClick={handleReset} title="Reset Query">
                    <RefreshCw size={14} />
                 </Button>
                 <div className="h-4 w-px bg-gray-700 mx-1"></div>
                 <Button 
                    variant="ghost" 
                    size="sm" 
                    disabled={currentLessonIndex === 0}
                    onClick={handlePrevLesson}
                 >
                    <ChevronLeft size={16} className="mr-1" /> Prev
                 </Button>
                 <Button 
                    variant="ghost" 
                    size="sm" 
                    disabled={currentLessonIndex === LESSONS.length - 1}
                    onClick={handleNextLesson}
                 >
                    Next <ChevronRight size={16} className="ml-1" />
                 </Button>
            </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 overflow-hidden flex flex-col lg:flex-row">
            
            {/* Left/Top: Instructions & Query */}
            <div className="flex-1 flex flex-col min-w-0 border-r border-gray-800">
                {/* Instructions */}
                <div className="p-6 bg-gray-900/50 border-b border-gray-800">
                    <h2 className="text-lg font-semibold text-white mb-2">Instructions</h2>
                    <p className="text-gray-300 leading-relaxed text-sm mb-4">{currentLesson.description}</p>
                    <div className="bg-blue-900/10 border border-blue-900/30 rounded-lg p-4 mb-4">
                        <h3 className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">Task</h3>
                        <p className="text-blue-100 text-sm">{currentLesson.instructions}</p>
                    </div>
                    {currentLesson.hint && (
                        <details className="text-xs text-gray-500 cursor-pointer group">
                            <summary className="hover:text-gray-300 transition-colors list-none flex items-center gap-1">
                                <span className="border-b border-dashed border-gray-600">Need a hint?</span>
                            </summary>
                            <p className="mt-2 text-gray-400 pl-2 border-l-2 border-gray-700">{currentLesson.hint}</p>
                        </details>
                    )}
                </div>

                {/* Editor Area */}
                <div className="flex-1 flex flex-col p-4 bg-[#141414]">
                    <SqlEditor 
                        value={query} 
                        onChange={setQuery} 
                        onRun={handleRunQuery}
                    />
                    <div className="mt-3 flex justify-end">
                        <Button onClick={handleRunQuery} className="shadow-lg shadow-blue-900/20">
                            <Play size={16} className="mr-2 fill-current" /> Run Query
                        </Button>
                    </div>
                </div>
            </div>

            {/* Right/Bottom: Results & AI */}
            <div className="flex-1 flex flex-col min-w-0 bg-[#0f0f0f]">
                 {/* Results */}
                 <div className="flex-1 p-4 overflow-hidden flex flex-col">
                    <ResultTable result={result} />
                 </div>
            </div>

            {/* AI Assistant Panel (Collapsible logic could be added, but fixed right for now) */}
            <AiTutor 
                currentQuery={query}
                queryResult={result}
                lessonTitle={currentLesson.title}
                lessonInstructions={currentLesson.instructions}
            />

        </main>
      </div>
    </div>
  );
};

export default App;
