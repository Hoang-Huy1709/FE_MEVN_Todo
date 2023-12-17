

// auth.js
import { reactive } from 'vue';

const state = reactive({
  isLoggedIn: false,
});

export default {
  state,
  setIsLoggedIn(value) {
    state.isLoggedIn = value;
  },
};