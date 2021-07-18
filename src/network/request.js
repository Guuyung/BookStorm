import axios from 'axios';
import {Notify} from "vant";
import router from "@/router";

export function request(config){
    const instance=axios.create({
        baseURL: 'https://api.shop.eduwork.cn',
        timeout: 5000
    })

    instance.interceptors.request.use(config=>{
        //需要认证则在这里拦截
        const cookie=window.localStorage.getItem('cookie')
        //如果用户登录后有cookie，需要在请求时加上头部认证cookie
        if(cookie)
        {
            config.headers.Authorization='Bearer '+cookie;
        }

        return config;
    },rej=>{
        
        return rej;
    });

    instance.interceptors.response.use(res=>{

        return res.data? res.data: res ;
    },err=>{
        //对所有错误进行提示
        // console.log(err.response)
        if(err.response.status=='404')
        {
            router.push('/error')
        }

        if(err.response.status=='401')
        {
            Notify({message: '您还未登录，请先登录', type: 'warning'});
            router.push('/login');
            return;
        }


        if(err.response['data'])
        {
            Notify({message: '邮箱或密码错误', type: 'warning'});
            return;
        }
        else
        {
            Notify(err.response.data.errors[((Object.keys(err.response.data.errors))[0])][0]);
            return;
        }



    })

    return instance(config);
}