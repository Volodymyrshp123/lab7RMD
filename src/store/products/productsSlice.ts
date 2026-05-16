import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface ProductsState {
  items: Product[];
}

const initialState: ProductsState = {
  items: [
    {
      id: '1',
      name: 'iPhone 15 Pro',
      description: 'The latest flagship from Apple.',
      price: 999,
      image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: '2',
      name: 'Samsung Galaxy S24',
      description: 'The latest flagship from Samsung.',
      price: 899,
      image: 'https://images.unsplash.com/photo-1708649290066-5f617003b93f?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: '3',
      name: 'MacBook Air M3',
      description: 'Lightweight and powerful laptop.',
      price: 1099,
      image: 'https://images.unsplash.com/photo-1517336714467-d13a63b49983?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: '4',
      name: 'Sony WH-1000XM5',
      description: 'Industry-leading noise canceling headphones.',
      price: 349,
      image: 'https://images.unsplash.com/photo-1675243015488-84227926e84d?auto=format&fit=crop&q=80&w=400',
    },
  ],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // We can add reducers if we want to fetch products from API
  },
});

export default productsSlice.reducer;
