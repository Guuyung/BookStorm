<template>
  <!--  地址列表-->
  <navigator>地址管理</navigator>
  <van-address-list
      v-model="defaultId"
      :list="list"
      default-tag-text="默认"
      @add="$router.push({name:'address',query:{type:'add'}})"
      @edit="onEdit"
      @select="select"
      style="font-size: 18px"
  >
    <!--  <div style="width: 100%;height: 50px"></div>-->

  </van-address-list>

</template>

<script>
import {ref} from "vue";
import Navigator from "@/components/common/navigator";
import {getAddressList, setDefaultAddress} from "@/network/addressManagement";
import {useRouter} from "vue-router";
import {Toast} from "vant";
import {load, sucLoad} from "@/utils/message";
import {debounce} from "@/utils/debounce";

export default {
  components: {Navigator},
  setup() {
    const router = useRouter();
    let list = ref([]);
    let defaultId = ref(0)
    let add = [];

    const init = () => {
      sucLoad('加载成功')
      getAddressList().then(res => {

            add.value = res.data;
            for (let i = 0; i < res.data.length; i++) {
              list.value[i] = {
                id: res.data[i].id,
                name: res.data[i].name,
                tel: res.data[i].phone,
                address:
                    `${res.data[i].province} ${res.data[i].province == res.data[i].city ? '' : res.data[i].city} ${res.data[i].county}`,
                isDefault: res.data[i].is_default == '1'
              };
              if (list.value[i].isDefault) {
                defaultId.value = res.data[i].id;
              }
            }
            Toast.clear();
        console.log(res)
          }
      )
    }

    init();

    const onEdit = (item) => {
      let query = {};
      add.value.forEach(e => {
        if (e.id == item.id) {
          query = e;
          query.type = 'update';
        }
      })

      router.push({
        name: 'address',
        query: query
      });


    }


    //点击不同的地址后进行默认地址的切换
    const s = (item, index) => {

      load();

      setDefaultAddress(item.id).then(res => {
        if (res.status == '204') {
          Toast.clear();


          Toast.success("更换默认地址成功");

        } else {
          Toast.clear();
          Toast.fail("更换默认地址失败");
        }
        console.log(444)
      })
    }

    const debounce_select = debounce(s, 500)

    const select = (item, index) => {
      if (item.id == defaultId.value)
        return

      list.value.forEach(e => {
        e.isDefault = false
      })
      list.value[index].isDefault = true;
      debounce_select(item, index);


    }

    return {
      onEdit,
      list,
      defaultId
      , select
    }
  }
}
</script>

<style scoped lang="scss">
.van-address-list__bottom {
  bottom: 62px !important;
}
</style>