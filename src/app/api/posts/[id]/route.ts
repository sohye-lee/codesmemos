import { notFound } from "next/navigation";
import { db } from "@/db";
import { message } from "@/lib/constants";
import { NextRequest, NextResponse } from "next/server";

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
      comments: {
        include: {
          user: true,
          parent: true,
          children: true,
        },
      },
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

export async function PUT(req: NextRequest, context: any) {
  const id = context.params.id;
  const { title, content, link, linkType, userId, languageName, type, note } =
    await req.json();

  const existingPost = await db.post.findUnique({
    where: {
      id,
    },
  });

  if (!existingPost) {
    return NextResponse.json({
      ok: false,
      message: "This post doesn't exits.",
    });
  }

  if (userId !== existingPost.userId) {
    return NextResponse.json({
      ok: false,
      message: "You are not allowed to edit this post.",
    });
  }

  const post = await db.post.update({
    where: {
      id,
    },
    data: {
      title,
      content,
      type,
      link,
      linkType,
      note,
      language: {
        connect: {
          name: languageName,
        },
      },
    },
  });

  if (!post) {
    return NextResponse.json({ ok: false, message: message.error.update });
  }

  return NextResponse.json({
    ok: true,
    message: message.success.update,
    post,
  });
}
