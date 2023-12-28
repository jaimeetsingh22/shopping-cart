import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    subTotal: 0,
    shipping: 0,
    tax: 0,
    total: 0
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action) {

            const item = action.payload;
            const isItemExist = state.cartItems.find(i => i.id === item.id);
            if (isItemExist) {
                state.cartItems.forEach(i=>{
                    if(i.id===item.id){
                        i.quantity += 1; // yaha hum quantity me 1 isliye plus kar rhe kyuki hum apne item default quantity:1 bheje and har bar click karne par 1 quantity badha rahe hai
                    }
                })
            }else{
                state.cartItems.push(item);
            }
        },

        decreament(state, action){
            const item = action.payload;
            const isItemExist = state.cartItems.find(i => i.id === item.id);
            if (isItemExist) {
                state.cartItems.forEach(i=>{
                    if(i.id===item.id){
                        if(i.quantity>1){
                            i.quantity -= 1; // yaha hum quantity me 1 isliye plus kar rhe kyuki hum apne item default quantity:1 bheje and har bar click karne par 1 quantity badha rahe hai
                        }
                    }
                })
            }
        },

        deleteCartItem(state,action){
           state.cartItems = state.cartItems.filter((i)=> i.id !== action.payload);
        },

        calculatePrice(state) {
            let sum=0;
            state.cartItems.forEach((i)=>{
                sum = i.price > 0 ?  sum + i.price  * i.quantity : 0;
                state.subTotal = sum;
                state.shipping = state.subTotal > 1000 ? 0 : 200;
                state.tax = +(state.subTotal * 0.18).toFixed();
                state.total = state.subTotal + state.tax + state.shipping;
            })
        },
        setTotalzero(state){
            if( state.cartItems.length < 1){
                state.subTotal = 0;
                state.shipping = 0;
                state.tax = 0;
                state.total = state.subTotal + state.tax + state.shipping;
            }
        }
    }
})

export const {addToCart,decreament, deleteCartItem, calculatePrice , setTotalzero} = cartSlice.actions;

export default cartSlice.reducer
