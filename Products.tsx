import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Products: React.FC = () => {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (categoryFilter) {
          setProducts(data.filter((p: Product) => p.category === categoryFilter));
        } else {
          setProducts(data);
        }
        setLoading(false);
      });
  }, [categoryFilter]);

  return (
    <div className="pt-24 min-h-screen max-w-7xl mx-auto px-4 pb-24">
      <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter">
            {categoryFilter ? `${categoryFilter} Shoes` : 'All Products'}
          </h1>
          <p className="text-neutral-500 mt-2">{products.length} Results Found</p>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="outline" className="rounded-full gap-2">
            <SlidersHorizontal className="h-4 w-4" /> Filter
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="rounded-full gap-2 font-medium">
                Sort By <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Newest First</DropdownMenuItem>
              <DropdownMenuItem>Price: Low to High</DropdownMenuItem>
              <DropdownMenuItem>Price: High to Low</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="space-y-4">
              <div className="aspect-square bg-neutral-100 animate-pulse rounded-xl" />
              <div className="h-4 w-3/4 bg-neutral-100 animate-pulse rounded" />
              <div className="h-4 w-1/4 bg-neutral-100 animate-pulse rounded" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {products.length === 0 && !loading && (
        <div className="text-center py-24">
          <p className="text-xl text-neutral-500">No products found for this category.</p>
        </div>
      )}
    </div>
  );
};
