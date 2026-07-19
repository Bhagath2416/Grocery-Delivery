
import { useState, useEffect } from "react";
import type { Product } from "../../assets/types";
import { dummyProducts } from "../../assets/dummyProducts";
import { ArrowRightIcon } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

const PopularProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(dummyProducts.slice(0, 10));
  }, []);

  return (
    <section className="pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-app-green">
              Popular Products
            </h2>
            <p className="text-sm text-app-text-light mt-2">
              Top-rated products this season
            </p>
          </div>

          <Link
            to="/products"
            className="group flex items-center gap-2 text-sm font-semibold text-app-orange hover:text-orange-600 transition-colors"
          >
            View All
            <ArrowRightIcon className="size-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 xl:gap-8">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularProducts;