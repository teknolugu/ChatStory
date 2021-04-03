<template>
  <div class="flex overflow-auto h-screen">
    <section
      class="w-[450px] bg-gradient-to-br from-purple-500 to-indigo-500 text-white px-12 py-24"
    >
      <p class="mb-6">Logo</p>
      <h3 class="text-2xl font-semibold">A few clicks away to start create your own story</h3>
    </section>
    <section class="flex flex-1 items-center justify-center overflow-auto relative">
      <div class="inline-block w-full md:max-w-md py-12">
        <router-view></router-view>
        <template v-if="['auth', 'auth-register'].includes($route.name)">
          <hr class="my-8 divider text-center relative overflow-visible" />
          <ui-button class="w-full" @click="continueWithGoogle">
            <img :src="googleLogoSvg" alt="google logo" class="w-6 mr-4" />
            Continue with google
          </ui-button>
        </template>
      </div>
    </section>
  </div>
</template>
<script>
import auth from '@/utils/auth';
import googleLogoSvg from '../assets/svg/google-logo.svg';

export default {
  setup() {
    function continueWithGoogle() {
      auth.signInWithProvider('google.com');
    }

    return {
      googleLogoSvg,
      continueWithGoogle,
    };
  },
};
</script>
<style scoped>
.divider:after {
  content: 'Or';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  @apply bg-gray-50 py-2 px-4 text-gray-500;
}
</style>
