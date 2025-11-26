import dbConnect from "@/lib/mongodb";
import Cart from "@/models/Cart";
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

    const cart = await Cart.findOne({});
    const cartProductIds =
      cart?.products.map((p: string) => p.toString()) || [];

    const productsWithCartFlag = products.map((p) => ({
      ...p.toObject(),
      isInCart: cartProductIds.includes(p._id.toString()),
    }));

    return NextResponse.json({
      data: productsWithCartFlag,
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
