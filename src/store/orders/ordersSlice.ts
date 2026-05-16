import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  totalAmount: number;
}

interface OrdersState {
  history: Order[];
}

const initialState: OrdersState = {
  history: [],
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.history.unshift(action.payload);
    },
  },
});

export const { addOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
