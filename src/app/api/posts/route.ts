import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { message } from "@/lib/constants";
import { Router } from "next/router";
import { redirect } from "next/dist/server/api-utils";
import { ExtendedPost } from "@/lib/types";

export async function GET(req: NextRequest, context: any) {
  const posts = await db.post.findMany({
    include: {
      user: true,
      // topic: true,
      language: true,
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
    // posts: posts.sort(function (a: ExtendedPost, b: ExtendedPost) { return new Date(b.createdAt) - new Date(b.createdAt)})
  });
}

export async function POST(req: NextRequest, res: NextResponse, context: any) {
  const data = await req.json();
  const { title, content, type, note, link, linkType, userId, languageName } =
    data;
  const session = await auth();

  if (session?.user?.id !== userId) {
    return NextResponse.redirect("/login");
  }

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
      language: {
        connect: {
          name: languageName,
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
