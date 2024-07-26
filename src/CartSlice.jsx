import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    // Reducer to add an item to the cart
    addItem: (state, action) => {
      const newItem = action.payload;
      // Check if the item already exists in the cart
      const existingItem = state.items.find(item => item.name === newItem.name);

      if (existingItem) {
        // If the item exists, update its quantity
        existingItem.quantity += 1;
      } else {
        // If the item does not exist, add it to the cart with quantity 1
        state.items.push({ ...newItem, quantity: 1 });
      }
    },
    
    // Reducer to remove an item from the cart
    removeItem: (state, action) => {
      const itemName = action.payload;
      // Remove the item with the specified name from the cart
      state.items = state.items.filter(item => item.name !== itemName);
    },

    // Reducer to update the quantity of an item in the cart
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.items.find(item => item.name === name);

      if (item) {
        // Update the item's quantity if it exists
        item.quantity = quantity;

        // Optionally remove the item from cart if quantity is zero
        if (item.quantity <= 0) {
          state.items = state.items.filter(item => item.name !== name);
        }
      }
    },
  },
});

// Export the action creators for use in other components
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Export the reducer to use in store.js
export default CartSlice.reducer;
