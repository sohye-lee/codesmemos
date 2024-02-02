import { db } from "@/db";
import { message } from "@/lib/constants";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse, context: any) {
  const {
    params: { slug, questionId },
  } = context;
  const question = await db.question.findUnique({
    where: {
      id: questionId,
    },
    include: {
      // question: true,
      answers: true,
      votes: true,
      user: true,
    },
  });

  if (!question) {
    return NextResponse.json({
      ok: false,
      message: message.error.get,
    });
  }

  return NextResponse.json({
    ok: true,
    message: message.success.get,
    question,
  });
}

export async function PUT(req: NextRequest, res: NextResponse, context: any) {
  const {
    params: { questionId },
  } = context;
  const data = await req.json();
  const { title, content, type, note, link, linkType, userId, slug } = data;
  const question = await db.question.update({
    where: {
      id: questionId,
    },
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

  if (!question) {
    return NextResponse.json({
      ok: false,
      message: message.error.update,
    });
  }

  return NextResponse.json({
    ok: true,
    message: message.success.update,
    question,
  });
}
