import { NextResponse } from 'next/server';
import { getDatabase } from '@/database/db';
import { auth0 } from '@/lib/auth0';

// GET all events for authenticated user
export async function GET(request: Request) {
  try {
    const session = await auth0.getSession();
    const userId = session?.user.sub;

    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const db = getDatabase();

    const query = `
      SELECT * FROM events
      WHERE user_id = ?
      ORDER BY date, from_time
    `;

    // Turso uses async execute() instead of prepare().all()
    const result = await db.execute({
      sql: query,
      args: [userId],
    });

    return NextResponse.json({ events: result.rows }, { status: 200 });

  } catch (err) {
    console.error('GET /api/events error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch events', details: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// POST new event for authenticated user
// POST new event for authenticated user
export async function POST(request: Request) {
  try {
    const session = await auth0.getSession();
    const userId = session?.user.sub;

    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const db = getDatabase();

    const { type, date, title, description, from_time, to_time } = await request.json();

    if (!type || !date || !title || !from_time || !to_time) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const query = `
      INSERT INTO events (user_id, type, date, title, description, from_time, to_time)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const result = await db.execute({
      sql: query,
      args: [userId, type, date, title, description || '', from_time, to_time],
    });

    // Convert BigInt to string before returning
    return NextResponse.json(
      { 
        id: result.lastInsertRowid?.toString(), // Convert BigInt to string
        message: 'Event created successfully' 
      },
      { status: 201 }
    );

  } catch (err) {
    console.error('POST /api/events error:', err);
    
    return NextResponse.json(
      { error: 'Failed to create event', details: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    );
  }
}


// DELETE event for authenticated user
export async function DELETE(request: Request) {
  try {
    const session = await auth0.getSession();
    const userId = session?.user.sub;

    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get('id');

    if (!eventId) {
      return NextResponse.json(
        { error: 'Event ID is required' },
        { status: 400 }
      );
    }

    const db = getDatabase();

    // Ensure user owns this event before deleting
    const query = `
      DELETE FROM events 
      WHERE id = ? AND user_id = ?
    `;

    const result = await db.execute({
      sql: query,
      args: [eventId, userId],
    });

    if (result.rowsAffected === 0) {
      return NextResponse.json(
        { error: 'Event not found or unauthorized' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Event deleted successfully' },
      { status: 200 }
    );

  } catch (err) {
    console.error('DELETE /api/events error:', err);
    return NextResponse.json(
      { error: 'Failed to delete event', details: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// PUT update event for authenticated user
export async function PUT(request: Request) {
  try {
    const session = await auth0.getSession();
    const userId = session?.user.sub;

    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { id, type, date, title, description, from_time, to_time } = await request.json();

    if (!id || !type || !date || !title || !from_time || !to_time) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const db = getDatabase();

    // Ensure user owns this event before updating
    const query = `
      UPDATE events 
      SET type = ?, date = ?, title = ?, description = ?, from_time = ?, to_time = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ? AND user_id = ?
    `;

    const result = await db.execute({
      sql: query,
      args: [type, date, title, description || '', from_time, to_time, id, userId],
    });

    if (result.rowsAffected === 0) {
      return NextResponse.json(
        { error: 'Event not found or unauthorized' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Event updated successfully' },
      { status: 200 }
    );

  } catch (err) {
    console.error('PUT /api/events error:', err);
    return NextResponse.json(
      { error: 'Failed to update event', details: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
