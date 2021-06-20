<template>

  <router-view></router-view>
  <div class="nav">

    <router-link to="/" class="item">
      <i class="iconfont icon-shouye"></i>
      <div>
        首页
      </div>

    </router-link>

    <router-link to="/category" class="item">
      <i class="iconfont icon-fenlei"></i>
      <div>分类</div>
    </router-link>


    <router-link to="/shopcart" class="item">
      <i class="iconfont icon-biaoqianA01_gouwuche-59"></i>
      <div>购物车</div>
    </router-link>


    <router-link to="/profile" class="item">
      <i class="iconfont icon-wode"></i>
      <div>我的</div>
    </router-link>

  </div>
</template>

<script>
import 'assets/css/base.css';
import "assets/iconfont/iconfont.css";
import home from 'views/home/home.vue';
import shopcart from 'views/shopcart/shopcart.vue';
import category from 'views/category/category.vue';
import profile from 'views/profile/profile.vue';

export default {
  components: {home, profile, shopcart, category}
}


</script>

<style scoped lang="scss">


.nav {
  width: 100%;
  .router-link-exact-active {

    color: var(--color-high-text);
  }
;
  font: var(--color-text) var(--font-size);
  text-align: center;
  display: flex;
  position: fixed;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background-color: #F6F6F6;
  box-shadow: 0 -3px 6px rgb(136 136 136 / 26%);

  .item {

    flex: 1;
    display: block;

    i {
      font-size: 25px;
    }

    div {
      margin-bottom: 10px;
    }

  }

  i {
    size: 18px;
    margin: 3px;
    display: block;
  }
}

</style>