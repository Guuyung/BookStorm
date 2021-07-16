import {request} from "@/network/request";

//添加到购物车
export function addCart(data)
{
    return request({
        url:'/api/carts',
        method:'post',
        data
    })
}

//修改购物车商品数量
export function modifyCart(id,data)
{
    return request({
        url:`/api/carts/${id}`,
        method:'put',
        data
    })
}
//更改商品选中状态
export function checkCart(data)
{
    return request({
        url:`/api/carts/checked`,
        method:'patch',
        data
    })
}
//获取购物车列表
export function getCart()
{
    return request({
        url:`/api/carts`,
    })
}
//删除购物车
export function delCart(cart)
{
    return request({
        url:`/api/carts/${cart}`,
        method:'delete'
    })
}