<template lang="">
  <div class="header">
    <div class="logo">
      <img src="../assets/images/logo_full.png" alt="" />
    </div>

    <div class="menu">
      <ul>
        <li>
          <router-link to="/">
            <i class='bx bx-category' ></i><br />
            HOME
          </router-link>
        </li>
        <li>
          <router-link to="/todos">
            <i class="bx bx-food-menu"></i><br />
            TODOS
          </router-link>
        </li>
        <li>
          <router-link to="/blogs">
            <i class='bx bx-book-bookmark'></i><br />
            BLOGS
          </router-link>
        </li>
        <li>
          <router-link to="/setting">
            <i class="bx bx-cog"></i><br />
            SETTING
          </router-link>
        </li>
      </ul>
    </div>

    <div class="bottom_header"></div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.header {
  position: fixed;
  left: 20px;
}

.logo {
  padding: 30px;
}

.logo img {
  width: 70px;
}

ul {
  padding: 10px;
  list-style: none;
}

i {
  font-size: 30px;
  transition: 0.3s;
}

i:hover{
  transform: rotate(20deg)
}

li {
  margin: 20px;
  padding: 20px;
  border-radius: 15px;
}

ul a {
  font-weight: bold;
  color: #363636;
  opacity: 0.7;
  text-decoration: none;
  font-size: 12px;
}

li:focus {
  background: #beffd8;
}


ul a.router-link-exact-active {
  color: #2da16d;
  opacity: 1;
  transition: 0.3s;
}
</style>
