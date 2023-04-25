import { defineStore } from "pinia";
import CONSTANTS from "@/helpers/constants";

const users = CONSTANTS.USER_LIST;

export const useUserStore = defineStore("userStore", {
  state: () => ({
    userList: [],
    // user: JSON.parse(sessionStorage.getItem("user")),
    user: {},
    isLoggedIn: false,
    isSubscribed: false,
  }),
  getters: {
    getLoggedInDetail: (state) => state.isLoggedIn,
    getSubScriberDetails: (state) => state.isSubscribed,
  },
  actions: {
    onLogIn(apiData) {
      // api callling to find user
      const user = users.find(
        (ele) =>
          ele.emailId === apiData.emailId && ele.password === apiData.password
      );
      if (!user) {
        alert("emailId or password is incorrect");
        return false;
      } else {
        // Validate Subcription
        if (user.subcription) {
          this.isSubscribed = user.subcription ? user.subcription : false;
          console.log("isSubscribed",this.isSubscribed);
        }
        this.user = user;
        this.isLoggedIn = true;
      }
    },
    logout() {
      this.user = null;
      sessionStorage.removeItem("user");
      router.push("/login");
    },

    resetDatafromStore() {
      this.isLoggedIn = false;
      this.isSubscribed = false;
      this.user = {};
      sessionStorage.removeItem("user");
    },
  },
  persist: {
    storage: sessionStorage,
  },
});
