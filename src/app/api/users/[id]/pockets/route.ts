import { db } from '@/db';
import { message } from '@/lib/constants';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, context: any) {
  const {
    params: { id },
  } = context;

  const pockets = await db.pocket.findMany({
    where: {
      userId: id,
    },
    include: {
      posts: {
        include: {
          user: true,
          saves: true,
          comments: true,
          language: true,
        },
      },
    },
  });

  if (!pockets) {
    return NextResponse.json({
      ok: false,
      message: message.error.get,
    });
  }

  return NextResponse.json({
    ok: true,
    message: message.success.get,
    pockets,
  });
}
