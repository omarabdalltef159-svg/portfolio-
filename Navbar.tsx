import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, User, Heart, Menu } from 'lucide-react';
import { useCart } from '../store/useCart';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const Navbar: React.FC = () => {
  const { items } = useCart();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex-shrink-0">
              <svg height="24" width="80" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 8.719L7.836 14.303C6.74 14.768 5.818 15 5.075 15c-.836 0-1.445-.295-1.819-.884-.485-.738-.273-1.93.635-3.571.115-.209.222-.418.33-.628l-.01.008C3.89 10.51 3.55 11.23 3.393 11.96c-.183.857.03 1.543.642 2.054.496.416 1.181.621 2.047.621 1.099 0 2.457-.403 4.056-1.205L21 8.719z" />
              </svg>
            </Link>
            <div className="hidden md:flex space-x-8">
              <Link to="/products" className="text-sm font-medium hover:text-neutral-500 transition-colors">Catalog</Link>
              <Link to="/products?category=Running" className="text-sm font-medium hover:text-neutral-500 transition-colors">Running</Link>
              <Link to="/products?category=Lifestyle" className="text-sm font-medium hover:text-neutral-500 transition-colors">Lifestyle</Link>
              <Link to="/products?category=Performance" className="text-sm font-medium hover:text-neutral-500 transition-colors">Performance</Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center bg-neutral-100 px-3 py-1.5 rounded-full">
              <Search className="h-4 w-4 text-neutral-400" />
              <input 
                type="text" 
                placeholder="Search" 
                className="bg-transparent border-none focus:ring-0 text-sm ml-2 w-32 focus:w-48 transition-all"
              />
            </div>
            <button className="p-2 hover:bg-neutral-100 rounded-full transition-colors relative">
              <Heart className="h-5 w-5" />
            </button>
            <Link to="/login" className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
              <User className="h-5 w-5" />
            </Link>
            <Link to="/cart" className="p-2 hover:bg-neutral-100 rounded-full transition-colors relative">
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <button className="md:hidden p-2 hover:bg-neutral-100 rounded-full">
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="mt-8 flex flex-col space-y-4">
                  <Link to="/products" className="text-lg font-medium">Catalog</Link>
                  <Link to="/products?category=Running" className="text-lg font-medium">Running</Link>
                  <Link to="/products?category=Lifestyle" className="text-lg font-medium">Lifestyle</Link>
                  <Link to="/products?category=Performance" className="text-lg font-medium">Performance</Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};
