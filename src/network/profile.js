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

export function logout()
{
    return request({
        url:'/api/auth/logout',
        method:'post',
    })
}
export function userInfo()
{
    return request({
        url:'/api/user',

    })
}export function goupdateName(data)
{
    return request({
        url:'/api/user',
        method:'put',
        data

    })
}
export function goupdateAva(data)
{
    return request({
        url:'/api/user/avatar',
        method:'patch',
        data

    })
}
