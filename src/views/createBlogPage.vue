<template lang="">
  <div class="create_blog_page">
    <!-- <div class="decor_1"></div> -->
    <div class="left_header">
      <HeaderPart />
    </div>

    <!-- Create blog -->
    <div class="view_content">
      <div class="intro">
        <h1>TẠO BLOG</h1>
        <h3>
          Tạo và lưu giữ câu chuyện thú vị của bạn, nhận phản ứng từ mọi người
        </h3>
      </div>

      <router-link to="/blogs">
        <button class="bt_back_to_blogs">TRỞ VỀ</button>
      </router-link>

      <!-- <i class='bx bx-chevron-left-circle icon_back'></i> -->

      <div class="create_block">

        <img class="illustrates_img" src="../assets/images/influencer.png" alt="">

        <input
          v-model="state.title"
          type="text"
          placeholder="Tiêu đề Blog"
        />
        <span>{{ state.showEmptyTitle }}</span>
        <br />

        <!-- Upload file -->
        <div class="upload_img">
          <label for="img_input" class="lb_upload">
            <i class="bx bx-image-add"></i> Chọn ảnh
          </label>
          <input
            id="img_input"
            ref="fileInput"
            class="select_img"
            type="file"
            accept="image/*"
            multiple
            style="display: none"
          />
        </div>
        <input
          v-model="state.content"
          type="text"
          placeholder="Nội dung"
        />
        <span>{{ state.showEmptyContent }}</span>
        <br />

        <label for="category_option">Chọn thể loại</label>
        <select v-model="state.category" name="category_option" id="">
          <option value="Tất cả">Tất cả</option>
          <option value="Xã hội">Xã hội</option>
          <option value="Chia sẻ">Chia sẻ</option>
          <option value="Chính trị">Chính trị</option>
          <option value="Giải trí">Giải trí</option>
          <option value="Công nghệ">Công nghệ</option>
          <option value="Game">Game</option>
          <option value="Hài hước">Hài hước</option>
          <option value="Thể thao">Thể thao</option></select
        ><br />

        <button
          @click="
            handleUpload();
          "
          class="bt_create"
        >
          TẠO <i class="bx bx-book-add"></i></button
        ><br />
        <h5>{{ state.showInfo }}</h5>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import blogModule from "../modules/blogModule";
import HeaderPart from "@/components/HeaderPart.vue";

export default {
  setup() {
    const { state, newBlog, uploadImage } = blogModule();
    const fileInput = ref(null);

    //Upload img when click bt
    const handleUpload = () => {
      if (fileInput.value && fileInput.value.files.length > 0) {
        const files = fileInput.value.files;
        uploadImage(files);
      } else {
        console.log("No files is selected");
      }
    };

    return {
      state,
      fileInput,
      newBlog,
      uploadImage,
      handleUpload,
    };
  },

  components: {
    HeaderPart,
  },

  methods: {
    handleImageChange(event) {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        const imageUrl = URL.createObjectURL(selectedFile);
        const fileName = selectedFile.name; // Lấy tên tệp ảnh gốc
        this.state.imageUrl = imageUrl;
        this.state.imageFileName = fileName; // Lưu tên tệp ảnh
      }
    },
  },
};
</script>

<style scoped>
span{
  margin-left: 10px;
}

h5{
  margin-top: 10px;
  font-size: 18px;
}
.create_blog_page {
  margin-left: 200px;
  border-radius: 15px;
  padding: 10px;
  position: relative;
}

.decor_1 {
  position: absolute;
  width: 300px;
  height: 300px;
  filter: blur(20px);
  opacity: 0.7;
  top: -100px;
  border-radius: 999px;
  right: 50px;
  background: linear-gradient(75deg, #a59ae8, #55d6f2);
  z-index: 1;
}

.left_header {
  width: 15%;
}

.view_content {
  position: relative;
  border-radius: 15px;
  width: 100%;
  padding: 10px;
  background: #e1f5fa;
  animation: up 1s;
  z-index: 2;
}

.bt_back_to_blogs {
  position: absolute;
  top: 0px;
  left: 10px;
  width: 100px;
  height: 45px;
  border: none;
  font-size: 15px;
  font-weight: bold;
  background: linear-gradient(45deg, #4fb7ce, #31b8b1);
  border-radius: 100px;
  color: white;
  margin-top: 10px;
  transition: 0.3s;
  box-shadow: 0px 5px 15px rgba(68, 68, 68, 0.2);
}

.bt_back_to_blogs:hover {
  width: 120px;
}


/* Create */
.create_block {
  background: linear-gradient(5deg, #c0a6fc, #31b8b1);
  border-radius: 15px;
  position: relative;
  padding: 15px;
  margin-top: 10px;
  text-align: left;
  color: white;
  box-shadow: 0px 5px 15px rgba(68, 68, 68, 0.2);
  overflow: hidden;
}

.illustrates_img{
  width: 20em;
  position: absolute;
  right: 20px;
  bottom: -50px;
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

/* Upload img */
.upload_img{
  padding: 7px;
  width: 120px;
  height: 40px;
  font-size: 13px;
  background-color: white;
  border-radius: 5px;
  color:rgb(0,0,0,0.7);
  margin-bottom: 10px;
  transition: 0.3s;
}

.upload_img i{
  font-size: 25px;
  vertical-align: middle;
  margin-bottom: 5px;
}

.upload_img:hover{
  width: 130px;
}

.bt_create {
  width: 150px;
  height: 45px;
  border: none;
  font-size: 18px;
  font-weight: bold;
  background: white;
  border-radius: 100px;
  color: #2b9792;
  margin-top: 10px;
  transition: 0.3s;
  box-shadow: 0px 5px 15px rgba(68, 68, 68, 0.2);
}

.bt_create:hover {
  width: 170px;
}

.bt_create i {
  font-size: 25px;
  vertical-align: middle;
}

input {
  height: 45px;
  padding: 7px;
  border-radius: 5px;
  border: none;
  outline: none;
  width: 500px;
  margin-bottom: 10px;
  transition: 0.3s;
}

input:hover{
  width: 520px;
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
