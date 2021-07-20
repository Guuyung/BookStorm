import {request} from "@/network/request";

export function addAddress(data) {
    return request({
        url: `/api/address`,
        method: 'post',
        data
    })
}

export function getDetailAddress(address) {
    return request({
        url: `/api/address/${address}`,
        method: 'get'
    })
}

export function updateAddress(address,data) {
    return request({
        url: `/api/address/${address}`,
        method: 'put',
        data
    })
}

export function delAddress(id) {
    return request({
        url: `/api/address/${id}`,
        method: 'delete',
    })
}

export function getAddressList() {
    return request({
        url: `/api/address`,
        method: 'get'
    })
}
export function getCity(pid) {
    return request({
        url: `/api/city?pid=${212}`,
        method: 'get',
    })
}
export function setDefaultAddress(id) {
    return request({
        url: `/api/address/${id}/default`,
        method: 'patch',
    })
}


