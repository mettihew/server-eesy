import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/user/userSlice.js";
import productSlice from "../features/product/productSlice.js";
import orderSlice from "../features/order/orderSlice.js";

const store = configureStore({
  reducer: {
    user: userSlice,
    product: productSlice,
    order: orderSlice,
  },
});

export default store;


// import { configureStore } from '@reduxjs/toolkit'
// import productSlice from '../Slices/productSlice';
// import userSlice from '../Slices/userSlice';

// export const store = configureStore({
//   reducer: {
//     product: productSlice,
//     user: userSlice,
//   }
// })

// export default store;
