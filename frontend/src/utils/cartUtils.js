//function to round off the decimal numbers to 2 decimal places
export const addDecimals=(num)=>{
    return (Math.round(num*100)/100).toFixed(2);
}

export  const updateCart=(state)=>{
    //calculate the items PRICE
    state.itemsPrice=addDecimals(state.cartItems.reduce((acc,item)=>
        acc+item.price*item.qty,0));

    //calculate the shipping PRICE
    state.shippingPrice=addDecimals(state.itemsPrice>100?0:10);

    //calculate the TAX PRICE
    state.taxPrice=addDecimals(Number((0.15*state.itemsPrice).toFixed(2)));
    
    //calculate the TOTAL PRICE
    state.totalPrice=(
        Number(state.itemsPrice)+
        Number(state.shippingPrice)+
        Number(state.taxPrice)
    ).toFixed(2);

    localStorage.setItem('cart',JSON.stringify(state));
}