import {Toast} from "vant";

//正在加载中,加载关闭后调用加载成功
export function sucLoad(msg = '操作成功') {

    Toast.loading({
        message: '加载中...',
        duration: 0,
        forbidClick: true,
        onClose(){
            Toast.success(msg);
        }
    });

}

export function load()
{
    Toast.loading({
        message: '加载中...',
        duration: 0,
        forbidClick: true,
    });
}
