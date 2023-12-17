<template lang="">
  <div class="setting_page">
    <div class="left_header">
      <HeaderPart />
    </div>

    <div class="view_content">
      <h1>Setting page</h1>

      
      <br>

      <router-link to="/login">
        <button @click="logOut()">Đăng xuất</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import HeaderPart from "../components/HeaderPart.vue";
import userModule from "../modules/userModule";

export default {
  components: {
    HeaderPart,
  },

  setup() {
    const { state, logOut } = userModule();

    return {
      state,
      logOut,
    };
  },
};
</script>
<style scoped>
.setting_page {
  margin-left: 200px;
  border-radius: 15px;
  padding: 10px;
}
.left_header {
  width: 15%;
}

.view_content {
  border-radius: 15px;
  width: 100%;
  padding: 10px;
  background: #e1f5fa;
  animation: up 1s;
}

.view_content button{
  width: 120px;
  height: 40px;
  border: none;
  font-size: 18px;
  background-color: #1b998f;
  color: white;
  border-radius: 100px;
  margin-top: 10px;
  transition: 0.3s;
  box-shadow: 0px 5px 15px rgba(255, 255, 255, 0.2);
}

.view_content button:hover{
  transform: scale(1.1,1.1)
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
