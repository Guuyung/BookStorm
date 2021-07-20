import axios from 'axios';
import {Notify, Toast} from "vant";
import router from "@/router";

export function request(config){
    const instance=axios.create({
        baseURL: 'https://api.shop.eduwork.cn',
        timeout: 10000
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
        console.log(err.response)

        if(err.response.status_code=='400')
        {
            Toast.fail('订单提交失败，请重新下单')
            return;
        }

        if(err.response&&(!'status' in err.response))
        {
            Toast.clear();
            Toast.fail('网络好像有点问题，刷新看看吧');
            return;
        }
        if(err.response.status=='404')
        {
            router.push('/error');
            return;
        }
        if(err.response.status=='401')
        {
            Notify({message: '您还未登录，请先登录', type: 'warning'});
            router.push('/login');
            return;
        }

            if(err.response.data.errors)
            Notify(err.response.data.errors[Object.keys(err.response.data.errors)[0]][0]);


    })

    return instance(config);
}