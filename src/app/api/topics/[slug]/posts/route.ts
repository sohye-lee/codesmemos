import { db } from '@/db';
import { message } from '@/lib/strings';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, context: any) {
  const {
    params: { slug },
  } = context;
  const posts = await db.post.findMany({
    where: {
      topicSlug: slug,
    },
  });

  if (!posts) {
    return NextResponse.json({
      ok: false,
      message: message.error.get,
    });
  }

  return NextResponse.json({
    ok: true,
    message: message.success.get,
    posts,
  });
}

export async function POST(req: NextRequest, context: any) {
  const {
    params: { slug },
  } = context;

  const data = await req.json();
  const { title, content, type, note, link, linkType, userId } = data;
  const post = await db.post.create({
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
      message: message.error.post,
    });
  }

  return NextResponse.json({
    ok: true,
    message: message.success.post,
    post,
  });
}
