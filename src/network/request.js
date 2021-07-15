import axios from 'axios';
import {Notify} from "vant";

export function request(config){
    const instance=axios.create({
        baseURL: 'https://api.shop.eduwork.cn',
        timeout: 5000
    })

    instance.interceptors.request.use(config=>{
        //需要认证则在这里拦截

        return config;
    },rej=>{
        
        return rej;
    });

    instance.interceptors.response.use(res=>{

        return res.data? res.data: res ;
    },err=>{
        //对所有错误进行提示


        if(err.response['data'])
        {
            Notify('邮箱或密码错误')
        }else
        Notify(err.response.data.errors[((Object.keys(err.response.data.errors))[0])][0])
    })

    return instance(config);
}