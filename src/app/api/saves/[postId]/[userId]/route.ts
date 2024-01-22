import { db } from '@/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, context: any) {
  const {
    params: { postId, userId },
  } = context;
  // const { userId } = await req.json();

  console.log(userId, postId);
  const save = await db.save.findFirst({
    where: {
      postId,
      userId,
    },
  });

  if (!save) {
    return NextResponse.json({
      ok: false,
      message: 'Not saved by the user',
    });
  }

  return NextResponse.json({
    ok: true,
    message: 'Saved',
  });
}
