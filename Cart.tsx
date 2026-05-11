import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../store/useCart';
import { Trash2, ArrowRight, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { motion, AnimatePresence } from 'motion/react';

export const Cart: React.FC = () => {
  const { items, removeItem, total, addItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="pt-24 min-h-screen flex flex-col items-center justify-center p-4">
        <div className="bg-neutral-50 p-12 rounded-full mb-8">
          <ShoppingBag className="h-16 w-16 text-neutral-300" />
        </div>
        <h2 className="text-3xl font-black uppercase tracking-tighter">Your bag is empty</h2>
        <p className="text-neutral-500 mt-4 max-w-xs text-center leading-relaxed">
          Looks like you haven't added anything to your bag yet. Start exploring our latest innovation.
        </p>
        <Link to="/products" className="mt-8">
          <Button size="lg" className="rounded-full bg-black text-white hover:bg-neutral-800 px-12">
            Explore Collection
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen max-w-7xl mx-auto px-4 pb-24">
      <h1 className="text-4xl font-black uppercase tracking-tighter mb-12">Your Bag</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-8">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex gap-6 pb-8 border-b border-neutral-100"
              >
                <Link to={`/product/${item.id}`} className="w-32 h-32 bg-neutral-100 rounded-xl overflow-hidden shadow-sm">
                  <img src={item.image} className="w-full h-full object-cover" />
                </Link>
                
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold uppercase tracking-tight">{item.name}</h3>
                      <p className="text-sm text-neutral-500">{item.category}</p>
                      <div className="flex gap-4 mt-2">
                        <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">Size: <span className="text-black">{item.selectedSize}</span></p>
                        <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">Color: <span className="text-black">{item.selectedColor}</span></p>
                      </div>
                    </div>
                    <p className="text-xl font-bold">${item.price}</p>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center gap-4 bg-neutral-100 px-4 py-2 rounded-full">
                      <button className="p-1 hover:text-neutral-500 transition-colors">
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="font-bold text-sm w-4 text-center">{item.quantity}</span>
                      <button className="p-1 hover:text-neutral-500 transition-colors" onClick={() => addItem(item, item.selectedSize, item.selectedColor)}>
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => removeItem(item.id, item.selectedSize, item.selectedColor)}
                      className="text-neutral-400 hover:text-red-500 transition-colors p-2"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-neutral-50 rounded-3xl p-8 sticky top-24">
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-8">Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <p className="text-neutral-500 font-medium">Subtotal</p>
                <p className="font-bold">${total.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-neutral-500 font-medium">Estimated Shipping & Handling</p>
                <p className="font-bold">Free</p>
              </div>
              <div className="flex justify-between">
                <p className="text-neutral-500 font-medium">Estimated Tax</p>
                <p className="font-bold">-</p>
              </div>
              <Separator className="my-6" />
              <div className="flex justify-between items-center pt-2">
                <p className="text-lg font-bold">Total</p>
                <p className="text-2xl font-black">${total.toFixed(2)}</p>
              </div>
            </div>

            <Button className="w-full h-16 rounded-full mt-10 bg-black text-white hover:bg-neutral-800 text-lg font-bold shadow-xl shadow-black/10">
              Checkout <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <p className="text-[10px] text-neutral-400 uppercase tracking-widest text-center mt-6">
              Tax and shipping calculated at checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
