import { auth } from "@/auth";
import { db } from "@/db";
import { message } from "@/lib/constants";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: any) {
  const {
    params: { postId },
  } = context;

  const saves = await db.save.findMany({
    where: {
      postId,
    },
  });

  return NextResponse.json({
    ok: true,
    message: message.success.get,
    saveCount: saves.length,
    saves,
  });
}

export async function POST(req: NextRequest, context: any) {
  const {
    params: { postId },
  } = context;

  const { userId } = await req.json();

  const save = await db.save.create({
    data: {
      post: {
        connect: {
          id: postId,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });

  if (!save) {
    return NextResponse.json({
      ok: false,
      message: message.error.post,
    });
  }

  return NextResponse.json({
    ok: true,
    message: message.success.post,
    save,
  });
}
