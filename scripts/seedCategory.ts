import * as dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import dbConnect from "../lib/mongodb";
import Category from "../models/Category";

async function seedCategories() {
  await dbConnect();

  await Category.deleteMany({});
  console.log("Existing categories cleared.");

  const categories = [
    { name: "Electronics", description: "Gadgets, devices and tech products" },
    { name: "Clothing", description: "Apparel, shoes, and accessories" },
    { name: "Books", description: "Fiction, non-fiction, textbooks" },
    { name: "Home", description: "Furniture, decor, kitchen items" },
    { name: "Sports", description: "Sporting goods and outdoor equipment" },
  ];

  await Category.insertMany(categories);
  console.log("Inserted categories successfully.");

  mongoose.connection.close();
}

seedCategories().catch((err) => {
  console.error(err);
  mongoose.connection.close();
});
