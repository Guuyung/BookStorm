import {request} from './request';

export function signup(data)
{
    return request({
        url: '/api/auth/register',
        method: 'post',
        data
    });
}

export function login(data)
{
    return request({
        url:'/api/auth/login',
        method:'post',
        data
    })
}
