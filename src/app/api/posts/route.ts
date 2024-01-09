import { db } from '@/db';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, context: any) {
  const posts = await db.post.findMany({
    include: {
      user: true,
      topic: true,
      comments: true,
      saves: true,
    },
  });
}
