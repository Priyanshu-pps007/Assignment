import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import * as api from '../api'

const handleApiError = (error) => {
  let errorMessage = "An unexpected error occurred.";
  if (error.response) {
    switch (error.response.status) {
      case 400:
        errorMessage = "Some Error Occurred";
        break;
      case 401:
        errorMessage = "Please Login Again";
        break;
      case 404:
        errorMessage = "Not Found";
        break;
      case 422:
        errorMessage = "Data is Invalid";
        break;
      case 500:
        errorMessage = "Please Check Your Internet Connection";
        break;
    }
  } else if (error.request) {
    errorMessage = "Network Error";
  } else {
    errorMessage = error.message;
  }
  console.error("API Error:", errorMessage, error);
  return { message: errorMessage, originalError: error };
};

export const resetError = createAsyncThunk("/resetError", async (formData, { rejectWithValue }) => {
  try {
    const obj={
      result:"Buy was reset"
    }
    return obj;
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});
export const loginThunk = createAsyncThunk("/logIn", async ({ formData, router }, { rejectWithValue }) => {
  try {
    const res = await api.logIn(formData);
    console.log(res);
    return res.data;
  } catch (error) {
    if (error.response?.status === 404) {
      router.push(`/register`);
    }
    return rejectWithValue(handleApiError(error));
  }
});

export const signupThunk = createAsyncThunk("/signup", async ({ formData, router }, { rejectWithValue }) => {
  try {
    const res = await api.signUp(formData);
    console.log(res);
    if (res.status === 201) router.push('/');
    return res.data;
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});

export const getUserDetails = createAsyncThunk("/getUserDetails", async (formData, { rejectWithValue }) => {
  try {
    const res = await api.getUserDetails(formData);
    return res.data;
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});

export const resetBuy = createAsyncThunk("/resetBuy", async (formData, { rejectWithValue }) => {
  try {
    const obj={
      result:"Buy was reset"
    }
    return obj;
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});

export const getItems = createAsyncThunk("/getItems", async (_, { rejectWithValue }) => {
  try {
    const res = await api.getItems();
    console.log(res?.data?.result?.data);
    return res?.data?.result?.data;
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});

export const individualdetails = createAsyncThunk("/particularprod", async (formData, { rejectWithValue }) => {
  try {
    const res = await api.particularprod(formData);
    console.log(res?.data?.result?.data);
    return res?.data?.result?.data;
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});


// export const placeorder = createAsyncThunk("/placeorder", async (formData, { rejectWithValue }) => {
//   try {
//     const res = await api.placeorder(formData);
//     console.log(res);
//     return res?.data?.result;
//   } catch (error) {
//     return rejectWithValue(handleApiError(error));
//   }
// });


export const orderslistThunk = createAsyncThunk("/orderslist", async (formData, { rejectWithValue }) => {
  try {
    const res = await api.orderslist(formData);
    console.log(res);
    return res?.data;
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});

export const orderInfoThunk = createAsyncThunk("/orderinfo", async (formData, { rejectWithValue }) => {
  try {
    const res = await api.orderinfo(formData);
    console.log(res);
    return res?.data;
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});

export const userInfoThunk = createAsyncThunk("/userinfo", async (formData, { rejectWithValue }) => {
  try {
    const res = await api.getUserDetails(formData);
    console.log(res);
    return res?.data;
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});

export const addtocart = createAsyncThunk("/addtocart", async (formData, { rejectWithValue }) => {
  try {
    const res = await api.addtocart(formData);
    console.log(res);
    return res.data;
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});

//changes can be made
export const delfromcart = createAsyncThunk("/delfromcart", async (formData, { rejectWithValue }) => {
  try {
    const res = await api.delfromcart(formData);
    console.log(res);
    return res;
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});
export const getcart = createAsyncThunk("/getcart", async (formData, { rejectWithValue }) => {
  try {
    const res = await api.getcart(formData);
    console.log(res);
    return res?.data;
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});

export const updateQuantity = createAsyncThunk("/uptcrt", async (formData, { rejectWithValue }) => {
  try {
    const res = await api.updateCart(formData);
    console.log(res);
    return res?.data?.data;
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});
const userSlice = createSlice({
  name: "user",
  initialState: {
    status: 'idle',
    statusCode: null,
    error: null,
    itemsBuy:[],
    loginstate: false,
    itemlist: [],
    cartItems: [],
    particularItem: "",
    loading: false,
    userInfo: {},
    orders: [],
    order: {},
    user: {},
    

  },
  reducers: {
  
    clearCart: (state) => {
      state.cartItems = [];
    }, 
    setCheckout:(state, action)=>{
      console.log(action.payload)
      state.itemsBuy = action.payload
    }

  },
  extraReducers: (builder) => {
    builder
      //user login
      .addCase(loginThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loginstate = true;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action;
      })

     //reset error
     .addCase(resetError.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(resetError.fulfilled, (state, action) => {
      state.error = null;
    })
    .addCase(resetError.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action;
    })
     
      //after signup
      .addCase(signupThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signupThunk.fulfilled, (state, action) => {
        state.loginstate = true;
      })
      .addCase(signupThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action;
      })
      .addCase(addtocart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addtocart.fulfilled, (state, action) => {
        state.status='fulfilled';    
        state.cartItems = action.payload; 
      })
      .addCase(addtocart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action;
      })
      //get products inside cart

      .addCase(getcart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getcart.fulfilled, (state, action) => {
        state.cartItems=action.payload;
        state.status='fulfilled';    
        })
      .addCase(getcart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action;
      })
      //getting user details
      .addCase(getUserDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.loginstate = true;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action;
      })


      //upadating user details



     


      //buymetal logic
      .addCase(getItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getItems.fulfilled, (state, action) => {
        state.itemlist = action.payload;
      })
      .addCase(getItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action;
      })
      .addCase(individualdetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(individualdetails.fulfilled, (state, action) => {
        state.particularItem = action.payload;
      })
      .addCase(individualdetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action;
      })
      // .addCase(placeorder.pending, (state) => {
      //   state.status = 'loading';
      // })
      // .addCase(placeorder.fulfilled, (state, action) => {
      //   state.orderResponse = action.payload;
      //   console.log(action.payload);
      // })
      // .addCase(placeorder.rejected, (state, action) => {
      //   state.status = 'failed';
      //   state.error = action;
      // })
      


      //user buy list
      
      .addCase(orderslistThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(orderslistThunk.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(orderslistThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action;
      })

      //getting info of order

      .addCase(orderInfoThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(orderInfoThunk.fulfilled, (state, action) => {
        state.order = action.payload;
      })
      .addCase(orderInfoThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action;
      })

      //getting user profile
      .addCase(userInfoThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(userInfoThunk.fulfilled, (state, action) => {
        state.order = action.payload;
      })
      .addCase(userInfoThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action;
      })

        }
})
export const {clearCart, setCheckout} = userSlice.actions
export default userSlice.reducer;
