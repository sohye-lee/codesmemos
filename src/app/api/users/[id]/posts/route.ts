import { db } from "@/db";
import { message } from "@/lib/strings";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: any) {
    const { params: { id}} = context;
    const posts = await db.post.findMany({
        where: {
            userId: id,
        },
        include: {
            user: true,
            language: true,
            saves: true,
            comments: true,
        }
    })

    if (!posts) {
        return NextResponse.json({
            ok: true,
            messaage: message.error.get,
        })
    }

    return NextResponse.json({
        ok: true,
        messaage: message.success.get,
        posts,
    })
}