import { accountType } from "./../../../lib/types";
import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { message } from "@/lib/constants";

export async function GET(req: NextRequest, context: any) {
  const users = await db.user.findMany({
    include: {
      posts: true,
      comments: true,
      saves: true,
    },
  });

  if (!users) {
    return NextResponse.json({
      ok: false,
      message: message.error.update,
    });
  }

  return NextResponse.json({
    ok: true,
    message: message.success.update,
    users,
  });
}
