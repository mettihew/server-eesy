import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL  } from '../../utils/URL'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from "react-toastify";
{/* <ToastContainer />; */}

export const addToUCart = createAsyncThunk('add-to-cart', async(data, thunk) => {
  try {
    const res = await axios.post(`${URL}/user/add-to-cart`, data)
    return res.data
  } catch (error) {
    thunk.rejectWithValue(error)
  }
})

export const getCart = createAsyncThunk('get-user-cart', async(uId, thunk) => {
  try {
    const res = await axios.post(`${URL}/user/cart`, {uId})
    return res.data
  } catch (error) {
    return thunk.rejectWithValue(error)
  }
})
export const register = createAsyncThunk('register', async(data, thunk) => {
  try {
    const res = await axios.post(`${URL}/user/register`, data)
    return res.data
  } catch (error) {
    return thunk.rejectWithValue(error)
  }
})

export const login = createAsyncThunk('login', async(data, thunk) => {
  try {
    const res = await axios.post(`${URL}/user/login`, data)
    return res.data
  } catch (error) {
    return thunk.rejectWithValue(error)
  }
})

export const favoriteS = createAsyncThunk('favorite', async(ids, thunk) => {
  try {
    const res = await axios.post(`${URL}/user/favorite`, ids)
    return res.data
  } catch (error) {
    thunk.rejectWithValue(error)
  }
})



export const deleteFromCart = () => {}



const initialState = {
  user: {},
  isError: false,
  isSuccess: false,
  isLoading: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState, 
  extraReducers: (builder) => {
    builder


     .addCase(register.pending, state => {
      state.isLoading= true
     })
     .addCase(register.fulfilled, (state, action) => {
      state.isLoading= false
      state.isError= false
      state.isSuccess= true
      alert('اکانت با موفقیت ساخته شد')
      
    })
    .addCase(register.rejected, (state, action) => {
      state.isLoading= false
      state.isSuccess= false
      state.isError= true
      alert(action.payload.message)
     })


     .addCase(login.pending, state => {
      state.isLoading= true
     })
     .addCase(login.fulfilled, (state, action) => {
      state.isLoading= false
      state.isError= false
      state.isSuccess= true
      state.user = action.payload
      localStorage.setItem('user', JSON.stringify(action.payload))
      window.location.reload()
    })
    .addCase(login.rejected, (state, action) => {
      state.isLoading= false
      state.isSuccess= false
      state.isError= true
      alert('مشکلی بیش آمده')
     })


     .addCase(favoriteS.pending, state => {
      state.isLoading= true
     })
     .addCase(favoriteS.fulfilled, (state, action) => {
      state.isLoading= false
      state.isError= false
      state.isSuccess= true
      // console.log(action.payload, 'how about?');
      localStorage.setItem('user', JSON.stringify(action.payload))
      window.location.reload()
    })
    .addCase(favoriteS.rejected, (state, action) => {
      state.isLoading= false
      state.isSuccess= false
      state.isError= true
      alert('مشکلی بیش آمده')
     })

     .addCase(addToUCart.pending, state => {
      state.isLoading= true
     })
     .addCase(addToUCart.fulfilled, (state, action) => {
      state.isLoading= false
      state.isError= false
      state.isSuccess= true
      state.user = action.payload
      toast.success("محصول به کارت شما اظافه شد")
    })
    .addCase(addToUCart.rejected, (state, action) => {
      state.isLoading= false
      state.isSuccess= false
      state.isError= true
      alert('somthing went wrong')
     })




     .addCase(getCart.pending, state => {
      state.isLoading= true
     })
     .addCase(getCart.fulfilled, (state, action) => {
      state.isLoading= false
      state.isError= false
      state.isSuccess= true
      state.user = action.payload
    })
    .addCase(getCart.rejected, (state, action) => {
      state.isLoading= false
      state.isSuccess= false
      state.isError= true
      alert('oops')
     })

     




  }
})

export default userSlice.reducer