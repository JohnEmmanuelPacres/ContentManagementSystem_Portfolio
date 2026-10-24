import { NextResponse } from 'next/server';

const CHATBOT_API_URL =
  process.env.CHATBOT_API_URL ||
  'https://contentmanagementsystem-portfolio.onrender.com/api/chat';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await fetch(CHATBOT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: 'Failed to fetch reply from chatbot service', detail: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Chat API proxy error:', error);
    return NextResponse.json(
      { error: 'Internal server error while connecting to chatbot service' },
      { status: 500 }
    );
  }
}
