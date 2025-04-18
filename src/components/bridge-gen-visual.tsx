'use client';

import React, { useState } from 'react';
import { CheckSquare, Square, FileCode, Settings2, Rocket } from 'lucide-react';

// Sample endpoints
const endpoints = [
  { id: 'get_users', path: '/users', method: 'GET', selected: true },
  { id: 'create_user', path: '/users', method: 'POST', selected: true },
  { id: 'get_items', path: '/items', method: 'GET', selected: false },
  { id: 'create_item', path: '/items', method: 'POST', selected: true },
];

export default function BridgeGenVisual() {
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
    }, 1500); // Simulate generation time
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
      {/* macOS Title Bar */}
      <div className="h-7 bg-gray-100 dark:bg-gray-700 flex items-center px-3 border-b border-gray-200 dark:border-gray-600">
        <div className="flex space-x-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="flex-1 text-center text-xs font-medium text-gray-600 dark:text-gray-400">
          Skolp - Generate Bridge
        </span>
      </div>

      {/* Content Area */}
      <div className="p-4 space-y-4 min-h-[240px]">
        {!generated ? (
          <>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Select endpoints to include:</p>
            <div className="space-y-2 h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent pr-2">
              {endpoints.map((ep) => (
                <div key={ep.id} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  {ep.selected ? <CheckSquare className="w-4 h-4 text-blue-500" /> : <Square className="w-4 h-4 text-gray-400" />}
                  <span className={`px-1.5 py-0.5 rounded text-xs font-mono ${ep.method === 'GET' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                    {ep.method}
                  </span>
                  <span className="truncate">{ep.path}</span>
                </div>
              ))}
            </div>
            <button
              onClick={handleGenerate}
              disabled={generating}
              className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${generating
                  ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'}
              `}
            >
              {generating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Generating...</span>
                </>
              ) : (
                <span>Generate Bridge Package</span>
              )}
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center py-8">
            <Rocket className="w-12 h-12 text-green-500 mb-4" />
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Bridge Generated!</p>
            <div className="flex space-x-4 text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-1.5">
                <FileCode className="w-5 h-5" />
                <span className="text-sm">bridge.py</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Settings2 className="w-5 h-5" />
                <span className="text-sm">mcp_config.json</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 