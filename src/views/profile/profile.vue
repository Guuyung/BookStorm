<template>
  <!--  个人中心-->
  <navigator>我的</navigator>
  <div class="info">

    <img src="@/assets/images/b.png" alt="">


    <p class="name">用户名: mike</p>
    <p class="email">邮箱: 123@qq.xxxxxxxxxxx</p>

  </div>

  <van-cell title="我的收藏" is-link to="collections"/>
  <van-cell title="我的订单" is-link to="orderlist"/>
  <van-cell title="地址管理" is-link to="addresslist"/>


  <van-button round type="default" block style="background:var(--color-strong);color: white; margin:50px auto;width: 50%;
   ;" @click="gologout">退出登录
  </van-button>


</template>

<script>
import Navigator from "@/components/common/navigator";
import {logout} from "@/network/profile";
import {Notify} from "vant";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {getCity} from "@/network/addressManagement";

export default {
  components: {Navigator},
  setup() {
    const store = useStore();
    const router = useRouter();

    const gologout = () => {
      logout().then(res => {
        if (res && res.status == '204') {
          window.localStorage.setItem('cookie', '');
          Notify({message: '登出成功', type: 'success'});
          store.commit('changeLogin', false);
          store.commit('addShopCart', 0);
          setTimeout(() => {
            router.push('/login');
          }, 500);
        } else {
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

<style scoped lang="scss">
.info {
  overflow: hidden;
  box-shadow: 2px 2px 11px #888888;
  width: 80vw;
  height: 150px;
  margin: 20px auto;
  color: #FFFFFF;
  font-size: 20px;
  text-align: center;

  border-radius: 15px;

  background: linear-gradient(to top, #8DEBFF, #54E38E);

  img {
    display: block;
    border-radius: 50%;
    margin: 15px auto;
    width: 20%;
  }


  .name {
    margin: 0 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .email {
    margin: 3px 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

  }


}
</style>