import { db } from "@/db";
import { message } from "@/lib/constants";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: any) {
  const {
    params: { postId, userId },
  } = context;
  // const { userId } = await req.json();

  const save = await db.save.findFirst({
    where: {
      postId,
      userId,
    },
  });

  if (!save) {
    return NextResponse.json({
      ok: false,
      message: "Not saved by the user",
    });
  }

  return NextResponse.json({
    ok: true,
    message: "Saved",
  });
}

export async function DELETE(req: NextRequest, context: any) {
  const {
    params: { postId, userId },
  } = context;

  const existingSave = await db.save.findFirst({
    where: {
      postId,
      userId,
    },
  });

  if (!existingSave) {
    return NextResponse.json({
      ok: false,
      message: "You haven't saved this post",
    });
  }

  const save = await db.save.delete({
    where: {
      id: existingSave.id,
    },
  });

  return NextResponse.json({
    ok: true,
    message: message.success.delete,
  });
}
