import { db } from '@/db';
import { message } from '@/lib/strings';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, context: any) {
  const {
    params: { postId },
  } = context;

  const saves = await db.save.findMany({
    where: {
      postId,
    },
  });

  if (!saves) {
    return NextResponse.json({
      ok: false,
      message: 'No saves',
      saveCount: 0,
    });
  }

  return NextResponse.json({
    ok: true,
    message: message.success.get,
    saveCount: saves.length,
  });
}
