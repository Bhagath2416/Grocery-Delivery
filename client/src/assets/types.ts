

export interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  unit: string;
  category: string;
  stock: number;
  discount: number;
  rating: number;
  reviewCount: number;
  isOrganic: boolean;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}