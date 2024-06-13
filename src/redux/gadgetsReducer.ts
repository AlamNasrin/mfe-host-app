import { CartItem } from "../model/CartItem";
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface GadgetStoreState {
    cart : Array<CartItem>;
}

const initialState: GadgetStoreState={
    cart: []
}

// export const gadgetReducer = (currentState=initialState, action: any)=> {

//     if(action.type === "ADD_TO_CART"){
//         const item = action.payload;
//         const copyOfCart = [...currentState.cart];
//         copyOfCart.push(item);
//         return {...currentState, cart: copyOfCart};

//     }
//     return currentState;
// }

//slices ==> generate action creators and reducers
//slices ==> mutable


const gadgetSlice = createSlice({
    name: 'gadgets',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            state.cart.push(action.payload);
        }

    }
});
//action creators
export const {addToCart} = gadgetSlice.actions;
//reducer
export const gadgetReducer = gadgetSlice.reducer;