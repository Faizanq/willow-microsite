<template>
  <div
    class="w-full h-full flex items-center justify-center py-16 bg-[url('/src/assets/banner.png')] bg-no-repeat bg-cover"
  >
    <div class="flex flex-col items-center justify-center gap-10">
      <div class="text-red-700">
        <svg
          class="h-24 w-24 opacity-60 hover:opacity-90 bg-pramary fill-current cursor-pointer shadow-xl"
          viewBox="0 0 256 256"
          xmlns="http://www.w3.org/2000/svg"
          @click="onWatchLive"
        >
          <path fill="none" d="M0 0h256v256H0z"></path>
          <path
            d="m232.3 114.3-144-87.9a15.5 15.5 0 0 0-16.1-.3A15.8 15.8 0 0 0 64 40v176a15.8 15.8 0 0 0 8.2 13.9 15.5 15.5 0 0 0 16.1-.3l144-87.9a16 16 0 0 0 0-27.4Z"
          ></path>
        </svg>
      </div>
      <div class="m-auto text-center"></div>
      <button
        class="cursor-pointer text-sm font-semibold banner_btn w-[165px] lg:w-[235px] 2xl:w-[255px] h-[30] 2xl:h-[56px] cursor-pointer leading-[24px] text-[16px] 2xl:text-[18px] py-[10px] 2xl:py-[16px] border-red-700 bg-red-700 text-white rounded-lg border border-solid hover:text-red-700 hover:border hover:border-solid hover:duration-300 hover:bg-white hover:border-white"
        @click="onWatchLive"
      >
        Watch Live
        <!-- <a href="#"> Watch Live</a> -->
      </button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useUserStore } from "@/stores/userStore.js";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "Preview",
  components: {},
  setup() {
    const userStore = useUserStore();
    const { getLoggedInDetail, getSubScriberDetails } = storeToRefs(userStore);

    return { userStore, getLoggedInDetail, getSubScriberDetails };
  },
  data() {
    return {
      isLoggedIn: false,
      isSubscribed: false,
    };
  },
  methods: {
    onWatchLive() {
      // check User is LoggedIn or not from Store

      this.isLoggedIn = this.getLoggedInDetail ? this.getLoggedInDetail : false;
      this.isSubscribed = this.getSubScriberDetails
        ? this.getSubScriberDetails
        : false;

      let data = {
        isLoggedIn: this.isLoggedIn,
        isSubscribed: this.isSubscribed,
      };

      console.log("onWatchLive (Credential Data):", data);

      this.$emit("onWatchLiveEvent", data);
    },
    resetData() {
      this.userStore.resetDatafromStore();
    },
  },
  mounted() {
    this.resetData();
  },
});
</script>
