import { db } from '@/db';
import { message } from '@/lib/strings';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse, context: any) {
  const {
    params: { slug, postId },
  } = context;
  const post = await db.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      topic: true,
      comments: true,
      saves: true,
      user: true,
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

export async function PUT(req: NextRequest, res: NextResponse, context: any) {
  const {
    params: { postId },
  } = context;
  const data = await req.json();
  const { title, content, type, note, link, linkType, userId, slug } = data;
  const post = await db.post.update({
    where: {
      id: postId,
    },
    data: {
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
          slug,
        },
      },
    },
  });

  if (!post) {
    return NextResponse.json({
      ok: false,
      message: message.error.update,
    });
  }

  return NextResponse.json({
    ok: true,
    message: message.success.update,
    post,
  });
}
