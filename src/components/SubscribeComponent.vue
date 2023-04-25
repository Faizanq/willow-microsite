<template>
  <div class="w-full h-screen flex">
    <div class="w-3/5 flex flex-col items-center justify-center py-16 gap-20">
      <div class="text-primary">
        <img src="/src/assets/logo.svg" alt="#" />
      </div>
      <div class="m-auto">
        <button
          class="cursor-pointer banner_btnbanner_btn w-[165px] lg:w-[235px] 2xl:w-[255px] h-[30] 2xl:h-[56px] leading-[24px] font-semibold text-[20px] py-2 px-6 rounded-lg border-blue-900 bg-blue-900 text-white border border-solid hover:text-blue-900 hover:border hover:border-solid hover:duration-300 hover:bg-white"
        >
          <a :href="subcriptionUrl" target="_blank">Subscribe</a>
        </button>
      </div>
      <div class="m-auto text-center space-y-4">
        <button
          class="cursor-pointer banner_btn w-max cursor-pointer p-3 rounded-full border-blue-800 bg-green-500 text-white"
          @click="refreshPage"
          >
          <!-- fill="currunt" -->
          <svg
            class="h-6 w-6 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.91 4.09a1 1 0 0 0-1.07.16l-1.36 1.21A9.81 9.81 0 0 0 12 2a10 10 0 1 0 9.42 13.33 1 1 0 0 0-1.89-.66A8 8 0 1 1 12 4a7.86 7.86 0 0 1 6 2.78l-1.66 1.47a1 1 0 0 0-.27 1.11A1 1 0 0 0 17 10h4.5a1 1 0 0 0 1-1V5a1 1 0 0 0-.59-.91Z"
              fill="white"
            ></path>
          </svg>
        </button>

        <p class="text-blue-800 text-[18px] font-medium">
          After successful subscripstion <br />
          please refresh your page to Watch live.
        </p>
      </div>
    </div>

    <div class="w-2/5">
      <img
        class="h-full w-full object-cover"
        src="/src/assets/banner.png"
        alt=""
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import CONSTANTS from "@/helpers/constants.js";

const subcriptionUrl = CONSTANTS.SUBCRIPTION_URL;

export default defineComponent({
  name: "Subscribe",
  components: {},
  data() {
    return {
      subcriptionUrl,
    };
  },
  methods: {
    onSubscribe() {
      console.log("onSubscribe Called...!", this.subcriptionUrl);
      window.location = `${this.subcriptionUrl}`;
      console.log("window.location...!", window.location);
      // this.$emit("onSubscribeEvent");
    },
    refreshPage() {
      // window.location.reload();
    }
  },
});
</script>
