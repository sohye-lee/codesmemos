import { db } from '@/db';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { message } from '@/lib/constants';

export async function GET(req: NextRequest, context: any) {
  const likes = await db.like.findMany({});

  if (!likes) {
    return NextResponse.json({
      ok: false,
      message: message.error.get,
    });
  }

  return NextResponse.json({
    ok: true,
    message: message.success.get,
    likes,
    count: likes.length,
  });
}

export async function POST(req: NextRequest, res: NextResponse, context: any) {
  const createdAt = new Date();
  const like = await db.like.create({
    data: {
      likedTime: createdAt,
    },
  });

  if (!like) {
    return NextResponse.json({
      ok: false,
      message: message.error.post,
    });
  }

  return NextResponse.json({
    ok: true,
    message: message.success.post,
    like,
  });
}
