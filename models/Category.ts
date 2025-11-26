import { InferSchemaType, Schema, Types, model, models } from "mongoose";

const CategorySchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
  },
  { timestamps: true }
);

export type ICategory = InferSchemaType<typeof CategorySchema> & {
  _id: Types.ObjectId;
};

const Category =
  models.Category || model<ICategory>("Category", CategorySchema);

export default Category;
