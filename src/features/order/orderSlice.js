import { orderService } from "./orderService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {toast} from 'react-toastify'


export const order = createAsyncThunk(
  "Product/order",
  async (data, thunk) => {
    try {
      return await orderService.order(data);
    } catch (error) {
      return thunk.rejectWithValue(error);
    }
  }
);

export const getOrder = createAsyncThunk(
  "Product/get-order",
  async (thunk) => {
    try {
      return await orderService.getOrder();
    } catch (error) {
      return thunk.rejectWithValue(error);
    }
  }
);


export const deleteCart = createAsyncThunk(
  "Product/del-cart",
  async (thunk) => {
    try {
      return await orderService.deleteCart();
    } catch (error) {
      return thunk.rejectWithValue(error);
    }
  }
);

const initialState = {
  order: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const orderSlice = createSlice({
  name: "Order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
.addCase(order.pending,(state) => {
  state.isLoading = true;
})
.addCase(order.fulfilled,(state, action) => {
  state.isLoading = false;
  state.isError = false;
  state.isSuccess = true;
  state.order = action.payload
  toast.success("Congragulation")
})
.addCase(order.rejected,(state, action) =>{
  state.isLoading = false;
  state.isSuccess = false;
  state.isError = true;
  state.message = action.error
})

.addCase(getOrder.pending,(state) => {
  state.isLoading = true;
})
.addCase(getOrder.fulfilled,(state, action) => {
  state.isLoading = false;
  state.isError = false;
  state.isSuccess = true;
  state.order = action.payload
})
.addCase(getOrder.rejected,(state, action) =>{
  state.isLoading = false;
  state.isSuccess = false;
  state.isError = true;
  state.message = action.error
})

.addCase(deleteCart.pending,(state) => {
  state.isLoading = true;
})
.addCase(deleteCart.fulfilled,(state, action) => {
  state.isLoading = false;
  state.isError = false;
  state.isSuccess = true;
  state.order = action.payload
})
.addCase(deleteCart.rejected,(state, action) =>{
  state.isLoading = false;
  state.isSuccess = false;
  state.isError = true;
  state.message = action.error
})

},
});


export default orderSlice.reducer