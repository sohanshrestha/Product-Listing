import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await dbConnect();

    const { search, category } = Object.fromEntries(
      new URL(req.url).searchParams
    ) as Record<string, string>;

    const filter: {
      title?: { $regex: string; $options: string };
      category?: string;
    } = {};

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    if (category) {
      filter.category = category;
    }

    const products = await Product.find(filter)
      .limit(50)
      .populate("category", "_id name description");

    return NextResponse.json(products);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
