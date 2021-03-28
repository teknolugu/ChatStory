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

    onMounted(() => {
      const { email } = router.currentRoute.query;

      if (email) {
        auth.fetchProfile();
      }
    });
  },
};
</script>
