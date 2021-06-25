import {request} from "@/network/request";

export function getCategory()
{
    return  request({
        url: '/api/goods'
    })
}

export function getCateGoods(type='sales',page=1,cid=0)
{
    return request({
        url:`/api/goods?${type}=1&page=${page}&category_id=${cid}`
    })
}