<template>
  <div>
    <navigator>登录</navigator>

    <h1>BookStorm</h1>

    <van-form @submit="onSubmit">
      <van-field
          v-model="email"
          type="email"
          name="email"
          label="邮箱"
          placeholder="输入邮箱"
          :rules="[{ required: true, message: '请填写邮箱' }]"
      />
      <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码'}]"
      />
      <span @click="$router.push('/sign')" style="color:#42b983;margin:20px 10px 5px ;display: inline-block" >没有账号，去注册</span>

      <div style="margin: 16px;">
        <van-button round block type="default" style="background-color:#42b983;color: white;font-size: 20px" native-type="submit">提交</van-button>
      </div>
    </van-form>

  </div>
</template>

<script>
import Navigator from "@/components/common/navigator";
import {reactive, toRefs} from "vue";
import {Toast} from "vant";
import {useRouter} from "vue-router";
import {login} from "@/network/profile";
export default {
  components: {Navigator},
  setup() {
    const router=useRouter();
    let info=reactive({
     email:'a1352800232@qq.com',password:'qweasd'
    })

    //a1352800232@qq.com
    //qweasd

    const onSubmit=(val)=>{

      login(val).then(res=>{
        if(res)
        {
          window.localStorage.setItem('cookie',res.access_token);
          Toast.success('登录成功');

          setTimeout(()=>{
            router.go(-1);
          },500);
        }

      })


    }


    return {
      ...toRefs(info),onSubmit
    }
  }
}
</script>

<style scoped lang="scss">
h1 {
  color:#42bbaa;
  font-family: "Comic Sans MS";
  text-align: center;
  display: inline-block;
  margin-top: 50px;
  width: 100%;
}
</style>