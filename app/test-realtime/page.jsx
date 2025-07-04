"use client";

import React, { useState, useEffect } from 'react';
import { useRealtime } from '@/hooks/useRealtime';

export default function TestRealtimePage() {
  const [boardId] = useState('feb6d22e-b2d6-4105-b3ad-663c7148c337');
  const [messages, setMessages] = useState([]);
  const [testTaskId] = useState('test-task-' + Date.now());
  const [testChecklistId] = useState('test-checklist-' + Date.now());

  const {
    isConnected,
    lastMessage,
    connectionError,
    emitEvent,
  } = useRealtime(boardId);

  useEffect(() => {
    if (lastMessage) {
      setMessages(prev => [...prev, { ...lastMessage, timestamp: new Date().toLocaleTimeString() }]);
    }
  }, [lastMessage]);

  const addMessage = (type, data) => {
    setMessages(prev => [...prev, { type, data, timestamp: new Date().toLocaleTimeString() }]);
  };

  const testEvents = {
    'task-created': () => {
      const eventData = {
        taskId: testTaskId,
        title: 'Test Task Created',
        description: 'This is a test task created via real-time',
        startedAt: new Date().toISOString(),
        finishedAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        stage: 'TO_DO',
        taskOrder: 1,
        creator: {
          userId: 'test-user',
          username: 'Test User',
          imageUrl: null
        },
        leaderId: null
      };
      emitEvent('task-created', eventData);
      addMessage('SENT', { type: 'task-created', data: eventData });
    },

    'task-moved': () => {
      const eventData = {
        taskId: testTaskId,
        fromColumn: 'todo',
        toColumn: 'in-progress',
        newOrder: 1
      };
      emitEvent('task-moved', eventData);
      addMessage('SENT', { type: 'task-moved', data: eventData });
    },

    'task-updated': () => {
      const eventData = {
        taskId: testTaskId,
        updatedTask: { 
          title: 'Updated Test Task',
          status: 'COMPLETED',
          stage: 'COMPLETED'
        }
      };
      emitEvent('task-updated', eventData);
      addMessage('SENT', { type: 'task-updated', data: eventData });
    },

    'task-deleted': () => {
      const eventData = {
        taskId: testTaskId,
        boardId: boardId,
        ganttBarId: 'test-gantt-bar'
      };
      emitEvent('task-deleted', eventData);
      addMessage('SENT', { type: 'task-deleted', data: eventData });
    },

    'checklist-created': () => {
      const eventData = {
        checklistId: testChecklistId,
        taskId: testTaskId,
        title: 'Test Checklist',
        description: 'This is a test checklist',
        startedAt: new Date().toISOString(),
        finishedAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'PENDING',
        checklistOrder: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      emitEvent('checklist-created', eventData);
      addMessage('SENT', { type: 'checklist-created', data: eventData });
    },

    'checklist-updated': () => {
      const eventData = {
        taskId: testTaskId,
        checklistId: testChecklistId,
        updatedChecklist: { status: 'DONE' }
      };
      emitEvent('checklist-updated', eventData);
      addMessage('SENT', { type: 'checklist-updated', data: eventData });
    }
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Real-time System Test</h1>
        
        {/* Connection Status */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Connection Status</h2>
          <div className="flex items-center gap-4">
            <div className={`w-4 h-4 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-lg">
              {isConnected ? '✅ Connected' : '❌ Disconnected'}
            </span>
            {connectionError && (
              <span className="text-red-600 text-sm">Error: {connectionError}</span>
            )}
          </div>
          <p className="text-gray-600 mt-2">Board ID: {boardId}</p>
        </div>

        {/* Test Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Test Events</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(testEvents).map(([eventName, handler]) => (
              <button
                key={eventName}
                onClick={handler}
                disabled={!isConnected}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Test {eventName.replace('-', ' ')}
              </button>
            ))}
          </div>
          <button
            onClick={clearMessages}
            className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Clear Messages
          </button>
        </div>

        {/* Messages */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Real-time Messages</h2>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {messages.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No messages yet. Start testing events above!</p>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${
                    msg.type === 'SENT' 
                      ? 'bg-blue-50 border-blue-200' 
                      : 'bg-green-50 border-green-200'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className={`font-semibold ${
                      msg.type === 'SENT' ? 'text-blue-700' : 'text-green-700'
                    }`}>
                      {msg.type === 'SENT' ? '📤 Sent' : '📥 Received'}
                    </span>
                    <span className="text-sm text-gray-500">{msg.timestamp}</span>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium mb-1">
                      Event: {msg.data?.type || 'Unknown'}
                    </div>
                    <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
                      {JSON.stringify(msg.data, null, 2)}
                    </pre>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 rounded-lg p-6 mt-8">
          <h2 className="text-xl font-semibold mb-4 text-blue-900">Testing Instructions</h2>
          <div className="space-y-3 text-blue-800">
            <p><strong>1. Connection Test:</strong> Verify the connection status shows "Connected"</p>
            <p><strong>2. Event Testing:</strong> Click the test buttons to emit real-time events</p>
            <p><strong>3. Multi-tab Testing:</strong> Open this page in multiple tabs to see real-time updates</p>
            <p><strong>4. Kanban Integration:</strong> Open the Kanban board in another tab to see live updates</p>
            <p><strong>5. Modal Testing:</strong> Test creating tasks, checklists, and other actions in the main app</p>
          </div>
        </div>

        {/* Real-time Events Summary */}
        <div className="bg-green-50 rounded-lg p-6 mt-8">
          <h2 className="text-xl font-semibold mb-4 text-green-900">Real-time Events Implemented</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-green-800">
            <div>
              <h3 className="font-semibold mb-2">Task Events:</h3>
              <ul className="space-y-1 text-sm">
                <li>• <code>task-created</code> - New task creation</li>
                <li>• <code>task-moved</code> - Task drag & drop</li>
                <li>• <code>task-updated</code> - Task title/status changes</li>
                <li>• <code>task-deleted</code> - Task deletion</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Checklist Events:</h3>
              <ul className="space-y-1 text-sm">
                <li>• <code>checklist-created</code> - New checklist creation</li>
                <li>• <code>checklist-updated</code> - Checklist status changes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 