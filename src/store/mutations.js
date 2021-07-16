let mutations={
    changecurtab(state,cur)
    {
        state.curtab=cur;
    },
    changeLogin(state,payload)
    {
        state.isLogin=payload;
    },
    addShopCart(state,payload)
    {
        state.shopCart.type=payload;
    }
}

export  default mutations;