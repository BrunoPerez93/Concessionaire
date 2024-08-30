import { NextResponse } from 'next/server';
import { query } from '@/utils/dbConnect';

export async function GET() {
  try {
    const result = await query('SELECT * FROM users');
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}
