import { Product } from "@/types/product";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card className="w-full border border-gray-200 dark:border-gray-700 py-0 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
      <div className="relative w-full h-64 overflow-hidden">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          loading="lazy"
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 640px) 100vw, 
         (max-width: 1024px) 50vw, 
         33vw"
        />
        {product.discountPercentage > 0 && (
          <Badge className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md text-sm shadow-md">
            -{product.discountPercentage.toFixed(0)}%
          </Badge>
        )}
      </div>

      <CardContent className="px-4">
        <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100 line-clamp-2">
          {product.title}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
            Rs. {product.price.toFixed(0)}
          </span>
          <div className="flex items-center space-x-1">
            <StarIcon className="w-4 h-4 text-yellow-400" />
            <span className="text-gray-700 dark:text-gray-200 text-sm">
              {product.rating.toFixed(1)}
            </span>
          </div>
        </div>

        <div className="mt-2 flex flex-wrap gap-2">
          <Badge variant="secondary" className="px-2 py-1 text-xs">
            {product.brand}
          </Badge>
          <Badge variant="secondary" className="px-2 py-1 text-xs">
            {product.category.name}
          </Badge>
          <Badge
            variant={product.stock > 0 ? "secondary" : "destructive"}
            className="px-2 py-1 text-xs"
          >
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </Badge>
        </div>
      </CardContent>

      <CardFooter className="px-4 py-3 flex justify-between items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="sm" variant="outline" className="rounded-lg">
                View
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View product details</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="sm" className="rounded-lg">
                Add to Cart
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add this product to your cart</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
};
