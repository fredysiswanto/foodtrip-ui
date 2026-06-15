import { Restaurant, Dish } from './types';

export const restaurants: Restaurant[] = [
  {
    id: 1,
    name: 'Warung Nusantara',
    category: 'Indonesian',
    rating: 4.8,
    time: '30 min',
    open: true,
    img: 'https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141352.jpg',
    banner:
      'https://img.freepik.com/free-photo/indonesian-food-nasi-goreng_1203-8764.jpg',
  },
  {
    id: 2,
    name: 'Pizza Italia',
    category: 'Italia',
    rating: 4.5,
    time: '25 min',
    open: true,
    img: 'https://img.freepik.com/free-photo/flat-lay-batch-cooking-composition_23-2148765597.jpg',
    banner:
      'https://img.freepik.com/free-photo/pizza-margherita-wooden-table_140725-8560.jpg',
  },
  {
    id: 3,
    name: 'Burger Bangor',
    category: 'Fast Food',
    rating: 4.3,
    time: '20 min',
    open: false,
    img: 'https://img.freepik.com/free-photo/delicious-burger-isolated-white-background_125540-3368.jpg',
    banner: 'https://img.freepik.com/free-photo/cheeseburger_144627-27364.jpg',
  },
];

export const dishes: Dish[] = [
  {
    id: 1,
    restaurantId: 1,
    name: 'Nasi Goreng Special',
    price: 25000,
    img: 'https://img.freepik.com/free-photo/nasi-goreng-indonesian-food_123827-20571.jpg',
    desc: 'Nasi goreng dengan telur mata sapi',
  },
  {
    id: 2,
    restaurantId: 1,
    name: 'Mie Goreng Jawa',
    price: 22000,
    img: 'https://img.freepik.com/free-photo/indonesian-mie-goreng_1203-9162.jpg',
    desc: 'Mie goreng khas Jawa',
  },
  {
    id: 3,
    restaurantId: 2,
    name: 'Pizza Margherita',
    price: 45000,
    img: 'https://img.freepik.com/free-photo/pizza-pizza-filled-with-tomatoes-salami-olives_140725-1200.jpg',
    desc: 'Pizza klasik tomat dan mozzarella',
  },
  {
    id: 4,
    restaurantId: 3,
    name: 'Cheese Burger',
    price: 35000,
    img: 'https://img.freepik.com/free-photo/burger-with-melted-cheese_144627-27364.jpg',
    desc: 'Burger dengan keju leleh',
  },
];
