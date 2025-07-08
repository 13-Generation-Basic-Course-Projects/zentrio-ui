// Store connected clients
const clients = new Map();

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const boardId = searchParams.get('boardId');
    
      ('🔗 Real-time connection request for board:', boardId);
    
    if (!boardId) {
      console.error('❌ Board ID missing in request');
      return new Response('Board ID required', { status: 400 });
    }

    const stream = new ReadableStream({
      start(controller) {
        const clientId = Date.now().toString();
          (`👤 Client ${clientId} connecting to board ${boardId}`);
        
        // Store client
        if (!clients.has(boardId)) {
          clients.set(boardId, new Map());
        }
        clients.get(boardId).set(clientId, controller);

        // Send initial connection message
        const data = `data: ${JSON.stringify({ type: 'connected', clientId, boardId })}\n\n`;
        controller.enqueue(new TextEncoder().encode(data));
          (`✅ Client ${clientId} connected to board ${boardId}`);

        // Handle client disconnect
        request.signal.addEventListener('abort', () => {
            (`🔌 Client ${clientId} disconnected from board ${boardId}`);
          const boardClients = clients.get(boardId);
          if (boardClients) {
            boardClients.delete(clientId);
            if (boardClients.size === 0) {
              clients.delete(boardId);
                (`🗑️ Removed empty board ${boardId}`);
            }
          }
        });
      },
      cancel() {
          ('❌ Stream cancelled');
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Cache-Control',
      },
    });
  } catch (error) {
    console.error('❌ Error in real-time GET route:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

// Function to broadcast to all clients in a board
export function broadcastToBoard(boardId, data) {
    (`📢 Broadcasting to board ${boardId}:`, data);
  
  const boardClients = clients.get(boardId);
  if (boardClients) {
    const message = `data: ${JSON.stringify(data)}\n\n`;
    const encoder = new TextEncoder();
    let sentCount = 0;
    
    boardClients.forEach((controller, clientId) => {
      try {
        controller.enqueue(encoder.encode(message));
        sentCount++;
          (`📤 Sent message to client ${clientId}`);
      } catch (error) {
        console.error(`❌ Error sending message to client ${clientId}:`, error);
        // Remove the failed client
        boardClients.delete(clientId);
      }
    });
    
      (`✅ Broadcasted to ${sentCount} clients in board ${boardId}`);
  } else {
      (`⚠️ No clients found for board ${boardId}`);
  }
} 