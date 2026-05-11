import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ShoeViewer } from '../components/ShoeViewer';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';
import { ArrowRight, Play, ChevronRight, Sparkles, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getRecommendations } from '../services/geminiService';

export const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [pref, setPref] = useState('');
  const [recommendation, setRecommendation] = useState<{suggestion: string, reason: string} | null>(null);
  const [loadingRec, setLoadingRec] = useState(false);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data.slice(0, 3)));
  }, []);

  const handleRecommend = async () => {
    if (!pref) return;
    setLoadingRec(true);
    const res = await getRecommendations(pref);
    setRecommendation(res);
    setLoadingRec(false);
  };

  return (
    <div className="pt-16 overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex flex-col lg:flex-row items-center justify-center max-w-7xl mx-auto px-4 gap-12">
        <div className="flex-1 space-y-8 z-10 text-center lg:text-left">
          <div className="space-y-4">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-sm font-bold uppercase tracking-[0.3em] text-neutral-400"
            >
              Innovation in Every Step
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-black uppercase leading-[0.85] tracking-tighter"
            >
              WIN THE <br /> <span className="text-neutral-400">NEXT ERA</span>
            </motion.h1>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
          >
            <Link to="/products">
              <Button size="lg" className="rounded-full px-8 h-14 text-lg bg-black hover:bg-neutral-800 text-white border-none">
                Shop the Collection
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="rounded-full px-8 h-14 text-lg border-neutral-200 hover:bg-neutral-50">
              <Play className="mr-2 h-5 w-5 fill-current" /> Watch Film
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 relative w-full aspect-square max-w-[600px]"
        >
          <ShoeViewer url="https://raw.githubusercontent.com/pmndrs/drei-assets/master/shoe.glb" />
          <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-2xl border border-neutral-100 hidden md:block">
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">Featured Model</p>
            <p className="text-xl font-black">AIR MAX 270</p>
            <p className="text-neutral-500 text-sm mt-2 max-w-[200px]">Advanced cushioning for maximum impact protection.</p>
          </div>
        </motion.div>
      </section>

      {/* Discovery Assist */}
      <section className="bg-neutral-50 py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-6 w-6 text-neutral-800" />
            <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-neutral-500">Discovery Assist</h2>
          </div>
          <h3 className="text-4xl font-black uppercase tracking-tighter mb-8">Not sure what you're looking for?</h3>
          <p className="text-neutral-500 mb-12">Tell our AI what you need — from marathon training to weekend styling.</p>
          
          <div className="relative max-w-xl mx-auto">
            <Input 
              value={pref}
              onChange={(e) => setPref(e.target.value)}
              placeholder="e.g. I need something for daily 5km runs on asphalt..."
              className="h-16 rounded-full pl-8 pr-20 bg-white border-2 border-neutral-100 focus:border-black transition-all text-lg shadow-sm"
              onKeyDown={(e) => e.key === 'Enter' && handleRecommend()}
            />
            <Button 
              onClick={handleRecommend}
              disabled={loadingRec || !pref}
              className="absolute right-2 top-2 h-12 w-12 rounded-full bg-black hover:bg-neutral-800 text-white p-0"
            >
              {loadingRec ? (
                <div className="h-4 w-4 border-2 border-white rounded-full border-t-transparent animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </div>

          <AnimatePresence>
            {recommendation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-12 p-8 bg-white rounded-3xl shadow-xl border border-neutral-100 text-left"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-neutral-900 rounded-2xl">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">Our Recommendation</p>
                      <h4 className="text-2xl font-black uppercase tracking-tight">{recommendation.suggestion}</h4>
                    </div>
                    <p className="text-neutral-500 leading-relaxed">{recommendation.reason}</p>
                    <Link to={recommendation.suggestion.toLowerCase().includes('running') ? '/products?category=Running' : '/products'}>
                      <Button variant="link" className="p-0 h-auto font-bold uppercase tracking-widest text-xs group">
                        Browse this category <ChevronRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Featured Products */}

      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tighter">New Arrivals</h2>
            <p className="text-neutral-500 mt-2">The latest and greatest from Nike innovation.</p>
          </div>
          <Link to="/products" className="flex items-center gap-2 font-bold hover:gap-3 transition-all">
            See All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Category Grid */}
      <section className="bg-neutral-900 py-24 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-tight">
                Crafted for <br /> <span className="text-neutral-600">Performance</span>
              </h2>
              <p className="text-neutral-400 text-lg max-w-md">
                Every detail is engineered to help you reach your peak. From the track to the street, Nike delivers unmatched innovation.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="rounded-full bg-white text-black hover:bg-neutral-200">Shop Running</Button>
                <Button variant="outline" className="rounded-full border-neutral-700 hover:bg-neutral-800">Shop Lifestyle</Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[3/4] bg-neutral-800 rounded-3xl overflow-hidden group">
                <img src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="aspect-[3/4] bg-neutral-800 rounded-3xl overflow-hidden group translate-y-12">
                <img src="https://images.unsplash.com/photo-1552346154-21d328109a27?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
