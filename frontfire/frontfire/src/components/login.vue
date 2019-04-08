<template>
  <Card class='card'>
    <p class="title">眉山市火灾消防定位系统</p>
    <div class="inputModal">
      <span>账号：</span><Input v-model="userName" class="input"></Input>
    </div>
    <div class="inputModal">
      <span>密码：</span><Input v-model="userPassword" class="input" type="password"></Input>
    </div>
    <Button type="info" @click="login">登录</Button>
  </Card>
</template>
<script>
export default {
  name: 'login',
  data () {
    return {
      userName: '',
      userPassword: ''
    }
  },
  methods: {
    login () {
      let self = this
      if ((this.userName === '') || (this.userPassword === '')) {
        this.$Message.error('用户名或密码不能为空')
        return
      }
      this.$axios({
          method:'post',
          url:'//firelocater.top/login',
          //withCredentials:true,
          data: {
            userName: self.userName,
            userPassword: self.userPassword
          }
      }).then((response) =>{          //这里使用了ES6的语法
          this.$router.push({path: '/admin'})//请求成功返回的数据
      }).catch((error) =>{
          this.$Message.error('账号或密码错误')     //请求失败返回的数据
      });
    }
  }
}
</script>
<style>
.card{
  width: 450px;
  height: 250px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  text-align: center;
}

.card .title{
  margin:20px 0 30px 0;
}

.card .inputModal{
  margin: 20px;
}

.card .inputModal .input{
  width: 200px;
}
</style>


