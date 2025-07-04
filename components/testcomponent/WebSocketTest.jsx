"use client";

import { useRealtime } from "@/hooks/useRealtime";
import { useState, useEffect } from "react";

export default function RealtimeTest({ boardId }) {
  const [messages, setMessages] = useState([]);
  
  const {
    isConnected,
    lastMessage,
    emitEvent,
  } = useRealtime(boardId);

  useEffect(() => {
    if (lastMessage) {
      setMessages(prev => [...prev, `${lastMessage.type}: ${JSON.stringify(lastMessage.data)}`]);
    }
  }, [lastMessage]);

  const sendTestTaskMoved = () => {
    emitEvent('task-moved', {
      taskId: "test-task-123",
      fromColumn: "todo",
      toColumn: "in-progress",
      newOrder: 1
    });
    setMessages(prev => [...prev, "Sent test task-moved event"]);
  };

  const sendTestTaskUpdated = () => {
    emitEvent('task-updated', {
      taskId: "test-task-123",
      updatedTask: { title: "Updated Task Title" }
    });
    setMessages(prev => [...prev, "Sent test task-updated event"]);
  };

  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Real-time Test</h3>
      
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <span className="text-sm">
          {isConnected ? 'Connected' : 'Disconnected'}
        </span>
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={sendTestTaskMoved}
          className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
        >
          Test Task Moved
        </button>
        <button
          onClick={sendTestTaskUpdated}
          className="px-3 py-1 bg-green-500 text-white rounded text-sm"
        >
          Test Task Updated
        </button>
      </div>

      <div className="max-h-40 overflow-y-auto border rounded p-2 bg-gray-50">
        <h4 className="font-medium mb-2">Messages:</h4>
        {messages.length === 0 ? (
          <p className="text-gray-500 text-sm">No messages yet...</p>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className="text-xs text-gray-700 mb-1">
              {msg}
            </div>
          ))
        )}
      </div>
    </div>
  );
} 