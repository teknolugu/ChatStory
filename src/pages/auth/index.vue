<template>
  <div>
    <ui-alert v-model="state.isError" dismissible variant="error" class="mb-6">
      Incorrect email or password
    </ui-alert>
    <h3 class="text-2xl font-semibold">Welcome back!</h3>
    <p class="text-gray-500">
      Don't have an account?
      <router-link to="/auth/register" class="text-primary underline cursor-pointer">
        Sign up
      </router-link>
    </p>
    <form class="mt-10" @submit.prevent="signIn">
      <ui-input
        v-model="formData.email"
        block
        label="Email"
        placeholder="example@mail.com"
      ></ui-input>
      <ui-input
        v-model="formData.password"
        block
        label="Password"
        type="password"
        placeholder="Enter your password"
        class="mt-6"
      >
        <template #label>
          <router-link
            to="/auth/forgot"
            class="float-right text-primary align-middle cursor-pointer"
          >
            Forgot your password?
          </router-link>
        </template>
      </ui-input>
      <ui-button
        class="mt-8 w-full"
        block
        type="submit"
        variant="primary"
        :loading="state.isLoading"
      >
        Sign in
      </ui-button>
    </form>
  </div>
</template>
<script>
import { shallowReactive, ref } from 'vue';
import auth from '@/utils/auth';

export default {
  setup() {
    const state = shallowReactive({
      isLoading: false,
      isError: false,
    });
    const formData = shallowReactive({
      email: '',
      password: '',
    });

    async function signIn() {
      try {
        state.isLoading = true;

        await auth.signIn(formData.email, formData.password);
        console.log(auth.user);
      } catch (error) {
        console.error(error);
        state.isLoading = false;
        state.isError = true;
      }
    }

    return {
      state,
      signIn,
      formData,
    };
  },
};
</script>
