import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Youtube, Instagram, Copyright } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
          <div className="space-y-4">
            <h3 className="font-black uppercase tracking-tighter text-lg">RESOURCES</h3>
            <ul className="space-y-3">
              <li><Link to="#" className="text-sm font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors">Gift Cards</Link></li>
              <li><Link to="#" className="text-sm font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors">Find a Store</Link></li>
              <li><Link to="#" className="text-sm font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors">Membership</Link></li>
              <li><Link to="#" className="text-sm font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors">Nike Journal</Link></li>
              <li><Link to="#" className="text-sm font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors">Get Help</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-black uppercase tracking-tighter text-lg">HELP</h3>
            <ul className="space-y-3">
              <li><Link to="#" className="text-xs text-neutral-400 hover:text-white transition-colors">Order Status</Link></li>
              <li><Link to="#" className="text-xs text-neutral-400 hover:text-white transition-colors">Shipping & Delivery</Link></li>
              <li><Link to="#" className="text-xs text-neutral-400 hover:text-white transition-colors">Returns</Link></li>
              <li><Link to="#" className="text-xs text-neutral-400 hover:text-white transition-colors">Order Cancellation</Link></li>
              <li><Link to="#" className="text-xs text-neutral-400 hover:text-white transition-colors">Payment Options</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-black uppercase tracking-tighter text-lg">ABOUT NIKE</h3>
            <ul className="space-y-3">
              <li><Link to="#" className="text-xs text-neutral-400 hover:text-white transition-colors">News</Link></li>
              <li><Link to="#" className="text-xs text-neutral-400 hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="#" className="text-xs text-neutral-400 hover:text-white transition-colors">Investors</Link></li>
              <li><Link to="#" className="text-xs text-neutral-400 hover:text-white transition-colors">Sustainability</Link></li>
            </ul>
          </div>

          <div className="flex gap-4">
            <button className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-neutral-700 transition-colors">
              <Twitter className="h-5 w-5" />
            </button>
            <button className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-neutral-700 transition-colors">
              <Facebook className="h-5 w-5" />
            </button>
            <button className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-neutral-700 transition-colors">
              <Youtube className="h-5 w-5" />
            </button>
            <button className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-neutral-700 transition-colors">
              <Instagram className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="pt-12 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Copyright className="h-4 w-4" />
            <span className="text-xs text-neutral-400">2026 Nike, Inc. All Rights Reserved</span>
          </div>
          <div className="flex flex-wrap gap-8 justify-center">
            <Link to="#" className="text-[10px] uppercase font-bold text-neutral-400 hover:text-white transition-colors">Guides</Link>
            <Link to="#" className="text-[10px] uppercase font-bold text-neutral-400 hover:text-white transition-colors">Terms of Sale</Link>
            <Link to="#" className="text-[10px] uppercase font-bold text-neutral-400 hover:text-white transition-colors">Terms of Use</Link>
            <Link to="#" className="text-[10px] uppercase font-bold text-neutral-400 hover:text-white transition-colors">Nike Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
