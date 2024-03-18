import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, context: any) {
  try {
    const { term } = await req.json();

    const words = term.trim().split(" ");

    const posts = await db.post.findMany({
      include: {
        language: true,
        user: true,
        comments: true,
        saves: true,
      },
      where: {
        OR: [
          {
            title: {
              contains: term,
              mode: "insensitive",
            },
          },
          {
            content: {
              contains: term,
              mode: "insensitive",
            },
          },
          {
            note: {
              contains: term,
              mode: "insensitive",
            },
          },
          {
            languageName: {
              contains: term,
              mode: "insensitive",
            },
          },
        ],
      },
    });
    return NextResponse.json({
      ok: true,
      posts,
      message: `Found ${posts?.length} posts containing the term '${term}'`,
    });
  } catch (error) {
    console.log("SEARCH ERROR", error);
    return NextResponse.json({
      ok: false,
      message: "Something went wrong with your search.",
    });
  }
}
