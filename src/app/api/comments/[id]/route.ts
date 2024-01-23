import { db } from "@/db";
import { message } from "@/lib/strings";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, context: any) {
    const {params: {id}} = context;

    const comment = await db.comment.delete({
        where: {
            id,
        }
    });

    if (!comment) {
        return NextResponse.json({
            ok: false,
            message: message.error.delete
        })
    }

    return NextResponse.json({
        ok: true,
        message: message.success.delete,
        comment,
    })
}

export async function PUT(req: NextRequest, context: any) {
    const {params: {id}} = context;
    const { content } = await req.json();
    const comment = await db.comment.update({
        where: {
            id,
        },
        data: {
            content,
        }
    })


    if (!comment) {
        return NextResponse.json({
            ok: false,
            message: message.error.update
        })
    }

    return NextResponse.json({
        ok: true,
        message: message.success.update,
        comment,
    })
}