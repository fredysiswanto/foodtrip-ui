export interface Restaurant {
  id: number;
  name: string;
  category: string;
  rating: number;
  time: string;
  open: boolean;
  img: string;
  banner: string;
}

export interface Dish {
  id: number;
  restaurantId: number;
  name: string;
  price: number;
  img: string;
  desc: string;
}

export interface CartItem extends Dish {
  quantity: number;
  restaurant: string; // nama restoran
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: string;
  date: string;
  restaurant: string;
}

export interface User {
  name: string;
  avatar: string;
}
