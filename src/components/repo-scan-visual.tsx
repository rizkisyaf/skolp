'use client';

import React from 'react';
import { Folder, FileText, Github, Search } from 'lucide-react';

// Define the type for a tree node explicitly
interface FileTreeNode {
  name: string;
  type: 'folder' | 'file';
  children?: FileTreeNode[];
}

// Simple representation of a file tree structure with explicit type
const fileTree: FileTreeNode[] = [
  {
    name: 'src',
    type: 'folder',
    children: [
      { name: 'api', type: 'folder', children: [{ name: 'routes.py', type: 'file' }] },
      { name: 'models', type: 'folder', children: [{ name: 'user.py', type: 'file' }] },
      { name: 'main.py', type: 'file' },
    ],
  },
  { name: '.gitignore', type: 'file' },
  { name: 'requirements.txt', type: 'file' },
  { name: 'README.md', type: 'file' },
];

interface TreeNodeProps {
  node: FileTreeNode; // Use the defined type here
  level?: number;
}

// Recursive component to render the file tree
const TreeNode: React.FC<TreeNodeProps> = ({ node, level = 0 }) => {
  const indent = level * 16; // 16px indent per level

  return (
    <div style={{ paddingLeft: `${indent}px` }}>
      <div className="flex items-center space-x-2 py-1 text-sm">
        {node.type === 'folder' ? (
          <Folder className="w-4 h-4 text-sky-500 flex-shrink-0" />
        ) : (
          <FileText className="w-4 h-4 text-gray-500 flex-shrink-0" />
        )}
        <span className="truncate">{node.name}</span>
      </div>
      {node.type === 'folder' && node.children && (
        <div>
          {node.children.map((child, index) => (
            <TreeNode key={index} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export default function RepoScanVisual() {
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
          Skolp - Scan Repository
        </span>
      </div>

      {/* Content Area */}
      <div className="p-4 space-y-3">
        {/* Scan Bar */}
        <div className="flex items-center space-x-2 p-2 border rounded-md bg-gray-50 dark:bg-gray-700">
          <Github className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          <input
            type="text"
            readOnly
            value="https://github.com/user/my-saas-api"
            className="flex-1 bg-transparent text-sm focus:outline-none text-gray-700 dark:text-gray-300 truncate"
          />
          <button className="text-xs bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">
            Scan
          </button>
        </div>

        {/* Resulting File Tree */}
        <div className="h-40 overflow-y-auto p-2 border rounded-md bg-gray-50 dark:bg-gray-900/50 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Identified files:</p>
          {fileTree.map((node, index) => (
            <TreeNode key={index} node={node} />
          ))}
        </div>
      </div>
    </div>
  );
} 