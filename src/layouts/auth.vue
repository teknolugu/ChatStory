<template>
  <div class="flex h-screen items-stretch overflow-auto">
    <div class="w-[450px] bg-primary sticky top-0">
      <p></p>
    </div>
    <div class="flex flex-1 items-center justify-center py-6">
      <div class="inline-block w-full md:max-w-md">
        <router-view></router-view>
        <template v-if="['auth', 'auth-register'].includes($route.name)">
          <hr class="my-8 divider text-center relative overflow-visible" />
          <ui-button class="w-full text-white" style="background-color: #4285f4">
            <ui-icon name="google" view-box="0 0 24 24" class="mr-2"></ui-icon>
            Continue with google
          </ui-button>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    console.log(this.$router);
  },
};
</script>
