import {request} from "@/network/request";
export function doCollect(id)
{
    return  request({
        url: `/api/collects/goods/${id}`,
        method:'post'
})
}

export function getCollections(page='1')
{
    return  request({
        url: `/api/collects?page=${page}`,
})
}




