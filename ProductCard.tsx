import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Product } from '../types';
import { Badge } from '@/components/ui/badge';
import { Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-white"
    >
      <Link to={`/product/${product.id}`} className="block overflow-hidden rounded-xl bg-neutral-100 aspect-square">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <button 
          className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={(e) => {
            e.preventDefault();
            // Handle wishlist
          }}
        >
          <Heart className="h-4 w-4" />
        </button>
      </Link>
      <div className="mt-4 space-y-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm font-medium text-neutral-900 line-clamp-1">
              <Link to={`/product/${product.id}`}>
                {product.name}
              </Link>
            </h3>
            <p className="text-sm text-neutral-500">{product.category}</p>
          </div>
          <p className="text-sm font-semibold text-neutral-900">${product.price}</p>
        </div>
        <div className="flex gap-1 pt-2">
          {product.colors.map((color) => (
            <div 
              key={color}
              className="w-2 h-2 rounded-full border border-neutral-200"
              style={{ backgroundColor: color.toLowerCase() }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};
