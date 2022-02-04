import { defineStore } from "pinia";

export default defineStore("user", {
  state: () => {
    return {
      user: "selam",
      token: null,
      error: null,
      loading: false,
    };
  },
  actions: {
    login(username) {
      this.user = username;
    },
  },
});
