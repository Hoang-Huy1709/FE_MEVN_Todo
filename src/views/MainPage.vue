<template>
    <div class="home">
      
      <div class="left_home_part">
  
        <div class="home_hello">
        <h1>HELLO </h1>
        <h4>Today: {{ currentDate }}</h4> 
        </div>
  
        <!-- Start block -->
        <div class="home_start_block">
          <img src="../assets/images/3.png" alt="">
          <h1>TODO LIST CỦA BẠN</h1>
          <p>Lưu trữ, quản lý đầu việc của bạn một cách dễ dàng,<br> làm việc thật trực quan và hiệu quả.</p>
          <button>START</button>
        </div>
  
        <h4>Tối ưu hiệu xuất của bạn !</h4>
  
        <div class="home_grid_bottom">
          <div class="info_1">
            <img src="../assets/images/1.png" alt="">
            <h3>HÃY ĐỂ TODO LIST THAY BẠN GHI NHỚ CÔNG VIỆC</h3>
            <p>Thật quá nhiều công việc để nhớ <br> hãy để todo giúp bạn</p>
          </div>
          <div class="info_2">
            <img src="../assets/images/2.png" alt="">
            <h3>CẢM NHẬN SỰ THAY ĐỔI TRONG CÔNG VIỆC</h3>
            <p>Bắt đầu ngay !</p>
          </div>
          <div class="info_3">
            <img src="../assets/images/4.png" alt="">
            <h3>XÂY DỰNG THÓI QUEN <br> TAKE TODO CÙNG BẠN</h3>
            <!-- <p>Lợi ích lâu dài về quản lý <br>công việc cho bạn</p> -->
          </div>
        </div>
  
      </div>
  
      <div class="right_home_part">
        <div class="acc_block">
          <p>Acc name</p>
          <img src="../assets/images/last_1.png" alt="">
        </div>
    
      </div>
  
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    setup(){
      const currentDate = ref(new Date().toLocaleDateString());
  
      return{
        currentDate,
      }
    },
  
  
    components:{
    }
  }
  </script>
  
  <style scoped>
  .home{
    display: flex;
    animation: up 1s;
  }
  
  @keyframes up{
    0%{
      transform: translate(+50px,0);
      opacity: 0;
    }
  
    100%{
      transform: translate(0,0);
      opacity: 1;
    }
  }
  
  h4{
    margin-top: 15px;
    margin-bottom: 15px;
    color: #0d6962;
    text-align: left;
  }
  
  .left_home_part{
    width: 70%;
    padding: 15px;
    border-right: 3px #76c2d3 dashed;
  }
  
  .right_home_part{
    width: 30%;
    padding: 10px;
  }
  
  .home_hello{
    text-align: left;
    font-size: 20px;
  }
  
  /* Start block */
  .home_start_block{
    overflow: hidden;
    color: white;
    text-align: left;
    position: relative;
    background: linear-gradient(45deg,#4FB7CE,#31b8b1);
    padding: 10px;
    margin-top: 10px;
    border-radius: 15px;
    box-shadow: 0px 10px 15px rgb(0,0,0,0.2);
  }
  
  .home_start_block img{
    position: absolute;
    width: 18em;
    top: 20px;
    right: -45px;
    transition: 0.5s;
  }
  
  .home_start_block:hover img{
    width: 19em;
  }
  
  .home_start_block h1{
    font-size: 40px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  
  .home_start_block p{
    font-size: 17px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  
  .home_start_block button{
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
  
  .home_start_block button:hover{
    width: 140px;
  }
  
  .home_grid_bottom{
    margin-top: 10px;
    height: 250px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 15px;
    transition: 0.5s;
  }
  
  .home_grid_bottom div{
   padding: 15px;
   transition: 0.5s;
  }
  
  .info_1 p{
    margin-top: 10px;
  }
  
  .info_1,.info_2,.info_3{
    background: linear-gradient(45deg,#4FB7CE,#31b8b1);
    border-radius: 15px;
    text-align: left;
    box-shadow: 0px 10px 15px rgb(0,0,0,0.2);
    position: relative;
    overflow: hidden;
    color: white;
    transition: 0.5s;
  }
  
  .info_1 img,.info_2 img,.info_3 img{
    position: absolute;
    right: -30px;
    bottom: -30px;
    transition: 0.5s;
  }
  
  .info_2:hover img{
    width: 16em;
    transition: 0.5s;
  }
  
  .info_1:hover img,.info_3:hover img{
    width: 9em;
  }
  
  .info_2{
    grid-column: 2/3;
    grid-row: 3/-1;
  }
  
  .info_1 img{
    width: 8em;
  }
  
  .info_2 img{
    width: 15em;
  }
  
  .info_3 img{
    width: 8em;
  }
  
  .acc_block{
    border-radius: 55px;
    background: #ffffff;
    display: flex;
    justify-content: space-between;
    padding: 5px;
    align-items: center;
    box-shadow: 0px 10px 15px rgb(0,0,0,0.1);
  }
  
  .acc_block img{
    width: 2.5em;
    border: #5cbebe 4px solid;
    border-radius: 100px;
  }
  
  .acc_block p{
    margin-left: 10px;
  }
  
  /* .home_grid_bottom div{
   
  } */
  
  </style>
  