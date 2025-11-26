import * as dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import dbConnect from "../lib/mongodb";
import Product from "../models/Product";
import { faker } from "@faker-js/faker";
import Category, { ICategory } from "../models/Category";

const brands = ["BrandA", "BrandB", "BrandC", "BrandD"];
const tagsPool = ["new", "sale", "popular", "trending", "limited", "discount"];

// Helper to pick random elements
const random = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

const randomTags = () => {
  const count = Math.floor(Math.random() * 3) + 1;
  return Array.from({ length: count }, () => random(tagsPool));
};

const randomImages = (category: ICategory, count: number = 3) => {
  return Array.from({ length: count }, (_, i) => {
    const seed = `${category.name}-${Math.floor(Math.random() * 1000)}-${i}`;
    return `https://picsum.photos/seed/${seed}/300/300`;
  });
};

async function seed() {
  await dbConnect();

  const categories: ICategory[] = await Category.find({});
  if (categories.length === 0) {
    throw new Error("No categories found. Please seed categories first.");
  }

  await Product.deleteMany({});
  console.log("Existing products cleared.");

  const products = Array.from({ length: 100 }, () => {
    const category = random(categories);
    const images = randomImages(category, Math.floor(Math.random() * 3) + 1);

    return {
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseFloat((Math.random() * 500 + 10).toFixed(2)),
      discountPercentage: parseFloat((Math.random() * 50).toFixed(2)),
      rating: parseFloat((Math.random() * 5).toFixed(1)),
      stock: Math.floor(Math.random() * 100),
      brand: random(brands),
      category: category._id,
      thumbnail: images[0],
      images,
      tags: randomTags(),
    };
  });

  await Product.insertMany(products);
  console.log("Seeded 100 products successfully.");

  mongoose.connection.close();
}

seed().catch((err) => {
  console.error(err);
  mongoose.connection.close();
});
