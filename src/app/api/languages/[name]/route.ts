import { db } from '@/db';
import { message } from '@/lib/strings';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, context: any) {
  const {
    params: { name },
  } = context;

  const language = await db.language.findFirst({
    where: {
      name,
    },
    include: {
      posts: {
        include: {
          user: true,
          saves: true, 
          comments: true,
        }
      }
    }
  })

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

export async function PUT(req: NextRequest, context: any) {
  const {
    params: { name },
  } = context;
  const data = await req.json();
  const { name: newLanguageName } = data;

  const existingLanguage = await db.language.findFirst({
    where: {
      name: newLanguageName.toLowerCase(),
    },
  });

  if (existingLanguage) {
    return NextResponse.json({
      ok: false,
      message: 'This language already exists!',
    });
  }

  const language = await db.language.update({
    where: {
      name: name.toLowerCase(),
    },
    data: {
      name: newLanguageName.toLowerCase(),
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
