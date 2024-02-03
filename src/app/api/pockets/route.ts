import { db } from '@/db';
import { message } from '@/lib/constants';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();
  const { name, userId } = data;

  const pocket = await db.pocket.create({
    data: {
      name,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });

  if (!pocket) {
    return NextResponse.json({
      ok: false,
      message: message.error.post,
    });
  }

  return NextResponse.json({
    ok: true,
    message: message.success.post,
    pocket,
  });
}

export async function GET(req: NextRequest, context:any) {
    
}