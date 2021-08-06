<template>
  <div>
  <navigator>注册</navigator>

    <h1>BookStorm</h1>

    <van-form @submit="onSubmit">
      <van-field
          v-model="name"
          name="name"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
      />
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
      <van-field
          v-model="password_confirmation"
          name="password_confirmation"
          type="password"
          label="确认密码"
          placeholder="确认密码"
          :rules="[{ required: true, message: '请确认密码' }]"
      />

      <span @click="$router.push('/login')" style="color:#42b983;margin:20px 10px 5px ;display: inline-block" >已有账号，去登录</span>


      <div style="margin: 16px;">
        <van-button round block type="default" style="background:var(--color-weak);color: white;font-size: 20px" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import Navigator from "@/components/common/navigator";
import {reactive, toRefs} from "vue";
import {Notify, Toast} from "vant";
import {useRouter} from "vue-router";
import {signup} from "@/network/profile";

export default {
  components: {Navigator},
  setup() {
    const router=useRouter();
    let info=reactive({
      name:'',email:'',password_confirmation:'',password:''
    })

    const onSubmit=(val)=>{
      if(val.password_confirmation!=val.password)
      {
        Notify({ type: 'danger', message: "两次密码输入不一致" });
        info.password_confirmation='';
        info.password='';
      }
      else
        signup(val).then((res)=>{
        if(res&&res.status=='201')
        {
          //1234@xxaa.com
          //qweasd

          Toast.success('注册成功');
          setTimeout(()=>{
            router.push('/login')
          },500)


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