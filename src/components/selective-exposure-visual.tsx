'use client';

import React from 'react';
import { Eye, EyeOff, Lock, CheckCircle, ShieldCheck, FileJson } from 'lucide-react';

// Sample endpoints with exposure status
const endpoints = [
  { id: 'get_users', path: '/users', method: 'GET', exposed: true, description: 'Retrieve user list' },
  { id: 'get_user_details', path: '/users/{id}', method: 'GET', exposed: true, description: 'Get specific user' },
  { id: 'create_user', path: '/users', method: 'POST', exposed: true, description: 'Create a new user' },
  { id: 'update_user_settings', path: '/users/{id}/settings', method: 'PUT', exposed: true, description: 'Update user settings' },
  { id: 'admin_delete_user', path: '/admin/users/{id}', method: 'DELETE', exposed: false, description: 'Admin: Delete user' }, // Sensitive
  { id: 'get_internal_logs', path: '/_internal/logs', method: 'GET', exposed: false, description: 'Internal system logs' }, // Internal
];

export default function SelectiveExposureVisual() {
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
          Skolp - Configure Tool Exposure
        </span>
      </div>

      {/* Content Area - Split View */}
      <div className="flex h-[240px]">
        {/* Left: Endpoint Selection */}
        <div className="w-1/2 p-3 border-r border-gray-200 dark:border-gray-600 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
          <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">API Endpoints:</p>
          <div className="space-y-2">
            {endpoints.map((ep) => (
              <div key={ep.id} className="flex items-center space-x-2 text-sm">
                {ep.exposed ? (
                  <Eye className="w-4 h-4 text-green-500 flex-shrink-0" />
                ) : (
                  <EyeOff className="w-4 h-4 text-red-500 flex-shrink-0" />
                )}
                <span className={`font-mono text-xs truncate ${ep.exposed ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500 italic'}`}>
                  {ep.path}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Generated MCP Config Snippet */}
        <div className="w-1/2 p-3 bg-gray-50 dark:bg-gray-900/50 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
          <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
            <FileJson className="w-3 h-3 mr-1"/> Generated MCP Tools:
          </p>
          <pre className="text-xs text-gray-600 dark:text-gray-400 font-mono whitespace-pre-wrap break-words">
            <code>
              {
'{\n  "mcp_version": "1.0",\n  "tools": [\n' + 
  endpoints
    .filter(ep => ep.exposed)
    .map(ep => 
      `    {\n      "function_name": "${ep.id}",\n      "description": "${ep.description}",\n      "parameters": {...}\n    }`
    )
    .join(',\n') + 
'\n  ]\n}'
              }
            </code>
          </pre>
           <div className="mt-4 p-2 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-md text-xs text-green-700 dark:text-green-300 flex items-start space-x-2">
             <ShieldCheck className="w-4 h-4 mt-0.5 flex-shrink-0"/>
             <span>Sensitive endpoints like <code className="text-xs">{endpoints.find(ep => !ep.exposed)?.path}</code> remain private and are NOT exposed as tools.</span>
           </div>
        </div>
      </div>
    </div>
  );
} 