import { db } from "@/db";
import { message } from "@/lib/constants";
import { Language } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const languages = await db.language.findMany();

  if (!languages) {
    return NextResponse.json({
      ok: false,
      message: message.error.get,
    });
  }

  return NextResponse.json({
    ok: true,
    message: message.success.get,
    languages: languages.sort((a: Language, b: Language) =>
      a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
    ),
  });
}

export async function POST(req: NextRequest, res: NextResponse, context: any) {
  const { name } = await req.json();
  const existingLanguage = await db.language.findUnique({
    where: {
      name: name.toLowerCase(),
    },
  });
  if (existingLanguage) {
    return NextResponse.json({
      ok: false,
      message: "This language already exists!",
    });
  }

  const language = await db.language.create({
    data: {
      name: name.toLowerCase().replace("#", "specialpound"),
    },
  });

  if (!language) {
    return NextResponse.json({
      ok: false,
      message: message.error.post,
    });
  }
  return NextResponse.json({
    ok: true,
    message: message.success.post,
    language,
  });
}
