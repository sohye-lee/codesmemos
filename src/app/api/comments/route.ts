import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const comments = await db.comment.findMany();

    return NextResponse.json({
      ok: true,
      message: "Here are all the comments!",
      comments,
    });
  } catch (error) {
    return NextResponse.json({
      ok: false,
      message: (error as any).message,
    });
  }
}
