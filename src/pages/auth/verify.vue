<template>
  <div class="verify text-center">
    <img :src="emailSentSVG" class="w-52 mx-auto" />
    <h2 class="font-semibold text-2xl mt-8 mb-2">Verify Your Email</h2>
    <p>An email has been sent to {{ $store.state.user.email }} with a link to verify your email.</p>
    <div class="actions mt-12">
      <ui-button variant="primary" :loading="loading" @click="resendEmail">Resend Email</ui-button>
      <ui-button class="ml-4" @click="signOut">Sign Out</ui-button>
    </div>
  </div>
</template>
<script>
import { shallowRef } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { useToast } from 'vue-toastification';
import auth from '@/utils/auth';
import emailSentSVG from '../../assets/svg/mail-sent.svg';

export default {
  setup() {
    const router = useRouter();
    const toast = useToast();
    const store = useStore();

    const loading = shallowRef(false);

    function signOut() {
      auth.signOut();
      router.replace('/');
    }
    function resendEmail() {
      loading.value = true;

      auth.sendOobCode('VERIFY_EMAIL', store.state.user.email).then(() => {
        loading.value = true;
        toast('Check your email inbox');
      });
    }

    return {
      loading,
      signOut,
      resendEmail,
      emailSentSVG,
    };
  },
};
</script>
