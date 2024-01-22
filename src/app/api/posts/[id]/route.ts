import { db } from '@/db';
import { message } from '@/lib/strings';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, context: any) {
  const {
    params: { id },
  } = context;

  const post = await db.post.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
      language: true,
      comments: true,
      saves: true,
    },
  });

  if (!post) {
    return NextResponse.json({
      ok: false,
      message: message.error.get,
    });
  }

  return NextResponse.json({
    ok: true,
    message: message.success.get,
    post,
  });
}
