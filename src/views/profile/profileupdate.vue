<template>
  <navigator>账号管理</navigator>
  <van-divider >更新用户名</van-divider>
  <van-form>
    <van-field
        style="font-size: 15px;background: #F2F2F2;border-radius: 15px;
                  color:white;width: 80%;margin: 50px auto"
        v-model="name"
        label="用户名"
        :placeholder="name"
        :rules="[{ required: true, message: '您还未填写新用户名哦' }]"
    />
    <div style="margin: 16px;">
      <van-button round block type="default" native-type="submit"
                  style="background: var(--color-weak);font-size: 15px;
                  color:white;width: 50%;margin: 50px auto" @click="updateName">更新用户名</van-button>
    </div>
  </van-form>



</template>

<script>
import Navigator from "@/components/common/navigator";
import {reactive, ref, toRefs} from "vue";
import {useRoute} from "vue-router";
import {goupdateAva, goupdateName, userInfo} from "@/network/profile";
import {load} from "@/utils/message";
import {Toast} from "vant";
export default {
  components: {Navigator},
  setup() {
    const route=useRoute();
    let state=reactive({
      name:'',
      email:'',
      avatar_url:''
    });

    userInfo().then(res=>{
      state.name=res.name;
      state.email=res.email;
      state.avatar_url=res.avatar_url==''?'@/assets/images/default_avatar':res.avatar_url;

    })

    const updateName=()=>{
      if(state.name=='')
      {
        Toast.fail('用户名不能为空哦');return;
      }
      load();
      goupdateName({name:state.name}).then(res=>{
        if(res.status=='204') {
          Toast.clear();
          Toast.success('更新成功!');
        }
        Toast.clear();
      });



    }



    return {
     updateName,...toRefs(state)
    }
  }
}
</script>

<style scoped lang="scss">

</style>