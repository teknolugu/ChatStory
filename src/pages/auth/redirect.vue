<template>
  <p>Redirect...</p>
</template>
<script>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import auth from '@/utils/auth';

export default {
  setup() {
    const router = useRouter();

    onMounted(async () => {
      try {
        const { email, state } = router.currentRoute.value.query;

        if (email) {
          await auth.fetchProfile();
        }

        if (state) {
          await auth.handleSignInRedirect();
        }

        router.replace('/');
      } catch (error) {
        console.error(error);
      }
    });
  },
};
</script>
