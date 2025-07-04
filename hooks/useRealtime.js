"use client";

import { useEffect, useRef, useState, useCallback } from 'react';

export const useRealtime = (boardId) => {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState(null);
  const [connectionError, setConnectionError] = useState(null);
  const eventSourceRef = useRef(null);

  const connect = useCallback(() => {
    if (!boardId || eventSourceRef.current) return;

    console.log('Attempting to connect to real-time server for board:', boardId);

    try {
      const url = `/api/realtime?boardId=${boardId}`;
      console.log('Connecting to:', url);
      
      const eventSource = new EventSource(url);
      eventSourceRef.current = eventSource;

      eventSource.onopen = () => {
        console.log('✅ Connected to real-time server');
        setIsConnected(true);
        setConnectionError(null);
      };

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          setLastMessage(data);
          console.log('📨 Received real-time message:', data);
        } catch (error) {
          console.error('❌ Error parsing real-time message:', error);
        }
      };

      eventSource.onerror = (event) => {
        console.error('❌ Real-time connection error:', event);
        console.error('EventSource readyState:', eventSource.readyState);
        setConnectionError('Connection failed');
        setIsConnected(false);
        
        if (eventSource.readyState === EventSource.CLOSED) {
          eventSource.close();
          eventSourceRef.current = null;
          
          // Try to reconnect after 5 seconds
          setTimeout(() => {
            if (boardId) {
              console.log('🔄 Attempting to reconnect...');
              connect();
            }
          }, 5000);
        }
      };

    } catch (error) {
      console.error('❌ Error creating EventSource:', error);
      setConnectionError(error.message);
      setIsConnected(false);
    }
  }, [boardId]);

  const disconnect = useCallback(() => {
    if (eventSourceRef.current) {
      console.log('🔌 Disconnecting from real-time server');
      eventSourceRef.current.close();
      eventSourceRef.current = null;
      setIsConnected(false);
      setConnectionError(null);
    }
  }, []);

  useEffect(() => {
    if (boardId) {
      connect();
    }

    return () => {
      disconnect();
    };
  }, [boardId, connect, disconnect]);

  // Function to emit events (we'll use a separate API endpoint for this)
  const emitEvent = useCallback(async (eventType, data) => {
    try {
      console.log('📤 Emitting event:', eventType, data);
      
      const response = await fetch('/api/realtime/emit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          boardId,
          eventType,
          data,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to emit event: ${response.status} ${errorText}`);
      }
      
      console.log('✅ Event emitted successfully');
    } catch (error) {
      console.error('❌ Error emitting event:', error);
    }
  }, [boardId]);

  return {
    isConnected,
    lastMessage,
    connectionError,
    emitEvent,
    connect,
    disconnect,
  };
}; 