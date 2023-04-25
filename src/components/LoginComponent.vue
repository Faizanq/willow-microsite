<template>
  <div class="w-full h-screen flex">
    <div class="w-3/5 flex flex-col items-center justify-center py-20">
      <div class="text-gray-900z">
        <img src="/src//assets/logo.svg" alt="#" />
      </div>
      <div class="m-auto space-y-16">
        <form
          action="https://formspree.io/f/xoqzejlk"
          method="POST"
          class="flex flex-col gap-2 md:gap-4"
          @submit.prevent="onSubmit"
        >
          <div>
            <input
              class="w-full md:w-[426px] text-gray-800 border border-solid border-blue-800 rounded-lg p-[16px] text-[16px] focus:outline-none focus:border-b focus:border-secondary focus:border-solid"
              type="text"
              name="email"
              autocomplete="email"
              placeholder="e-mail"
              v-model="formData.emailId"
              :class="{
                'is-invalid': v$.formData.emailId.$errors.length,
              }"
            />
            <div
              class="invalid-feedback"
              v-for="error of v$.formData.emailId.$errors"
              :key="error.$uid"
            >
              {{ error.$message }}
            </div>
          </div>

          <div>
            <input
              class="w-full md:w-[426px] text-gray-800 border border-solid border-blue-800 rounded-lg p-[16px] text-[16px] focus:outline-none focus:border-b focus:border-secondary focus:border-solid"
              type="password"
              name="password"
              autocomplete="password"
              placeholder="password"
              v-model="formData.password"
              :class="{
                'is-invalid': v$.formData.password.$errors.length,
              }"
            />
            <div
              class="invalid-feedback"
              v-for="error of v$.formData.password.$errors"
              :key="error.$uid"
            >
              {{ error.$message }}
            </div>
          </div>
          <button
            class="cursor-pointer banner_btn w-max cursor-pointer leading-[24px] font-semibold text-[16px] py-2 px-6 rounded-lg border-blue-900 bg-blue-900 text-white border border-solid hover:text-blue-900 hover:border hover:border-solid hover:duration-300 hover:bg-white"
            type="submit"
          >
            Log in
            <!-- <a href="#"> Log in</a> -->
          </button>
        </form>
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
import useVuelidate from "@vuelidate/core";
import { required, email, minLength, helpers } from "@vuelidate/validators";
import { useUserStore } from "@/stores/userStore.js";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "LogIn",
  components: {},
  setup() {
    const userStore = useUserStore();
    const { getLoggedInDetail, getSubScriberDetails } = storeToRefs(userStore);

    return {
      v$: useVuelidate(),
      userStore,
      getLoggedInDetail,
      getSubScriberDetails,
    };
  },
  data() {
    return {
      formData: {
        emailId: "",
        password: "",
      },
    };
  },
  validations() {
    return {
      formData: {
        emailId: {
          required: helpers.withMessage("Please enter email address", required),
          email: helpers.withMessage("Please enter valid email address", email),
        },
        password: {
          required: helpers.withMessage("Please enter password", required),
          min: minLength(6),
        },
      },
    };
  },

  methods: {
    async onSubmit() {
      this.v$
        .$validate()
        .then(async (isValid) => {
          if (isValid) {
            let apiData = {};
            apiData["emailId"] = this.formData.emailId;
            apiData["password"] = this.formData.password;
            apiData["subcription"] = true;

            // When User LogIn:
            this.userStore.onLogIn(apiData);

            // TODO:: after logIn check user has Subcription or not :
            
            if (this.getLoggedInDetail) {
              console.log("this.getSubScriberDetails::", this.getSubScriberDetails);
              this.$emit("logInEvent",this.getSubScriberDetails );
            }
          }
        })
        .catch((error) => {
          console.log("error: ", error);
        });
    },
  },
});
</script>

<style>
.invalid-feedback {
  color: #d91515;
  font-weight: 500;
}
</style>
