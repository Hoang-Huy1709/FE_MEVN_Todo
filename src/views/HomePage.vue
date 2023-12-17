<template>
  <div class="all">

    <!-- Left header -->
    <div class="left-content">
      <HeaderPart />
    </div>

    <div class="view_content">
      <!-- Home right side -->
      <div class="home">
        <div class="left_home_part">
          <div class="home_hello">
            <h1>Xin chào {{ state.nameHomePage }}</h1>
            <h4>Today: {{ currentDate }}</h4>
          </div>

          <div class="home_start_block">
            <img src="../assets/images/3.png" alt="" />
            <h1>TODO LIST & BLOG</h1>
            <p>
              Nền tảng kết hợp TODO LIST và BLOG, quản lý đầu việc <br /> của bạn một cách dễ dàng,
              làm việc thật trực quan và hiệu quả.
            </p>
            <router-link to="/todos">
              <button>Tạo todos</button>
            </router-link>
          </div>

          <h4>Tối ưu hiệu xuất của bạn !</h4>

          <div class="home_grid_bottom">
            <div class="info_1">
              <img src="../assets/images/1.png" alt="" />
              <h3>TAKE NOTE CÔNG VIỆC, LƯU GIỮ CÂU CHUYỆN THÔNG QUA BLOG</h3>
              <p>
                Đăng tải câu chuyện của bạn <br/>
                và nhận tương tác từ mọi người
              </p>

              <router-link to="/blogs" >
                <button class="bt_blog">Viết blogs</button>
              </router-link>

            </div>
            <div class="info_2">
              <img src="../assets/images/2.png" alt="" />
              <h3>CẢM NHẬN SỰ THAY ĐỔI TRONG CÔNG VIỆC</h3>
              <p>Nền tảng kết hợp</p>
            </div>
            <div class="info_3">
              <img src="../assets/images/4.png" alt="" />
              <h3>
                XÂY DỰNG THÓI QUEN <br />
                TAKE TODO CÙNG BẠN
              </h3>
            </div>
          </div>
        </div>

        <!-- Right bar -->
        <div class="right_home_part">
          <div class="acc_block">
            <p>{{ state.nameAccHomePage }}</p>
            <img src="../assets/images/last_1.png" alt="" />
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { onMounted } from "vue";
import userModule from '../modules/userModule';
import HeaderPart from "../components/HeaderPart.vue";

export default {
  components: {
    HeaderPart,
  },

  setup() {
    const currentDate = ref(new Date().toLocaleDateString());

    const {
      state,
      setNameHomePage
    } = userModule();

    onMounted(() => {
      setNameHomePage();
    });

    return {
      state,
      currentDate,
      setNameHomePage
    };
  },
};
</script>

<style scoped>
.all {
  display: flex;
}
.left_header {
  width: 10%;
}

.view_content {
  width: 85%;
  padding: 10px;
}



.home {
  width: 100%;
  display: flex;
  margin-left: 200px;
  border-radius: 15px;
  background: #e1f5fa;
  animation: up 1s;
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

h4 {
  margin-top: 10px;
  margin-bottom: 10px;
  color: #0d6962;
  text-align: left;
}

.left_home_part {
  width: 82%;
  padding: 15px;
  border-right: 3px #76c2d3 dashed;
}

.right_home_part {
  width: 18%;
  padding: 20px;
}

.home_hello {
  text-align: left;
  font-size: 20px;
}

.bt_blog{
  width: 120px;
  height: 40px;
  border: none;
  font-size: 18px;
  font-weight: bold;
  color: #1b998f;
  border-radius: 100px;
  margin-top: 10px;
  transition: 0.3s;
  box-shadow: 0px 5px 15px rgba(255, 255, 255, 0.2);
}

.bt_blog:hover{
  width: 140px;
}

/* Start block */
.home_start_block {
  overflow: hidden;
  color: white;
  text-align: left;
  position: relative;
  background: linear-gradient(45deg, #4fb7ce, #31b8b1);
  padding: 10px;
  margin-top: 10px;
  border-radius: 15px;
  box-shadow: 0px 10px 15px rgb(0, 0, 0, 0.2);
}

.home_start_block img {
  position: absolute;
  width: 18em;
  top: 20px;
  right: -45px;
  transition: 0.5s;
}

.home_start_block:hover img {
  width: 19em;
}

.home_start_block h1 {
  font-size: 40px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.home_start_block p {
  font-size: 17px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.home_start_block button {
  width: 120px;
  height: 40px;
  border: none;
  font-size: 18px;
  font-weight: bold;
  color: #1b998f;
  border-radius: 100px;
  margin-top: 10px;
  transition: 0.3s;
  box-shadow: 0px 5px 15px rgba(255, 255, 255, 0.2);
}

.home_start_block button:hover {
  width: 140px;
}

.home_grid_bottom {
  margin-top: 10px;
  height: 280px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;
  transition: 0.5s;
}

.home_grid_bottom div {
  padding: 15px;
  transition: 0.5s;
}

.info_1 p {
  margin-top: 10px;
}

.info_1,
.info_2,
.info_3 {
  background: linear-gradient(45deg, #4fb7ce, #31b8b1);
  border-radius: 15px;
  text-align: left;
  box-shadow: 0px 10px 15px rgb(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
  color: white;
  transition: 0.5s;
}

.info_1 img,
.info_2 img,
.info_3 img {
  position: absolute;
  right: -30px;
  bottom: -50px;
  transition: 0.5s;
}

.info_2:hover img {
  width: 21em;
  transition: 0.5s;
}

.info_1:hover img,
.info_3:hover img {
  width: 11em;
}

.info_2 {
  grid-column: 2/3;
  grid-row: 3/-1;
}

.info_1 img {
  width: 10em;
}

.info_2 img {
  width: 20em;
  bottom: -60px;
  right: -20px;
}

.info_3 img {
  width: 8em;
}

.acc_block {
  border-radius: 55px;
  background: #ffffff;
  display: flex;
  border: #22a59a 3px solid;
  justify-content: space-between;
  padding: 5px;
  align-items: center;
  margin-bottom: 10px;
  box-shadow: 0px 5px 5px rgb(0, 0, 0, 0.1);
}

.acc_block img {
  width: 2.5em;
  border: #7e7e7e 3px solid;
  border-radius: 100px;
}

.acc_block p {
  margin-left: 10px;
}

/* .home_grid_bottom div{
 
} */
</style>
