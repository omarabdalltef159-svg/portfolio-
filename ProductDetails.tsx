import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { ShoeViewer } from '../components/ShoeViewer';
import { useCart } from '../store/useCart';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, ShoppingCart, Share2, Info, Sparkles } from 'lucide-react';
import { getStyleAdvice } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [styleAdvice, setStyleAdvice] = useState<string>('');
  const [loadingAdvice, setLoadingAdvice] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        if (data.colors?.length > 0) setSelectedColor(data.colors[0]);
        
        // Fetch AI Style Advice
        setLoadingAdvice(true);
        getStyleAdvice(data.name, data.description).then(advice => {
          setStyleAdvice(advice || '');
          setLoadingAdvice(false);
        });
      });
  }, [id]);

  if (!product) return (
    <div className="pt-24 flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
    </div>
  );

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    addItem(product, selectedSize, selectedColor);
    // Optionally navigate to cart or show success message
  };

  return (
    <div className="pt-24 min-h-screen max-w-7xl mx-auto px-4 pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left Column: 3D Model and Gallery */}
        <div className="space-y-6">
          <div className="sticky top-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-square rounded-3xl bg-neutral-50 overflow-hidden shadow-inner"
            >
              {product.modelUrl ? (
                <ShoeViewer url={product.modelUrl} color={selectedColor} />
              ) : (
                <img src={product.image} className="w-full h-full object-cover" />
              )}
              
              <div className="absolute top-6 left-6">
                <Badge variant="secondary" className="bg-white/80 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-widest border-none">
                  INTERACTIVE 3D
                </Badge>
              </div>

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                <p className="text-[10px] uppercase font-bold text-neutral-400 tracking-[0.2em] bg-white/50 px-4 py-2 rounded-full backdrop-blur-sm">
                  Click and drag to rotate • Scroll to zoom
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Column: Product Info */}
        <div className="space-y-10">
          <header className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-bold text-neutral-400 uppercase tracking-widest">{product.category}</p>
                <h1 className="text-5xl font-black uppercase tracking-tighter mt-1">{product.name}</h1>
              </div>
              <p className="text-3xl font-black">${product.price}</p>
            </div>
            <p className="text-neutral-500 leading-relaxed text-lg max-w-lg">
              {product.description}
            </p>
          </header>

          {/* Color Selection */}
          <div className="space-y-4">
            <p className="text-sm font-bold uppercase tracking-widest">Select Color</p>
            <div className="flex gap-3">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-12 h-12 rounded-full border-2 transition-all p-0.5 ${
                    selectedColor === color ? 'border-black scale-110' : 'border-transparent hover:border-neutral-300'
                  }`}
                >
                  <div 
                    className="w-full h-full rounded-full shadow-inner"
                    style={{ backgroundColor: color.toLowerCase().replace(' ', '') }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-sm font-bold uppercase tracking-widest">Select Size</p>
              <button className="text-xs font-bold text-neutral-400 uppercase hover:text-black transition-colors underline decoration-2 underline-offset-4">Size Guide</button>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 rounded-lg text-sm font-bold border-2 transition-all ${
                    selectedSize === size 
                      ? 'border-black bg-black text-white' 
                      : 'border-neutral-100 hover:border-neutral-300'
                  }`}
                >
                  US {size}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-6 space-y-4">
            <Button 
              onClick={handleAddToCart}
              className="w-full h-16 rounded-full text-lg font-bold bg-black hover:bg-neutral-800 text-white border-none shadow-xl shadow-black/5"
            >
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to Bag
            </Button>
            <div className="flex gap-4">
              <Button variant="outline" className="flex-1 h-16 rounded-full border-neutral-200 font-bold hover:bg-neutral-50">
                <Heart className="mr-2 h-5 w-5" /> Wishlist
              </Button>
              <Button variant="outline" className="h-16 w-16 rounded-full border-neutral-200 hover:bg-neutral-50 px-0">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* AI Stylist Advice */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-neutral-50 to-neutral-100 border border-neutral-200 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Sparkles className="h-24 w-24" />
            </div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-neutral-800" />
              <p className="text-xs font-bold uppercase tracking-widest text-neutral-800">NIKE AI Stylist Advice</p>
            </div>
            {loadingAdvice ? (
              <div className="space-y-2">
                <div className="h-4 w-full bg-neutral-200 rounded animate-pulse" />
                <div className="h-4 w-3/4 bg-neutral-200 rounded animate-pulse" />
                <div className="h-4 w-1/2 bg-neutral-200 rounded animate-pulse" />
              </div>
            ) : (
              <div className="prose prose-sm prose-neutral max-w-none">
                <ReactMarkdown>{styleAdvice}</ReactMarkdown>
              </div>
            )}
          </motion.div>

          {/* Additional Info */}
          <Tabs defaultValue="details" className="pt-10">

            <TabsList className="bg-transparent border-b border-neutral-100 w-full justify-start h-auto p-0 rounded-none">
              <TabsTrigger 
                value="details" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent pb-4 px-6 text-sm font-bold uppercase tracking-widest"
              >
                Details
              </TabsTrigger>
              <TabsTrigger 
                value="shipping" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent pb-4 px-6 text-sm font-bold uppercase tracking-widest"
              >
                Shipping
              </TabsTrigger>
              <TabsTrigger 
                value="reviews" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent pb-4 px-6 text-sm font-bold uppercase tracking-widest"
              >
                Reviews (48)
              </TabsTrigger>
            </TabsList>
            <div className="py-8">
              <TabsContent value="details" className="space-y-4">
                <p className="text-neutral-500 leading-relaxed">
                  Inspired by the high-tech performance of early '00s track spikes, this model's design brings a streamlined, aerodynamic look to the street. 
                </p>
                <ul className="list-disc pl-5 text-neutral-500 space-y-2">
                  <li>Shown: Red/Black/White</li>
                  <li>Style: CW4555-103</li>
                  <li>Mesh and synthetic upper for lightweight comfort</li>
                </ul>
              </TabsContent>
              <TabsContent value="shipping">
                <p className="text-neutral-500">Free standard shipping on orders over $150. Estimated delivery in 3-5 business days.</p>
              </TabsContent>
              <TabsContent value="reviews">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="flex gap-1 text-black">
                      {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-4 w-4 bg-black rounded-sm" />)}
                    </div>
                    <span className="font-bold">4.8 / 5.0</span>
                  </div>
                  {/* Mock reviews */}
                  <div className="border-t border-neutral-100 pt-6">
                    <p className="font-bold">Amazing comfort</p>
                    <p className="text-sm text-neutral-500 mt-2">"The best pair of shoes I've ever owned. The sizing is perfect and the quality is unmatched."</p>
                    <p className="text-[10px] text-neutral-400 uppercase mt-4">John D. • Verified Buyer</p>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
