<template lang="html">
  <div class="todos_page">
    <!-- Left header -->
    <div class="left_header">
      <HeaderPart />
    </div>

    <!-- Todos list -->
    <div class="todos_list">
      <div class="decor_1"></div>
      <div class="todos_left_side">
        <h2>TẤT CẢ TODOS CỦA BẠN</h2>
        <h4>Thêm việc làm mới ngay !</h4>

        <!-- Add todo block -->
        <div class="add_todo_block">
          <img src="../assets/images/6.png" alt="" />
          <input
            v-model="state.newTitle"
            class="input_title"
            type="text"
            placeholder="Tiêu đề"
          /><br />
          <span v-if="state.showEmptyTitle" class="show_empty_error"
            >Bạn chưa nhập tiêu đề</span
          >
          <br />
          <input
            v-model="state.newTodoItem"
            class="input_todo"
            placeholder="Nội dung"
            type="text"
            @keydown.enter="handleSubmit()"
          />
          <br />
          <span v-if="state.showEmptyContent" class="show_empty_error"
            >Bạn chưa nhập nội dung</span
          >
          <br /><button @click="handleSubmit()" class="bt_add_todo">
            Thêm
          </button>
        </div>

        <h5 class="body_title">
          <i class="bx bx-list-ol list_icon"></i>CÁC CÔNG VIỆC
        </h5>

        <!-- All todos -->
        <div class="all_todo">
          <div class="todo_bar" v-for="item in state.todos" :key="item._id">
            <div class="right_content_bar">
              <h4 :class="{ completed: item.completed }">{{ item.title }}</h4>
              <p :class="{ completed: item.completed }">{{ item.todo }}</p>

              <!-- Edit side -->
              <div v-if="item.showEdit" class="edit_todo">
                <input
                  v-model="state.editTitle"
                  class="input_edit_title"
                  type="text"
                  placeholder="Update title"
                  @keydown.enter="editTodo(item.id)"
                />
                <br>
                <input
                  v-model="state.editContent"
                  class="input_edit_content"
                  type="text"
                  placeholder="Update content"
                  @keydown.enter="editTodo(item.id)"
                />
                <span v-if="state.showEmptyEdit" class="empty_edit"
                  >Bạn chưa nhập nội dung</span
                >
                <br />
                <button class="bt_edit" @click="editTodo(item.id)">
                  Cập nhật
                </button>
                <button class="bt_cancel_edit" @click="cancelEdit()">
                  Hủy
                </button>
              </div>
            </div>

            <div class="right_icon_bar">
              <i
                @click="toggleCompleted(item._id)"
                class="bx bx-check-circle check_icon"
              ></i>

              <i
                @click="handleInfoClick(item._id)"
                class="bx bx-info-circle info_icon"
              ></i>

              <i
                @click="handleEditClick(item._id)"
                class="bx bx-edit-alt edit_icon"
              ></i>

              <i
                @click="handleDeleteIconClick(item._id)"
                class="bx bx-trash-alt delete_icon"
              ></i>

              <!-- Div confirm delete todo -->
              <div v-if="state.showDeleteConfirm" class="confirm_delete_todo">
                <div class="card_confirm">
                  <h3>Bạn muốn chắc chắn xóa công việc này ?</h3>
                  <button @click="confirmDelete(item._id)">Xóa</button>
                  <button @click="cancelDelete">Hủy</button>
                </div>
              </div>

              <!-- Popup detail infomation todo -->
              <div v-if="item.showInfo" class="popup_info">
                <div class="card_info">
                  <h2>CHI TIẾT CÔNG VIỆC <i class="bx bx-detail"></i></h2>
                  <p>
                    <i class="bx bx-notepad"></i> <b>Tiêu đề:</b>
                    {{ item.title }}
                  </p>
                  <p>
                    <i class="bx bx-note"></i> <b>Nội dung:</b> {{ item.todo }}
                  </p>
                  <p>
                    <i class="bx bx-time-five"></i> <b>Thời gian tạo:</b>
                    {{ item.timeAdd }}
                  </p>
                  <p>
                    <i class="bx bx-calendar"></i> <b>Ngày tạo:</b>
                    {{ item.dateAdd }}
                  </p>
                  <p>
                    <i class="bx bx-objects-vertical-center"></i>
                    <b>Trạng thái: </b
                    >{{ item.completed ? "Đã hoàn thành" : "Chưa hoàn thành" }}
                  </p>
                  <button @click="cancelInfo()">Đóng</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right report data -->
      <div class="todos_right_side">
        <h2>DỮ LIỆU</h2>
        <h4>Báo cáo dữ liệu</h4>

        <div class="illustrates">
          <img src="../assets/images/4.png" alt="">
        </div>

        <h3 class="percen"><i class='bx bx-objects-vertical-center'></i> 
          TIẾN ĐỘ ĐẠT {{ state.processPercent }} % </h3>

        <div class="data">
          <h4>
            <i class="bx bx-objects-vertical-bottom"></i><br />
            SỐ CÔNG VIỆC: {{ state.countTotalTodo }}
          </h4>
          <h4>
            <i class="bx bx-check-double"></i><br />
            HOÀN THÀNH: {{ state.countCompletedTodo }}
          </h4>
          <h4>
            <i class="bx bx-x"></i><br />
            CHƯA HOÀN THÀNH: {{ state.countUnfinishedTodo }}
          </h4>
        </div>
      </div>
    </div>

    
  </div>
</template>

<script>
import { onMounted } from "vue";
import todoModule from "../modules/todoModule";
import HeaderPart from "../components/HeaderPart.vue";

export default {
  components: {
    HeaderPart,
  },

  data() {
    return {};
  },

  setup() {
    const {
      state,
      GetAllTodos,
      newTodo,
      deleteTodo,
      editTodo,
      handleSubmit,
      handleDeleteIconClick,
      confirmDelete,
      cancelDelete,
      handleEditClick,
      cancelEdit,
      handleInfoClick,
      cancelInfo,
      toggleCompleted,
    } = todoModule();

    onMounted(() => {
      GetAllTodos();
      // calculatePercentage();
    });

    return {
      state,
      GetAllTodos,
      newTodo,
      deleteTodo,
      editTodo,
      handleSubmit,
      handleDeleteIconClick,
      confirmDelete,
      cancelDelete,
      handleEditClick,
      cancelEdit,
      handleInfoClick,
      cancelInfo,
      toggleCompleted,
    };
  },
};
</script>

<style scoped>
/* Handle completed todo */
.completed {
  text-decoration: line-through;
  color: #42ff91;
}

.empty_edit {
  margin-left: 5px;
}
.todos_page {
  /* border: 2px red solid; */
  height: 100vh;
  padding: 10px;
}

.dark_mode {
  background-color: #17202a;
}

.dark_mode_1 {
  background-color: #273746;
  color: white;
}

.todos_list {
  margin-left: 200px;
  border-radius: 15px;
  display: flex;
  text-align: left;
  background-color: #e1f5fa;
  position: relative;
  overflow: hidden;
  animation: up 1s;
}

.todos_left_side {
  width: 75%;
  border-right: 3px #76c2d3 dashed;
  padding: 15px;
}

.todos_right_side {
  width: 25%;
  padding: 15px;
}

.decor_1 {
  position: absolute;
  width: 300px;
  height: 300px;
  filter: blur(20px);
  opacity: 0.7;
  top: -100px;
  border-radius: 999px;
  right: 350px;
  background: linear-gradient(75deg, #a59ae8, #55d6f2);
}

.body_title {
  margin-top: 10px;
  text-shadow: 0px 5px 15px rgba(255, 255, 255, 0.2);
}

/* add todo block */
.add_todo_block {
  position: relative;
  padding: 15px;
  overflow: hidden;
  background: linear-gradient(45deg, #4fb7ce, #31b8b1);
  border-radius: 15px;
  margin-top: 5px;
  z-index: 1;
  box-shadow: 0px 10px 15px rgb(0, 0, 0, 0.2);
}

.show_error {
  color: rgb(148, 11, 11);
  font-weight: bold;
  font-size: 13px;
}

.list_icon {
  vertical-align: middle;
  font-size: 30px;
  margin-right: 7px;
}

.add_todo_block img {
  width: 15em;
  position: absolute;
  right: -20px;
  bottom: -80px;
  transition: 0.5s;
}

.add_todo_block:hover img {
  width: 16em;
}

.input_title {
  height: 40px;
  padding: 7px;
  border-radius: 50px;
  border: none;
  outline: none;
  width: 300px;
}

.input_title:focus {
  border: #27c38c 2px solid;
}

.input_todo {
  height: 40px;
  padding: 7px;
  border-radius: 35px;
  border: none;
  outline: none;
  width: 400px;
}

.bt_add_todo {
  width: 130px;
  height: 35px;
  border: none;
  font-size: 17px;
  font-weight: bold;
  color: #1b998f;
  border-radius: 100px;
  transition: 0.3s;
  box-shadow: 0px 5px 15px rgba(255, 255, 255, 0.2);
}

.bt_add_todo:hover {
  width: 150px;
}

/* Edit */
.edit_todo {
  transition: 0.3s;
  animation: up 1s;
}
.input_edit_title,
.input_edit_content {
  height: 35px;
  padding: 7px;
  border-radius: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
  border: none;
  outline: none;
  width: 400px;
}

.bt_edit {
  width: 100px;
  height: 30px;
  margin-top: 5px;
  margin-bottom: 5px;
  border: none;
  font-size: 13px;
  font-weight: bold;
  color: #1b998f;
  border-radius: 115px;
  transition: 0.3s;
  box-shadow: 0px 5px 5px rgba(255, 255, 255, 0.2);
}

.bt_cancel_edit {
  width: 100px;
  height: 30px;
  margin-top: 5px;
  margin-bottom: 5px;
  border: none;
  font-size: 13px;
  font-weight: bold;
  color: #1b998f;
  margin-left: 10px;
  border-radius: 115px;
  transition: 0.3s;
  box-shadow: 0px 5px 5px rgba(255, 255, 255, 0.2);
}

.bt_edit:hover,
.bt_cancel_edit:hover {
  width: 120px;
}

/* 
Show all to do */
.all_todo {
  padding-top: 10px;
  padding-bottom: 10px;
  height: 310px;
  overflow-y: scroll;
  padding-right: 5px;
  z-index: 2;
}

.all_todo::-webkit-scrollbar {
  width: 5px;
}

.all_todo::-webkit-scrollbar-thumb {
  background-color: rgba(163, 163, 163, 0.5);
  border-radius: 5px;
}

.todo_bar {
  display: flex;
  justify-content: space-between;
  color: white;
  background: linear-gradient(45deg, #4fb7ce, #31b8b1);
  border-radius: 10px;
  padding: 7px;
  margin-bottom: 10px;
  box-shadow: 0px 5px 5px rgb(0, 0, 0, 0.2);
}

.right_content_bar h4 {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.right_content_bar p {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.right_content_bar {
  width: 80%;
  overflow: hidden;
}

.right_icon_bar {
  width: 20%;
  text-align: right;
}

.delete_icon,
.edit_icon,
.check_icon,
.info_icon {
  font-size: 25px;
  margin-top: 5px;
  margin-left: 5px;
}

.edit_icon:hover {
  color: #ffef42;
}

.info_icon:hover {
  color: #ff7ff9;
}

.check_icon:hover {
  color: #42ff52;
}

.delete_icon:hover {
  color: rgb(255, 107, 107);
}

/* confirm delete todo */
.confirm_delete_todo {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(0, 0, 0, 0.3);
  z-index: 2;
}

.card_confirm {
  text-align: center;
  padding: 20px;
  background: linear-gradient(45deg, #4fb7ce, #31b8b1);
  border-radius: 15px;
  box-shadow: 0px 0px 15px rgb(0, 0, 0, 0.3);
  color: white;
  animation: up 1s;
}

.card_confirm button {
  padding: 10px;
  width: 130px;
  margin-top: 15px;
  margin-right: 20px;
  background-color: rgb(255, 255, 255, 0.9);
  border-radius: 100px;
  box-shadow: 0px 0px 15px rgb(0, 0, 0, 0.2);
  border: none;
  transition: 0.3s;
}

.card_confirm button:hover {
  transform: scale(1.1, 1.1);
}

/* Info popup */
.popup_info {
  position: fixed;
  padding: 30px;
  padding-top: 30px;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(0, 0, 0, 0.8);
  z-index: 2;
}

.card_info {
  line-height: 30px;
  text-align: left;
  width: 70%;
  height: 300px;
  padding: 20px;
  background: linear-gradient(45deg, #4fb7ce, #31b8b1);
  border-radius: 15px;
  box-shadow: 0px 0px 15px rgb(0, 0, 0, 0.3);
  color: white;
  overflow-y: scroll;
  animation: up 1s;
}

.card_info h2 {
  text-align: center;
  margin-bottom: 15px;
}

.card_info i {
  font-size: 25px;
  vertical-align: middle;
}

.card_info::-webkit-scrollbar {
  width: 5px;
}

.card_info::-webkit-scrollbar-thumb {
  background-color: rgba(163, 163, 163, 0.5);
  border-radius: 5px;
}

.card_info p {
  word-wrap: break-word;
}

.card_info button {
  padding: 10px;
  width: 100px;
  margin-left: auto;
  margin-right: auto;
  display: block;
  margin-top: 15px;
  background-color: rgb(255, 255, 255, 0.9);
  border-radius: 100px;
  box-shadow: 0px 0px 15px rgb(0, 0, 0, 0.2);
  border: none;
  transition: 0.3s;
}

.card_info button:hover {
  transform: scale(1.1, 1.1);
}

/* Report data side */
.todos_right_side {
  text-align: center;
}

.illustrates {
  margin-top: 5px;
  margin-bottom: 15px;
  position: relative;
  padding: 15px;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(45deg, #4fb7ce, #47cec7);
  box-shadow: 0px 5px 15px rgb(0, 0, 0, 0.2);
  overflow: hidden;
}


.illustrates img{
  width: 13em;
}

.percen{
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 17px;
  opacity: 0.8;
}

.percen i{
  font-size: 40px;
  vertical-align: middle;
  margin-bottom: 3px;
}

.data {
  text-align: center;
  color: white;
  padding: 10px;
  border-radius: 15px;
  background: linear-gradient(45deg, #4fb7ce, #47cec7);
  line-height: 30px;
  box-shadow: 0px 5px 15px rgb(0, 0, 0, 0.2);
  z-index: 2;
}

.data i {
  font-size: 40px;
  vertical-align: middle;
  margin-bottom: 3px;
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
