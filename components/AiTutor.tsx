import React, { useState, useRef, useEffect } from 'react';
import { Button } from './Button';
import { ChatMessage, SqlResult } from '../types';
import { askAiTutor } from '../services/geminiService';
import { Bot, User, Send, Sparkles } from 'lucide-react';

interface AiTutorProps {
  currentQuery: string;
  queryResult: SqlResult | null;
  lessonTitle: string;
  lessonInstructions: string;
}

export const AiTutor: React.FC<AiTutorProps> = ({ 
  currentQuery, 
  queryResult, 
  lessonTitle, 
  lessonInstructions 
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hi! I'm your AI SQL Tutor. Stuck on a query? Ask me anything!", timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const response = await askAiTutor(input, {
      currentQuery,
      error: queryResult?.error,
      lessonTitle,
      lessonInstructions
    });

    const aiMsg: ChatMessage = { role: 'model', text: response, timestamp: Date.now() };
    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 border-l border-gray-800 w-80 lg:w-96 flex-shrink-0">
      <div className="p-4 border-b border-gray-800 bg-gray-900 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-purple-400" />
        <h2 className="font-semibold text-gray-200">AI Tutor</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'model' ? 'bg-purple-900/50 text-purple-300' : 'bg-blue-900/50 text-blue-300'}`}>
              {msg.role === 'model' ? <Bot size={16} /> : <User size={16} />}
            </div>
            <div className={`p-3 rounded-lg text-sm max-w-[85%] ${msg.role === 'model' ? 'bg-gray-800 text-gray-200' : 'bg-blue-900/20 text-blue-100 border border-blue-900/50'}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
           <div className="flex gap-3">
             <div className="w-8 h-8 rounded-full bg-purple-900/50 text-purple-300 flex items-center justify-center flex-shrink-0">
               <Bot size={16} />
             </div>
             <div className="bg-gray-800 p-3 rounded-lg">
                <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-75"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></div>
                </div>
             </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-800 bg-gray-900">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about your query..."
            className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2.5 pl-4 pr-10 text-sm text-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-2 p-1 text-gray-400 hover:text-purple-400 disabled:opacity-50 disabled:hover:text-gray-400 transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
