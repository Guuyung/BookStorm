<template>
<!--  个人中心-->
  <navigator>我的</navigator>


    <van-button round type="default" block style="background-color:#42b983;color: white; margin:50px auto;width: 50%;
   ;" @click="gologout">退出</van-button>


</template>

<script>
import Navigator from "@/components/common/navigator";
import {logout} from "@/network/profile";
import {Notify} from "vant";
import {useRouter} from "vue-router";
import {useStore} from "vuex";

export default {
  components: {Navigator},
  setup()
  {
    const store=useStore();
    const router=useRouter();
    const gologout=()=>{
      logout().then(res=>{
       if(res&&res.status=='204')
       {
         window.localStorage.setItem('cookie','');
         Notify({message: '登出成功', type: 'success'});
         store.commit('changeLogin',false);
         store.commit('addShopCart',0);
         setTimeout(() => {
           router.push('/login');
         }, 500);
       }
       else {
         Notify({message: '请先登录', type: 'warning'})
         setTimeout(() => {
           router.push('/login');
         }, 500);
       }

      })
    }


    return {
      gologout
    }
  }


}
</script>

<style scoped>

</style>