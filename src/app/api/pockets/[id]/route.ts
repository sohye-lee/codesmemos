import { db } from '@/db';
import { message } from '@/lib/constants';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, context: any) {
  const {
    params: { id },
  } = context;

  const pocket = await db.pocket.findUnique({
    where: {
      id,
    },
    include: {
      posts: true,
    },
  });

  if (!pocket) {
    return NextResponse.json({
      ok: false,
      message: message.error.get,
    });
  }

  return NextResponse.json({
    ok: true,
    message: message.success.get,
    pocket,
  });
}

export async function PUT(req: NextRequest, context: any) {
  const {
    params: { id },
  } = context;
  const { name, orderIndex } = await req.json();

  const existingPocket = await db.pocket.findUnique({
    where: {
      id,
    },
  });

  if (!existingPocket)
    return NextResponse.json({ ok: false, message: message.error.update });

  const pocket = await db.pocket.update({
    where: {
      id,
    },
    data: {
      name,
      orderIndex,
    },
  });

  if (!pocket) {
    return NextResponse.json({
      ok: true,
      message: message.success.update,
    });
  }

  return NextResponse.json({
    ok: true,
    message: message.success.update,
    pocket,
  });
}
