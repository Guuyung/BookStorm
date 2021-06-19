import axios from 'axios';

export function request(config){
    const instance=axios.create({
        baseURL: 'https://api.shop.eduwork.cn',
        timeout: 5000
    })
    instance.getUri
    instance.interceptors.request.use(config=>{
        //需要认证则在这里拦截

        return config;
    },rej=>{
        
        return rej;
    });

    instance.interceptors.response.use(res=>{

        return res.data? res.data: res ;
    },err=>{
        console.log(err);
        return err;
    })

    return instance(config);
}