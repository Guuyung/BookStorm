<template>

  <navigator>{{type=='update'?'更新地址':'新增地址'}}</navigator>
  <van-address-edit
      :area-list="areaList"
      show-set-default
      :show-delete="type=='update'"
      :address-info="primaryInfo"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      style="font-size: 14px"
  />


</template>

<script>
import {addAddress, delAddress, getAddressList, updateAddress} from "@/network/addressManagement";
import {areaList} from '@vant/area-data'
import {reactive, ref, toRefs} from "vue";
import Navigator from "@/components/common/navigator";
import {load, sucLoad} from "@/utils/message";
import {Toast} from "vant";
import router from "@/router";
import {useRoute} from "vue-router";

export default {
  components: {Navigator},
  setup() {
    const route = useRoute();
    let type = ref('');
    let primaryInfo = reactive({
      name: '',
      tel: '',
      id: '',
      province: '',
      city: '',
      county: '',
      areaCode: '',
      addressDetail: '',
      isDefault: false
    })

    type.value = route.query.type;


    //如果是更新，进行初始化
    if (type.value == 'update') {

      Object.entries(areaList.county_list).forEach(e => {
        if (e[1] == route.query.county)
          primaryInfo.areaCode = e[0];
      });

      primaryInfo.name=route.query.name;
      primaryInfo.tel=route.query.phone;
      primaryInfo.id=route.query.id;
      primaryInfo.province=route.query.province;
      primaryInfo.county=route.query.county;
      primaryInfo.city=route.query.city;
      primaryInfo.addressDetail=route.query.address;
      primaryInfo.isDefault=route.query.is_default=='1'?true:false;



    }

    const onSave = (i) => {
      //这里默认有问题
      let data = {
        name: i.name,
        address: i.addressDetail,
        phone: i.tel,
        province: i.province,
        city: i.city,
        county: i.county,
      };
      if (i.isDefault == true) {
        data['is_default'] = 1;
      }

      load();

      if(type.value=='add')
      {
        addAddress(data).then(res => {
          Toast.clear();
          if (!res) {
            Toast.fail('新增地址失败')
          }
          if (res && res.status == '201') {
            Toast.success('新增地址成功');
            setTimeout(() => {
              router.push('/addresslist');
            }, 1000);
          }

        })
      }


      if(type.value=='update')
      {
        console.log(data)
        updateAddress(primaryInfo.id,data).then(res=>{
          Toast.clear();
          if (!res) {
            Toast.fail('更新地址失败')
          }
          if (res && res.status == '204') {
            Toast.success('更新地址成功');
            setTimeout(() => {
              router.back();
            }, 1000);
            console.log(res)
            getAddressList().then(res=>{
              console.log(res)
            })
          }

        })

      }
    }

    const onDelete = () => {
      load();
      delAddress(primaryInfo.id).then(res=>{
        Toast.clear();
        if (!res) {
          Toast.fail('删除地址失败')
        }
        if (res && res.status == '204') {
          Toast.success('删除地址成功');
          setTimeout(() => {
            router.push('/addresslist');
          }, 1000);
        }
      })
    }


    return {
      areaList,
      onSave, onDelete, primaryInfo, type

    }
  }
}
</script>

<style scoped lang="scss">

</style>