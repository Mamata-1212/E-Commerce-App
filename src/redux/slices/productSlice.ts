import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
}

interface ProductsState {
  items: Product[];
  filteredItems: Product[];
}

const initialState: ProductsState = {
  items: [],
  filteredItems: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
      state.filteredItems = action.payload;
    },
    filterProducts: (state, action: PayloadAction<{ category: string; minPrice: number; maxPrice: number }>) => {
      state.filteredItems = state.items.filter(product => 
        (action.payload.category === 'All' || product.category === action.payload.category) &&
        product.price >= action.payload.minPrice &&
        product.price <= action.payload.maxPrice
      );
    },
  },
});

export const { setProducts, filterProducts } = productsSlice.actions;
export default productsSlice.reducer;
