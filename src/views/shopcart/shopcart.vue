<template>

  <navigator>购物车 ( <span style="color: white;"> {{ $store.state.shopCart.type }} </span> )
  </navigator>

  <!--      购物车为空提示-->
  <div v-if="$store.state.shopCart.type==0" style="background: #FFFFFF;">
    <img src="@/assets/images/emptyShopCart.jpg" style="width: 100%;height: auto">
    <p style="color:#42b983;font-size: 30px;text-align: center;background: #FFFFFF;line-height: 20px">购物车空空的...</p>
    <van-button round style="color:#FFFFFF;font-size: 18px;
   background: var(--color-strong);
   position: absolute;bottom: 200px;
   width: 50%;
   left: 25%;
   "
                @click="$router.push('/home')"
    >去随便看看吧
    </van-button>
  </div>


  <van-checkbox-group v-model="result" ref="checkboxGroup" checked-color="#42b983" @change="onCheck">


    <div v-for="book in shopCart" style="position:relative;">

      <van-checkbox :name="book.id">
        <van-swipe-cell>
          <img :src="book.goods.cover_url" alt="">

          <!--      计数器-->
          <h3 class="title">{{ book.goods.title }}</h3>
          <span class="desc">{{ book.goods.description }}</span>
          <span class="price">￥ {{ book.goods.price }}</span>
          <span class="num">库存 ： {{ book.goods.stock }}</span>

          <van-stepper :id="book.id" v-model="book.num" :min="1" :max="book.goods.stock"
                       disable-input @click.stop="onChange"/>
          <template #right>
            <van-button square text="删除" type="danger" class="delete-button" @click="deleteItem(book.id)"/>
          </template>
        </van-swipe-cell>

      </van-checkbox>

    </div>


  </van-checkbox-group>


  <!--防止显示不完全-->
  <div class="padding" style="height: 50px;width: 100%;background: #FFFFFF"></div>

  <template v-if="shopCart.length!=0">
    <van-checkbox v-model="selectAll" class="all" @click="changeAll" checked-color="#42b983"
    >全选
    </van-checkbox>
    <van-submit-bar :price="total" button-text="提交订单"
                    @submit="onSubmit"/>
  </template>

</template>

<script>
import Navigator from "@/components/common/navigator";
import {Toast} from "vant";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import scroll from '@/components/common/scroll'
import {computed, ref, watch} from "vue";
import {checkCart, delCart, getCart, modifyCart} from "@/network/shopCart";
import {debounce} from "@/utils/debounce";

export default {
  components: {Navigator, scroll},
  setup() {
    let selectAll = ref(false)

    const checkboxGroup = ref(null);
    const result = ref([]);   //购物车的选中状态，哪个物品选中了就放入它的id
    const router = useRouter();
    const store = useStore();
    let shopCart = ref([]);

    let total = computed(() => {
      let sum = 0;

      shopCart.value.filter(item => result.value.includes(item.id))
          .map(e => {

            let num = e.goods.num;
            let pr = e.goods.price;


            sum += parseInt(e.num) * parseFloat(e.goods.price);
          });

      sum *= 100;
      return sum;
    })


    const onCheck = (r) => {
      //会自动传入勾选的数组
      if (shopCart.value.length != result.value.length) {
        selectAll.value = false;
      } else
        selectAll.value = true;
    };

    const checkPrimary = () => {
      checkCart({cart_ids: result.value})
    };

    const check = debounce(checkPrimary, 200);


    watch(result, () => {
      check();
    })

    const changeAll = () => {

      //点击后，触发@click事件，组件内部改变双向绑定的值，调用@change回调

      if (!selectAll.value) {
        result.value = [];
        selectAll.value = false;
      } else {
        checkboxGroup.value.toggleAll(true);
        selectAll.value = true;
      }


    }

    const init = () => {

      Toast.loading({message: '加载中...', duration: 0, forbidClick: true});
      store.dispatch('updateShopCartType');
      getCart('goods').then(res => {

        console.log(res)
        shopCart.value = res.data;

        //进入页面时，将被选中的id放入result中，自动勾上
        result.value = res.data.filter(n => n.is_checked == 1).map(n => n.id);
        //初始化全选按钮
        if (result.value.length == shopCart.value.length)
          selectAll.value = true;
        Toast.clear();
      })
    }

    init();

    const onChangePrimary = (e) => {
      let ele = document.elementFromPoint(e.pageX, e.pageY);
      let id = ele.parentNode.id;
      let num = ele.parentNode.children[1].ariaValueNow;

      modifyCart(id, {num}).then(res => {
        if (res.status == '204') {
          shopCart.value.forEach(item => {
            //本地也需要改变数量以便后续计算价格
            //经验,忘记改变本地数据
            if (item.id == id) {
              item.num = num;
            }
          })
        }

      })

    }

    const onChange = debounce(onChangePrimary, 200);

    const deleteItem = id => {
      Toast.loading({message: '正在删除商品...', duration: 0, forbidClick: true});
      delCart(id).then(res => {

        store.dispatch('updateShopCartType');
        init();
        Toast.clear();
      })

    }

    const onSubmit = () => {
      if (result.value.length == 0) {
        Toast.fail('您还未选中任何商品哦...');
        return;
      }


      router.push('/orderpreview');

    }
    return {
      onSubmit,
      shopCart,
      result,
      selectAll,
      onChange,
      onCheck,
      changeAll,
      checkboxGroup,
      deleteItem,
      total
    }
  }
}
</script>

<style scoped lang="scss">


.van-swipe-cell {
  background-color: #FFFFFF !important;

  img {
    //width: 30%;
    height: 15vh;
  }

  .title {
    display: inline-block;
    position: absolute;
    top: 10px;
    background-color: #FFFFFF !important;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 70%;
  }

  .num {
    position: absolute;
    right: 10px;
    bottom: 35px;
    font-size: 14px;
    background-color: #FFFFFF !important;
  }

  .desc {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 70%;
    color: #888888;
    font-size: 15px;
    position: absolute;
    top: 35px;
    background-color: #FFFFFF !important;
  }

  .price {
    color: #42b983;
    background-color: #FFFFFF !important;
    bottom: 5px;
    position: absolute;
  }


}

.van-checkbox {
  background: white;
}

.delete-button {
  height: 100%;
}

.van-stepper {
  position: absolute;
  bottom: 5px;
  right: 5px;
}

.all {
  position: fixed;
  bottom: 75px;
  left: 5px;
  z-index: 2;

}

.van-submit-bar {
  position: fixed;
  bottom: 62px;
  right: 0px;
  z-index: 1;
  background-color: WhiteSmoke;

}


</style>