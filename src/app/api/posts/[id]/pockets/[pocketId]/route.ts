import { db } from '@/db';
import { message } from '@/lib/constants';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest, context: any) {
  const {
    params: { id, pocketId },
  } = context;

  const existingPost = await db.post.findFirst({
    where: {
      id,
      pocketId,
    },
  });

  if (existingPost) {
    const unsave = await db.post.update({
      where: {
        id,
      },
      data: {
        pocket: {
          disconnect: {
            id: pocketId,
          },
        },
      },
    });

    return NextResponse.json({
      ok: true,
      message: message.success.update,
      post: unsave,
    });
  }
  const post = await db.post.update({
    where: {
      id,
    },
    data: {
      pocket: {
        connect: {
          id: pocketId,
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
