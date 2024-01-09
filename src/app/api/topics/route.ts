import { accountType } from './../../../lib/types';
import { db } from '@/db';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { message } from '@/lib/strings';

export async function GET(req: NextRequest, context: any) {
  const topics = await db.topic.findMany({
    include: {
      posts: true,
    },
  });

  if (!topics) {
    return NextResponse.json({
      ok: false,
      message: message.error.post,
    });
  }

  return NextResponse.json({
    ok: true,
    message: message.success.post,
    topics,
  });
}

export async function POST(req: NextRequest, res: NextResponse, context: any) {
  const data = await req.json();
  const { slug, description } = data;
  const session = await auth();

  if (!session?.user) {
  }

  const topic = await db.topic.create({
    data: {
      slug,
      description,
    },
  });

  if (!topic) {
    return NextResponse.json({
      ok: false,
      message: message.error.post,
    });
  }

  return NextResponse.json({
    ok: true,
    message: message.success.post,
    topic,
  });
}
