import { NextResponse } from 'next/server';
import { broadcastToBoard } from '../route.js';

export async function POST(request) {
  try {
    const { boardId, eventType, data } = await request.json();
    
    console.log('📤 Emit request received:', { boardId, eventType, data });

    if (!boardId || !eventType) {
      console.error('❌ Missing required fields:', { boardId, eventType });
      return NextResponse.json(
        { error: 'Board ID and event type are required' },
        { status: 400 }
      );
    }

    // Broadcast the event to all connected clients in the board
    broadcastToBoard(boardId, {
      type: eventType,
      data,
      timestamp: new Date().toISOString(),
    });

    console.log('✅ Event broadcasted successfully');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ Error in emit route:', error);
    return NextResponse.json(
      { error: 'Failed to emit event', details: error.message },
      { status: 500 }
    );
  }
} 