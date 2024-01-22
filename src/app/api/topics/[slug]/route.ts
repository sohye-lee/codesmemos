import { db } from '@/db';
import { message } from '@/lib/strings';
import { getStaticProps } from 'next/dist/build/templates/pages';
import { useRouter } from 'next/router';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, context: any) {
  const {
    params: { slug },
  } = context;
  const topic = await db.topic.findUnique({
    where: {
      slug,
    },
    include: {
      questions: true,
    },
  });

  if (!topic) {
    return NextResponse.json({
      ok: false,
      message: message.error.get,
    });
  }

  return NextResponse.json({
    ok: true,
    message: message.success.get,
    topic,
  });
}

export async function PUT(req: NextRequest, context: any) {
  const {
    params: { slug },
  } = context;
  const data = await req.json();
  const { slug: newSlug, description } = data;
  const topic = await db.topic.update({
    where: {
      slug: slug.toLowerCase(),
    },
    data: {
      slug: newSlug.toLowerCase(),
      description,
    },
  });

  if (!topic) {
    return NextResponse.json({
      ok: false,
      message: message.error.update,
    });
  }

  return NextResponse.json({
    ok: true,
    message: message.success.update,
    topic,
  });
}

export async function DELETE(
  req: NextRequest,
  res: NextResponse,
  context: any
) {
  // const { slug } = useParams();
  // const {
  //   params: { slug },
  // } = await context;

  const data = await req.json();
  const { identity } = data;

  const topic = await db.topic.delete({
    where: {
      slug: identity,
    },
  });

  if (!topic) {
    return NextResponse.json({
      ok: false,
      message: message.error.delete,
    });
  }

  return NextResponse.json({
    ok: true,
    message: message.success.delete,
    topic,
  });
}
