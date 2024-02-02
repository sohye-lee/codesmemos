import { db } from "@/db";
import { message } from "@/lib/constants";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, context: any) {
  const {
    params: { id, commentId },
  } = context;

  const comment = await db.comment.delete({
    where: {
      id: commentId,
    },
  });

  if (!comment) {
    return NextResponse.json({
      ok: false,
      message: message.error.delete,
    });
  }

  return NextResponse.json({
    ok: true,
    message: message.success.delete,
    comment,
  });
}
