import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const ratings = await db.rating.findMany();
  let sum = 0;
  ratings.map((rating) => {
    sum = sum + rating.stars;
  });

  const average = sum / ratings.length;

  return NextResponse.json({
    ok: true,
    message: "All ratings",
    ratings,
    average,
  });
}

export async function POST(req: NextRequest) {
  const { stars, note } = await req.json();
  const rating = await db.rating.create({
    data: {
      stars: Number(stars),
      note,
    },
  });
  console.log(rating);
  if (!rating) {
    return NextResponse.json({
      ok: false,
      message: "Something went wrong",
    });
  }

  return NextResponse.json({
    ok: true,
    message: "Thank you for rating us!",
    rating,
  });
}
