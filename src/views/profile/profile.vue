<template>
  <!--  个人中心-->
  <navigator>我的</navigator>
  <div class="info">

    <img src="@/assets/images/b.png" alt="">

    <div class="desc">
      <span class="name">mike</span>
      <span class="email"><span>123@qq.xxxxxxxxxxx</span></span>
    </div>
  </div>

  <van-cell title="我的收藏" is-link to="collections" />
  <van-cell title="路由跳转" is-link to="index" />
  <van-cell title="路由跳转" is-link to="index" />
  <van-cell title="路由跳转" is-link to="index" />



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
  border: 1px solid rgba(136, 136, 136, .5);
  box-shadow: 2px 2px 11px #888888;
  width: 80vw;
  display: flex;
  height: 25vh;
  margin: 20px auto;
  color: #FFFFFF;
  background: linear-gradient(to top,#8DEBFF,#54E38E);
  img {

    flex: 1 0 0%;
    width: 0px;

  }

  .desc {
    display: flex;
    flex-direction: column;
    flex: 1;

    .name {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
      font-size: 40px;

      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;
    }

    .email {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
      span {
        font-size: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        width:150px;
      }

    }

  }

}
</style>