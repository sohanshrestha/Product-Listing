# Product Shop List

A simple e-commerce product listing application built with **Next.js**, **TypeScript**, **React Query**, and **MongoDB**.  
Users can browse products, filter by category, search by name, sort by price or rating, add/remove products from a cart and toggle between dark and light modes.

---

## Features

- Display products in a responsive grid.
- Search products by name.
- Filter products by category.
- Sort products by price or rating.
- Add/remove products from a cart.
- Infinite scrolling for product listing.
- Dark/Light mode toggle.
- Responsive design using Tailwind CSS.
- State management with React Query.
- Backend built with Node.js, Express, and MongoDB (Mongoose).

---

## Note About Data / API

I couldn’t find a free public API that supported **pagination, search, category filter, and sort** simultaneously.  
So, I created **my own dummy data** and seeded it into MongoDB for this project. All product data is served from the database. You can view the live project [here](https://product-listing-eight-eta.vercel.app/products).

---

## Tech Stack

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS, shadcn/ui
- **Backend:** Node.js, Express (Next.js API routes)
- **Database:** MongoDB, Mongoose
- **State Management:** React Query

---

## Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/sohanshrestha/Product-Listing.git
cd Product-Listing
```

---

2. **Install dependencies**

```bash
npm install
```

---

3. **Create environment variables**

```bash
MONGO_URL=your_mongodb_connection_string
```

---

4. **Seed the database**

```bash
tsc .\scripts\seedCategory.ts
node .\scripts\seedCategory.js

tsc .\scripts\seedProducts.ts
node .\scripts\seedProducts.js
```

---

5. **Run the development server**

```bash
npm run dev
```

---

## Live Demo
Here is the live link: [LIVE DEMO](https://product-listing-eight-eta.vercel.app/products)

---

## Screenshots