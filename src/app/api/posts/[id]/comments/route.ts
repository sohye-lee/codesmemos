import { db } from "@/db";
import { message } from "@/lib/strings";
import { NextRequest, NextResponse } from "next/server";

export async function GET (req: NextRequest, context: any) {
    const { params: { id }} = context;
    const comments = await db.comment.findMany({
        where: {
            postId: id,
        },
        include: {
            user: {
                select: {
                    name: true,
                    id: true,
                    image: true,
                }
            }
        }
    });

    if (!comments) {
        return NextResponse.json({
            ok: false,
            message: message.error.get
        })
    }

    return NextResponse.json({
        ok: true, 
        message: message.success.get,
        comments
    })
}

export async function POST(req: NextRequest, context: any) {
    const { params: { id }} = context;
    const { userId, content, parentId } = await req.json();
 
    const parent = await db.comment.findFirst({
        where: {
            id: parentId
        }
    });

    const comment = await db.comment.create({
        data: {
            content,
            post: {
                connect: {
                    id,
                }
            },
            user: {
                connect: {
                    id: userId,
                }
            },
           
            parent: {
                ...(parentId
                  ? {
                    connect: {
                      id: parent?.id,
                    },
                  }
                  : {}),
              },
        },
        include: {
            children: true,
        }
    })

    if (!comment) {
        return NextResponse.json({
            ok: false,
            message: message.error.post,
        })
    }

    return NextResponse.json({
        ok: true,
        message: message.success.post,
        comment,
    })
}

