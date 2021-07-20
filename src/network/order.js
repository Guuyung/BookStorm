import {request} from './request';


//订单预览
export function orderPreview() {
    return request({
        url: `/api/orders/preview`,
    });
}

//提交订单
export function orderPost(data) {
    return request({
        url: `/api/orders`,
        method: 'post',
        data
    });
}

//订单详情，订单支付后的详情
export function orderDetail(order, params) {
    return request({
        url: `/api/orders/${order}`,
        params
    });
}

//订单列表
export function orderList(params) {
    return request({
        url: `/api/orders`,
        params
    });
}

//确认收货
export function orderConfirm(order) {
    return request({
        url: `/api/orders/${order}/confirm`,
        method: 'patch',
    });
}

//评价商品
export function orderComment(order, data) {
    return request({
        url: `/api/orders/${order}/comment`,
        method: '',
        params
    });
}

export function orderPay(order, params) {
    return request({
        url: `/api/orders/${order}/pay`,
        params
    });
}
export function orderQuery(order) {
    return request({
        url: `/api/orders/${order}/status`,
    });
}


