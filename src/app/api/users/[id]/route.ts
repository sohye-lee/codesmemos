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
      comments: true,
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

export async function PUT(req: NextRequest, context: any) {
  const {
    params: { id },
  } = context;

  const { username } = await req.json();

  const existingUser = await db.user.findUnique({
    where: {
      id,
    },
  });

  if (!existingUser) {
    return NextResponse.json({
      ok: false,
      message: 'This user does not exist.',
    });
  }

  const user = await db.user.update({
    where: {
      id,
    },
    data: {
      username,
    },
  });

  return NextResponse.json({
    ok: true,
    message: message.success.update,
    user,
  });
}
