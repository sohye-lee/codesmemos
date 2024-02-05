import { db } from '@/db';
import { message } from '@/lib/constants';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, context: any) {
  const {
    params: { id },
  } = context;
  const saves = await db.save.findMany({
    where: {
      userId: id,
    },
    include: {
      post: {
        include: {
          language: true,
          user: true,
          comments: true,
          saves: true,
        },
      },
      user: true,
    },
  });

  if (!saves) {
    return NextResponse.json({
      ok: false,
      message: message.error.get,
    });
  }

  return NextResponse.json({
    ok: true,
    message: message.success.get,
    saves,
  });
}
