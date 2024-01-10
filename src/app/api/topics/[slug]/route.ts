import { db } from '@/db';
import { message } from '@/lib/strings';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, context: any) {
  const {
    params: { slug },
  } = context;
  const topic = await db.topic.findUnique({
    where: {
      slug,
    },
    include: {
      posts: true,
    },
  });

  if (!topic) {
    return NextResponse.json({
      ok: false,
      message: message.error.get,
    });
  }

  return NextResponse.json({
    ok: true,
    message: message.success.get,
    topic,
  });
}

export async function PUT(req: NextRequest, res: NextResponse, context: any) {
  const {
    params: { slug },
  } = context;
  const data = await req.json();
  const { slug: newSlug, description } = data;
  const topic = await db.topic.update({
    where: {
      slug,
    },
    data: {
      slug: newSlug,
      description,
    },
  });

  if (!topic) {
    return NextResponse.json({
      ok: false,
      message: message.error.update,
    });
  }

  return NextResponse.json({
    ok: true,
    message: message.success.update,
    topic,
  });
}
