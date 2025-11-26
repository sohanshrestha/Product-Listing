import { InferSchemaType, model, models, Schema } from "mongoose";
import "./Category";

const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discountPercentage: { type: Number, required: true },
    rating: { type: Number, required: true },
    stock: { type: Number, required: true },
    brand: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    thumbnail: { type: String, required: true },
    images: { type: [String], required: true },
    tags: { type: [String], required: true },
  },
  { timestamps: true }
);

export type IProduct = InferSchemaType<typeof ProductSchema>;

const Product = models.Product || model<IProduct>("Product", ProductSchema);

export default Product;
