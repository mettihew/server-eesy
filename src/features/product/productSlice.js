import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import { URL  } from '../../utils/URL'
import { toast } from 'react-toastify'

// export const searchS = createAsyncThunk('search', async(query, thunk) => {
//   try {
//     const res = await axios.post(`${URL}/product/s${query}`)
//     return res.data
//   } catch (error) {
//     // thunk.rejectWithValue(error)
// throw new Error(error)
//   }
// })

export const getProducts = createAsyncThunk('get-products', async( thunk) => {
  try {
    const res = await axios.get(`${URL}/product/get`)
    return res.data
  } catch (error) {
    thunk.rejectWithValue(error)
  }
})

export const getCategory = createAsyncThunk('get-products-by-category', async(cat, thunk) => {
  try {
    const res = await axios.post(`${URL}/product/category${cat}`)
    return res.data
  } catch (error) {
    thunk.rejectWithValue(error)
  }
})

export const getAProduct = createAsyncThunk('get-a-product', async(id, thunk) => {
  try {
    const res = await axios.post(`${URL}/product/get-one/${id}`)
    return res.data
  } catch (error) {
    thunk.rejectWithValue(error)
  }
})

export const addAProduct = createAsyncThunk('add-a-product', async(data, thunk) => {
  try {
    const res = await axios.post(`${URL}/product/add`, data)
    return res.data
  } catch (error) {
    thunk.rejectWithValue(error)
  }
})

export const getFavorites = createAsyncThunk('get-favorites', async(fav, thunk) => {
  try {
    const res = await axios.post(`${URL}/product/get-favorites`, fav)
    return res.data
  } catch (error) {
    thunk.rejectWithValue(error)
  }
})

export const reviewRating = createAsyncThunk('review-rating', async(data, thunk) => {
  try {
    const res = await axios.post(`${URL}/product/review`,data)
    return res.data
  } catch (error) {
    thunk.rejectWithValue(error)
  }
})

export const getUserCartProducts = createAsyncThunk('get-user-cart', async(fav, thunk) => {
  try {
    const res = await axios.post(`${URL}/product/get-user-cart`, fav)
    return res.data
  } catch (error) {
    thunk.rejectWithValue(error)
  }
})



// export const getCart = () => {}
// export const deleteFromCart = () => {}


const initialState = {
  count: 0,
  product: false,
  products: null,
  error: null,
  message: '',
  isLoading: false, 
  isSuccess: false,
  isError: false,
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  extraReducers: (builder) =>{
  builder


  // .addCase(searchS.pending ,state => {
  //   state.isLoading= true;
  // })
  // .addCase(searchS.fulfilled ,(state, action) => {
  //   state.isLoading= false;
  //   state.isError = false;
  //   state.isSuccess= true;
  //   state.products = action.payload
  // })
  // .addCase(searchS.rejected ,state => {
  //  state.isLoading= false;
  //  state.isSuccess= false;
  //  state.isError= true;
  //  state.error = true
  // })

 

    .addCase(getProducts.pending ,state => {
      state.isLoading= true;
    })
    .addCase(getProducts.fulfilled ,(state, action) => {
      state.isLoading= false;
      state.isError = false;
      state.isSuccess= true;
      state.products = action.payload
    })
    .addCase(getProducts.rejected ,state => {
     state.isLoading= false;
     state.isSuccess= false;
     state.isError= true;
    })


    .addCase(getCategory.pending ,state => {
      state.isLoading= true;
    })
    .addCase(getCategory.fulfilled ,(state, action) => {
      state.isLoading= false;
      state.isError = false;
      state.isSuccess= true;
      state.products = action.payload.get
      state.count = action.payload.countDocuments
    })
    .addCase(getCategory.rejected ,state => {
     state.isLoading= false;
     state.isSuccess= false;
     state.isError= true;
    })




    .addCase(getAProduct.pending ,state => {
      state.isLoading= true;
    })
    .addCase(getAProduct.fulfilled ,(state, action) => {
      state.isLoading= false;
      state.isError = false;
      state.isSuccess= true;
      state.product = action.payload
    })
    .addCase(getAProduct.rejected ,state => {
     state.isLoading= false;
     state.isSuccess= false;
     state.isError= true;
    })


    .addCase(getFavorites.pending ,state => {
      state.isLoading= true;
    })
    .addCase(getFavorites.fulfilled ,(state, action) => {
      state.isLoading= false;
      state.isError = false;
      state.isSuccess= true;
      state.products = action.payload
    })
    .addCase(getFavorites.rejected ,state => {
     state.isLoading= false;
     state.isSuccess= false;
     state.isError= true;
    })


    .addCase(reviewRating.pending ,state => {
      state.isLoading= true;
    })
    .addCase(reviewRating.fulfilled ,(state, action) => {
      state.isLoading= false;
      state.isError = false;
      state.isSuccess= true;
      toast.success("نظر شما ثبت گردید")
    })
    .addCase(reviewRating.rejected ,state => {
     state.isLoading= false;
     state.isSuccess= false;
     state.isError= true;
     state.message = 'به نظز میرسد به این محصول رای داده اید'
     toast.error("ه نظز میرسد به این محصول رای داده اید")
    })


    .addCase(getUserCartProducts.pending ,state => {
      state.isLoading= true;
    })
    .addCase(getUserCartProducts.fulfilled ,(state, action) => {
      state.isLoading= false;
      state.isError = false;
      state.isSuccess= true;
      state.products = action.payload
    })
    .addCase(getUserCartProducts.rejected ,state => {
     state.isLoading= false;
     state.isSuccess= false;
     state.isError= true;
    })






  }
})
export default productSlice.reducer