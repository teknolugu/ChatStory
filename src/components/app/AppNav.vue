<template>
  <nav ref="nav" class="h-16 bg-white w-full z-50 transition">
    <div class="px-8 flex items-center h-full">
      <p class="font-semibold text-lg">Myyy</p>
      <ui-input
        v-model="state.search"
        placeholder="Search..."
        class="w-72 ml-8"
        @keyup.enter="search"
      >
        <template #prepend>
          <ui-icon name="search" class="mr-2 text-gray-600" @click="search"></ui-icon>
        </template>
      </ui-input>
      <div class="flex-grow"></div>
      <template v-if="user">
        <ui-popover trigger="mouseenter click" class="mr-4">
          <template #trigger>
            <ui-img
              :src="user.photoURL ?? `https://ui-avatars.com/api/?name=Ahmad`"
              class="h-10 w-10 overflow-hidden rounded-full mt-1"
            />
          </template>
          <ui-list class="w-48 text-gray-600">
            <ui-list-item small tag="router-link" :to="`/user/${user.username}`">
              <ui-icon name="user" class="mr-3"></ui-icon>
              My Profile
            </ui-list-item>
            <ui-list-item small tag="router-link" to="/settings?tab=profile">
              <ui-icon name="pencil-alt" class="mr-3"></ui-icon>
              Edit Profile
            </ui-list-item>
            <hr class="my-2" />
            <ui-list-item small tag="router-link" to="/collection">
              <ui-icon name="bookmark" class="mr-3"></ui-icon>
              My Collection
            </ui-list-item>
            <ui-list-item small tag="router-link" to="/draft">
              <ui-icon name="document-text" class="mr-3"></ui-icon>
              Story Draft
            </ui-list-item>
            <hr class="my-2" />
            <ui-list-item small class="text-red-500 cursor-pointer" @click="signOut">
              <ui-icon name="logout" class="mr-3"></ui-icon>
              Sign out
            </ui-list-item>
          </ui-list>
        </ui-popover>
        <ui-button variant="primary">
          <ui-icon name="plus" class="md:-ml-2"></ui-icon>
          <span class="ml-1 hidden md:block">Story</span>
        </ui-button>
      </template>
      <template v-else>
        <ui-button variant="primary" tag="router-link" to="/auth/register"> Sign up </ui-button>
        <ui-button tag="router-link" to="/auth" class="ml-2"> Sign in </ui-button>
      </template>
    </div>
  </nav>
</template>
<script>
import { computed, onMounted, onUnmounted, shallowReactive, watch } from 'vue';
import { useRouter, onBeforeRouteLeave } from 'vue-router';
import { useStore } from 'vuex';
import { debounce } from '@/utils/helper';
import auth from '@/utils/auth';

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const state = shallowReactive({
      hide: true,
      search: '',
    });

    const user = computed(() => store.state.user);

    const scrollHandler = debounce(() => {
      if (router.currentRoute.value.name !== 'story-view') return;

      const position = window.pageYOffset;

      state.hide = position <= 50;
    }, 200);

    function signOut() {
      auth.signOut();

      setTimeout(() => {
        window.location.href = '/';
      }, 100);
    }
    function search() {
      router.push(`/search?q=${state.search}`);
    }

    onMounted(() => {
      window.addEventListener('scroll', scrollHandler);
      scrollHandler();
    });
    onUnmounted(() => {
      window.removeEventListener('scroll', scrollHandler);
      state.hide = false;
    });

    return {
      user,
      state,
      search,
      signOut,
    };
  },
};
</script>
<style scoped>
nav {
  transition: all 250ms ease;
}

nav.hide {
  transform: translateY(-100%);
}
</style>
