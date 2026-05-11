import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock login
    setTimeout(() => {
      navigate('/');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="pt-24 min-h-screen flex items-center justify-center px-4 bg-neutral-50">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white p-12 rounded-3xl shadow-xl shadow-black/5"
      >
        <div className="text-center mb-10">
          <svg className="mx-auto mb-6" height="24" width="80" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 8.719L7.836 14.303C6.74 14.768 5.818 15 5.075 15c-.836 0-1.445-.295-1.819-.884-.485-.738-.273-1.93.635-3.571.115-.209.222-.418.33-.628l-.01.008C3.89 10.51 3.55 11.23 3.393 11.96c-.183.857.03 1.543.642 2.054.496.416 1.181.621 2.047.621 1.099 0 2.457-.403 4.056-1.205L21 8.719z" />
          </svg>
          <h1 className="text-3xl font-black uppercase tracking-tighter">Your Nike Account</h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Email address</label>
            <Input type="email" required className="h-12 rounded-lg border-neutral-200 focus:border-black transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Password</label>
            <Input type="password" required className="h-12 rounded-lg border-neutral-200 focus:border-black transition-all" />
          </div>
          
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-neutral-500 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-neutral-300 text-black focus:ring-black" />
              Keep me signed in
            </label>
            <button type="button" className="text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-black">Forgot password?</button>
          </div>

          <Button 
            disabled={loading}
            className="w-full h-14 rounded-full bg-black text-white hover:bg-neutral-800 text-sm font-bold uppercase tracking-widest mt-4"
          >
            {loading ? "Logging in..." : "Sign In"}
          </Button>

          <p className="text-center text-sm text-neutral-500 pt-4">
            Not a member? <button className="font-bold text-black border-b border-black">Join Us.</button>
          </p>
        </form>
      </motion.div>
    </div>
  );
};
