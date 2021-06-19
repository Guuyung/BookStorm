import {request} from './request';

export function getHomeData()
{
    return request({
        url: '/api/index',
        // param
    });
}

