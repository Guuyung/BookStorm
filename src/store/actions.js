import {getCart} from "@/network/shopCart";
let actions={
    //获取购物车商品种类,小图标数字
    updateShopCartType({commit})
    {
        getCart().then(res=>{
            commit('addShopCart',res.data.length||0);

        })
    }

}
export default  actions


