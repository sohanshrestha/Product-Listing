import { Schema, model, models, InferSchemaType } from "mongoose";

const CartSchema = new Schema(
  {
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

export type ICart = InferSchemaType<typeof CartSchema>;

const Cart = models.Cart || model<ICart>("Cart", CartSchema);

export default Cart;
