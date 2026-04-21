import { NextResponse } from 'next/server';

export async function GET() {
  const apiUrl = process.env.NICKNAME_API_URL || 'http://host.docker.internal:5000/api/nicknames';
  const res = await fetch(apiUrl, { cache: 'no-store' });
  const data = await res.json();
  return NextResponse.json(data);
}
