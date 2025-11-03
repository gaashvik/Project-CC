import { NextResponse } from 'next/server';
import { getDataBase } from '@/database/db';
import { auth0 } from '@/lib/auth0';
import Error from 'next/error';

// GET all events for authenticated user
export const GET = async function GET(request: Request) {
  try {
    const session = await auth0.getSession();
    const userId = session?.user.sub;

    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const db = getDataBase();

    const query = `
      SELECT * FROM events
      WHERE user_id = ?
      ORDER BY date, from_time
    `;

    const events = db.prepare(query).all(userId);

    return NextResponse.json({ events }, { status: 200 });

  } catch (err) {
    console.error('GET /api/events error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch events', details: err },
      { status: 500 }
    );
  }
  // DO NOT close db here - it's a singleton
};

// POST new event for authenticated user
export const POST = async function POST(request: Request) {
  try {
    const session = await auth0.getSession();
    const userId = session?.user.sub;

    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const db = getDataBase();

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

    const result = db.prepare(query).run(userId, type, date, title, description || '', from_time, to_time);

    return NextResponse.json(
      { id: result.lastInsertRowid, message: 'Event created successfully' },
      { status: 201 }
    );

  } catch (err) {
    console.error('POST /api/events error:', err);
    
    return NextResponse.json(
      { error: 'Failed to create event', details: err },
      { status: 500 }
    );
  
  // DO NOT close db here - it's a singleton
}
};
