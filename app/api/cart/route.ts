import dbConnect from "@/lib/mongodb";
import Cart from "@/models/Cart";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { productId }: { productId: string } = await req.json();

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    if (!Types.ObjectId.isValid(productId)) {
      return NextResponse.json(
        { error: "Invalid Product ID" },
        { status: 400 }
      );
    }

    let cart = await Cart.findOne({});
    if (!cart) {
      cart = new Cart({ products: [] });
    }

    const isInCart = cart.products.includes(productId);
    if (isInCart) {
      cart.products = cart.products.filter(
        (id: string) => id.toString() !== productId
      );
    } else {
      cart.products.push(productId);
    }

    await cart.save();

    return NextResponse.json({
      productId,
      isInCart: !isInCart,
      products: cart.products,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
