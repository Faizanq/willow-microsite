<template>
  <div>
    <component
      :is="ComponentName"
      @onWatchLiveEvent="onWatchLiveEvent($event)"
      @logInEvent="onLoginEvent($event)"
      @onSubscribeEvent="onSubscribeEvent()"
    />
  </div>
</template>

<script>
import { defineComponent } from "vue";

import PreviewComponent from "@/components/PreviewComponent.vue";
import LoginComponent from "@/components/LoginComponent.vue";
import SubscribeComponent from "@/components/SubscribeComponent.vue";
import VideoComponent from "@/components/VideoComponent.vue";
import { useUserStore } from "@/stores/userStore.js";
// import { storeToRefs } from "pinia";

export default defineComponent({
  name: "Layout",
  components: {
    PreviewComponent,
    LoginComponent,
    SubscribeComponent,
    VideoComponent,
  },
  setup() {
    const userStore = useUserStore();
    // const { getLoggedInDetail, getSubScriberDetails } = storeToRefs(userStore);

    return {
      userStore,
      // getLoggedInDetail,
      // getSubScriberDetails,
    };
  },
  data() {
    return {
      ComponentName: "PreviewComponent",
      isLoading: false,
      isLoggedIn: false,
      isSubscribed: false,
    };
  },
  methods: {
    onWatchLiveEvent($event) {
      // check User loggedIn or Not
      console.log("onWatchLiveEvent $event = >>>>>> ", $event);
      this.isLoggedIn = $event.isLoggedIn;
      this.isSubscribed = $event.isSubscribed


      if (this.isLoggedIn && this.isSubscribed) {
        this.ComponentName = "VideoComponent";
      } else if (this.isLoggedIn && !this.isSubscribed) {
        this.ComponentName = "SubscribeComponent";
      } else {
        this.ComponentName = "LoginComponent";
      }

    },

    onLoginEvent($event) {
      this.isSubscribed = $event;
      this.ComponentName = this.isSubscribed
        ? "VideoComponent"
        : "SubscribeComponent";
    },

    onSubscribeEvent() {
      this.ComponentName = "LoginComponent";
    },
  },
});
</script>
