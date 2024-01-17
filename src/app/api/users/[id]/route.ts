import { db } from '@/db';
import { message } from '@/lib/strings';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, context: any) {
  const {
    params: { id },
  } = context;
  const user = await db.user.findUnique({
    where: {
      id,
    },
    include: {
      posts: true,
      saves: true,
    },
  });
  if (!user) {
    return NextResponse.json({
      ok: false,
      message: message.error.get,
    });
  }

  return NextResponse.json({
    ok: true,
    message: message.success.get,
    user,
  });
}
