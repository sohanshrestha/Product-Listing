import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await dbConnect();

    const params = new URL(req.url).searchParams;

    const search = params.get("search")?.trim() || "";
    const category = params.get("category") || "";
    const page = Number(params.get("page")) || 1;
    const limit = Number(params.get("limit")) || 10;

    const filter: Record<string, unknown> = {};

    if (search.length > 0) {
      filter.title = { $regex: search, $options: "i" };
    }

    if (category) {
      filter.category = category;
    }

    const skip = (page - 1) * limit;

    const products = await Product.find(filter)
      .skip(skip)
      .limit(limit)
      .populate("category", "_id name description");

    const total = await Product.countDocuments(filter);

    return NextResponse.json({
      data: products,
      page,
      limit,
      total,
      hasMore: page * limit < total,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
