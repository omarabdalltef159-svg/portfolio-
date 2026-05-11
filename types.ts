export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  colors: string[];
  sizes: number[];
  modelUrl?: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: number;
  selectedColor: string;
}
