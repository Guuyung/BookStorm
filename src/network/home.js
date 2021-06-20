import {request} from './request';

export function getHomeData()
{
    return request({
        url: '/api/index',
        // param
    });
}

export function getGoodsList(page=1,type='sales')
{
    return request({
        url: `/api/index?page=${page}&${type}=1`
    })
}

