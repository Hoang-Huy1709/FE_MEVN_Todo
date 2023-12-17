<template lang="">
  <div class="login_page">

    <div class="decor_1"></div>
    <div class="decor_2"></div>
    <div class="decor_3"></div>

    <!-- Big decor img -->
    <div class="login_decor_component">
      <h1>ĐĂNG NHẬP</h1><br>
      <h4>
        HULK TODO nền tảng tuyệt vời kết hợp Todo list và Blogs<br>
        <!-- Nâng cao hiệu xuất của bạn, bắt đầu ngay ! -->
      </h4>
      <img src="../assets/images/6.png" alt="" />
    </div>

    <!-- login card -->
    <div class="login_site">
      <div class="login_card">

        <img class="img_logo" src="../assets/images/logo_full.png" alt=""><br>
        <!-- Login form -->
        <input v-model="state.username" class="input_username" type="text" placeholder="Tên đăng nhập" ><br>
        <span >{{state.show_error_username}}</span> <br>
        
        <input v-model="state.password" class="input_password" type="password" placeholder="Mật khẩu" ><br>
        <span >{{state.show_error_password}}</span> <br>

        <!-- Span show error -->
        <span >{{state.show_main_error}}</span><br>

        <router-link to="/register" class="link_register">ĐĂNG KÝ</router-link><br>

        <button @click="login()" class="bt_login" >ĐĂNG NHẬP</button><br>

        <div class="other_login_method">
          <i class='bx bxl-google'></i>
          <i class='bx bxl-facebook-circle' ></i>
        </div>

      </div>
    </div>

  </div>
</template>

<script>

import userModule from '../modules/userModule';

export default {

  setup(){

    const { 
      state,
      login,
     } = userModule();

    return {
      state,
      login,
    }


  }

};
</script>

<style scoped>
.login_page {
  
  height: 100vh;
  position: relative;
  display: flex;
}


.decor_1,.decor_2,.decor_3{
  width: 300px;
  height: 300px;
  opacity: 0.7;
  position: absolute;
  filter: blur(25px);
  background: linear-gradient(75deg, #a59ae8, #55d6f2);
  z-index: 1;
}

.decor_1{
  width: 300px;
  border-radius: 50%;
  height: 300px;
  bottom: -100px;
  left: -50px;
}

.decor_2{
  width: 500px;
  border-radius: 50%;
  height: 500px;
  top: -300px;
  left: 30em;
}

.decor_3{
  width: 400px;
  border-radius: 50%;
  height: 400px;
  bottom: -100px;
  right: -7em;
}

/* Decor div */
.login_decor_component{
  padding: 50px;
  width: 50%;
  z-index: 2;
  text-align:center;
  color: #0FA968;
}
.login_decor_component h1{
 font-size: 50px;
}
.login_decor_component h4{
 margin-bottom: 20px;
}
.login_decor_component img{
 width: 27em;
}



.login_site{
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login_card{
  width: 70%;
  height: 85vh;
  padding: 20px;
  box-shadow: 0px 10px 15px rgb(0, 0, 0, 0.2);
  border-radius: 15px;
  background: white;
  animation: up 1s;
  z-index: 2;
}

.login_title{
  font-size: 30px;
  font-weight: bold;
  color: #7568C0;
  text-align: left;
}

.img_logo{
  width: 13em;
  margin-bottom: 15px
}

.icon_login{
  color: rgb(0,0,0,0.8);
  font-size: 40px;
}

/* Login input controll */
.login_card input{
  width: 80%;
  height: 40px;
  border: none;
  outline: none;
  border-bottom: 3px rgb(79,183,206,0.5) solid;
  margin-bottom: 10px;
  font-size: 16px;
  transition: 0.3s ease;
}

.login_card input:focus{
  border-bottom: 3px rgb(79,183,206) solid;
}

.login_card span{
  text-align: left;
  color: rgb(255, 178, 78);
}

.link_register{
  font-size: 13px;
  color: #0FA968;
  opacity: 0.7;
  transition: 0.3s;
}

.link_register:hover{
  opacity: 1;
  font-weight: bold;
}

.bt_login{
  margin-top: 15px;
  width: 80%;
  height: 45px;
  box-shadow: 0px 10px 15px rgb(0, 0, 0, 0.2);
  border-radius: 5px;
  border: none;
  background: linear-gradient(45deg,#C8C4F7,#0FA968);
  color: white;
  margin-bottom: 15px;
  transition: 0.3s;
  font-size: 18px;
  font-weight: bold;
}

.bt_login:hover{
  transform: scale(1.1,1.1);
}

.other_login_method i{
  color: #0FA968;
  font-size: 27px;
  margin-left: 10px;
}

@keyframes up {
  0% {
    transform: translate(+50px, 0);
    opacity: 0;
  }

  100% {
    transform: translate(0, 0);
    opacity: 1;
  }
}

</style>
