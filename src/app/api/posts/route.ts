import { db } from '@/db';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { message } from '@/lib/strings';

export async function GET(req: NextRequest, context: any) {
  const posts = await db.post.findMany({
    include: {
      user: true,
      topic: true,
      comments: true,
      saves: true,
    },
  });

  if (!posts) {
    return NextResponse.json({
      ok: false,
      message: message.error.post,
    });
  }

  return NextResponse.json({
    ok: true,
    message: message.success.post,
    posts,
  });
}

export async function POST(req: NextRequest, res: NextResponse, context: any) {
  const data = await req.json();
  const { title, content, type, note, link, linkType, userId, topicId } = data;
  const session = await auth();

  const post = await db.post.create({
    data: {
      userId,
      topicId,
      title,
      content,
      type,
      note,
      link,
      linkType,
      user: {
        connect: {
          id: userId,
        },
      },
      topic: {
        connect: {
          id: topicId,
        },
      },
    },
  });

  if (!post) {
    return NextResponse.json({
      ok: false,
      message: message.error.post,
    });
  }

  return NextResponse.json({
    ok: true,
    message: message.success.post,
    post,
  });
}
