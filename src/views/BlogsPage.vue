<template>
  <div class="blogs_page">
    <div class="left_header">
      <HeaderPart />
    </div>

    <div class="view_content">
      <!-- Header blog -->
      <div class="header_blog">
        <div class="welcome">
          <h1 class="title">TẤT CẢ BLOGS</h1>
          <p class="date">Hôm nay: {{ currentDate }}</p>
        </div>

        <div class="right_bts">
          <button class="bt_profile">
            Trang cá nhân <i class="bx bx-user"></i>
          </button>

          <router-link to="/create">
            <button class="bt_create_blog">
              Tạo Blog <i class="bx bx-edit"></i>
            </button>
          </router-link>
        </div>
      </div>

      <div class="all_blogs">
        <div class="header_show_all_block">
          <div class="search_box">
            <input type="text" placeholder="Nhập tiêu đề block, ..." />
            <button>Tìm kiếm</button>
          </div>

          <div class="category">
            <label for="category_option">Chọn thể loại</label>
            <select
              v-model="state.categorySelected"
              name="category_option"
              @change="getAllBlogs()"
            >
              <option value="Tất cả">Tất cả</option>
              <option value="Xã hội">Xã hội</option>
              <option value="Chia sẻ">Chia sẻ</option>
              <option value="Chính trị">Chính trị</option>
              <option value="Giải trí">Giải trí</option>
              <option value="Công nghệ">Công nghệ</option>
              <option value="Game">Game</option>
              <option value="Hài hước">Hài hước</option>
              <option value="Thể thao">Thể thao</option>
            </select>
          </div>
        </div>

        <div class="trending_post">
          <img src="../assets/images/space.png" alt="" />
          <h4 class="hot_tag">Blog thịnh hành <i class="bx bxs-hot"></i></h4>
          <div class="trending_content">
            <h2>KHÔNG GIAN CÓ TÁC ĐỘNG GÌ TỚI TÂM TRẠNG CỦA BẠN?</h2>
            <p>
              Cùng tôi tìm hiểu những yếu tố nhỏ ảnh hưởng tới tâm trạng của bạn
            </p>
            <p>Tác giả: Thehulk</p>
            <button>ĐỌC THÊM</button>
          </div>
        </div>

        <div class="show_all_blogs">
          <div v-for="blog in state.blogs" :key="blog._id" class="blogs_post">
            <h4><i class="bx bx-notepad"></i> {{ blog.title }}</h4>
            <div class="controll_img">
              <img :src="'http://localhost:3000' + blog.imageUrls[0]" alt="" />
            </div>
            <p><i class="bx bx-bookmark"></i> {{ blog.category }}</p>
            <p><i class="bx bx-user-circle"></i> {{ blog.author }}</p>
            <router-link :to="{ name: 'BlogDetail', params: { id: blog._id } }">
              <button class="bt_read_more">ĐỌC THÊM</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { onMounted } from "vue";
import HeaderPart from "../components/HeaderPart.vue";
import blogsModule from "../modules/blogModule";

export default {
  setup() {
    const currentDate = ref(new Date().toLocaleDateString());

    const { state, getAllBlogs } = blogsModule();

    onMounted(() => {
      getAllBlogs();
    });

    return {
      state,
      currentDate,
      getAllBlogs,
      // category_filter,
    };
  },

  components: {
    HeaderPart,
  },
};
</script>

<style scoped>
.blogs_page {
  position: relative;
  margin-left: 200px;
  border-radius: 15px;
  padding: 10px;
  padding-top: 5px;
}
.left_header {
  width: 15%;
}

.view_content {
  border-radius: 15px;
  width: 100%;
  padding: 10px;
  padding-top: 0;
  background: #ffffff;
  animation: up 1s;
}

.header_blog {
  display: flex;
  justify-content: space-between;
}

.title {
  text-align: left;
}

.date {
  text-align: left;
}

/* Create bt */
.bt_create_blog {
  width: 150px;
  height: 50px;
  border: none;
  font-size: 18px;
  font-weight: bold;
  background: linear-gradient(90deg, #c0a6fc, #31b8b1);
  border-radius: 100px;
  color: white;
  margin-top: 10px;
  transition: 0.3s;
  box-shadow: 0px 5px 15px rgba(255, 255, 255, 0.3);
}

.bt_profile {
  margin-right: 10px;
  width: 190px;
  height: 50px;
  border: none;
  font-size: 18px;
  font-weight: bold;
  background: linear-gradient(45deg, #4fb7ce, #31b8b1);
  border-radius: 100px;
  color: white;
  margin-top: 10px;
  transition: 0.3s;
  box-shadow: 0px 5px 15px rgba(255, 255, 255, 0.3);
}

.bt_create_blog i,
.bt_profile i {
  font-size: 25px;
  vertical-align: middle;
}

.bt_profile:hover {
  width: 210px;
}

.bt_create_blog:hover {
  width: 170px;
}

/* Show all blogs */
.all_blogs {
  border-top: 2px dashed #31b8b1;
  padding-top: 10px;
  /* border-radius: 15px; */
  /* padding: 10px; */
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 2px red solid;
}

.header_show_all_block {
  display: flex;
}

.header_show_all_block div {
  width: 50%;
}

.search_box {
  text-align: left;
}

.search_box input {
  width: 22em;
  height: 40px;
  margin-bottom: 5px;
  margin-right: 10px;
  border-radius: 50px;
  border: 2px rgb(72, 201, 176, 0.5) solid;
  padding-left: 7px;
  outline: none;
}

.search_box button {
  margin-right: 10px;
  width: 100px;
  height: 40px;
  border: none;
  font-size: 15px;
  font-weight: bold;
  background: linear-gradient(45deg, #b29ffa, #31b8b1);
  border-radius: 100px;
  color: white;
  transition: 0.3s;
  box-shadow: 0px 5px 15px rgba(255, 255, 255, 0.3);
}

.search_box button:hover {
  width: 120px;
}

.search_box input:focus {
  border: 2px rgb(72, 201, 176, 0.9) solid;
}

.category {
  text-align: right;
}

select {
  margin-left: 10px;
  width: 120px;
  height: 35px;
  border: #31b8b1 2px solid;
  outline: none;
  border-radius: 20px;
  text-align: center;
}

/* Trending block */
.trending_post {
  position: relative;
  height: 13em;
  border-radius: 10px;
  margin-top: 5px;
  margin-bottom: 10px;
  /* border: 5px #1b998f solid; */
  display: flex;
  overflow: hidden;
  justify-content: center;
  align-items: center;
}

.trending_post button {
  margin-top: 10px;
  width: 120px;
  height: 35px;
  border: none;
  font-size: 15px;
  font-weight: bold;
  background: linear-gradient(45deg, #a277f1, #31b8b1);
  color: white;
  border-radius: 100px;
  transition: 0.3s;
  box-shadow: 0px 5px 15px rgba(255, 255, 255, 0.2);
}

.trending_post:hover button {
  width: 140px;
}

.trending_post button:hover {
  box-shadow: 0px 3px 20px rgb(255, 255, 255);
  border: 2px white solid;
}

.trending_post img {
  position: absolute;
  width: 100%;
  object-fit: cover;
  /* filter: blur(5px); */
  transition: 0.7s;
}

.trending_post:hover img {
  transform: scale(1.1, 1.1);
}

.trending_content {
  background-color: rgb(0, 0, 0, 0.7);
  width: 100%;
  height: 13em;
  color: white;
  padding-top: 5%;
  z-index: 2;
}

.hot_tag {
  position: absolute;
  color: #f1952b;
  top: 10px;
  left: 10px;
  z-index: 3;
}

/* show */
.show_all_blogs {
  margin-top: 5px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 10px;
}

.show_all_blogs i {
  font-size: 25px;
  vertical-align: middle;
  margin-bottom: 5px;
}

.show_all_blogs img {
  width: 7em;
}

.blogs_post {
  position: relative;
  padding: 10px;
  background: linear-gradient(45deg, #a277f1, #31b8b1);
  border-radius: 15px;
  color: white;
  margin-bottom: 10px;
  text-align: left;
}

.controll_img {
  border: 2px solid rgb(255, 255, 255);
  width: 100%;
  height: 8em;
  overflow: hidden;
  margin-top: 5px;
  margin-bottom: 5px;
  border-radius: 5px;
}

.controll_img img {
  width: 100%;
  height: 100%; /* Đảm bảo ảnh chiếm toàn bộ chiều cao của phần chứa */
  object-fit: cover;
  object-position: center; /* Hiển thị ảnh ở trung tâm */
  transition: 0.8s;
}

.blogs_post:hover img {
  transform: scale(1.1, 1.1);
}

.bt_read_more {
  margin-top: 10px;
  width: 120px;
  height: 35px;
  border: none;
  font-size: 15px;
  font-weight: bold;
  color: #643fa8;
  outline: none;
  background: white;
  border-radius: 100px;
  transition: 0.3s;
  box-shadow: 0px 5px 15px rgba(255, 255, 255, 0.2);
}

.bt_read_more:hover {
  width: 140px;
  box-shadow: 0px 3px 20px rgb(255, 255, 255);
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
