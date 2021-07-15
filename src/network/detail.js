import {request} from "@/network/request";

export function getdetail(id)
{
    return  request({
        url: '/api/goods/'+id
    })
}
