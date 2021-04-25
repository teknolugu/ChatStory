<template>
  <nav ref="nav" class="h-16 bg-white w-full z-50 transition relative">
    <div class="px-8 flex items-center h-full">
      <router-link to="/" class="text-lg"><b>Chat</b>Story</router-link>
      <ui-input
        v-model="state.search"
        placeholder="Search story"
        class="w-72 ml-8 hidden md:block"
        @keyup.enter="search"
      >
        <template #prepend>
          <ui-icon name="search" class="mr-1 text-gray-600" @click="search"></ui-icon>
        </template>
      </ui-input>
      <div
        v-if="state.showSearch"
        class="absolute bottom-0 w-full transform translate-y-[100%] left-0 bg-white px-8 pb-4 md:hidden"
      >
        <hr class="mb-4 mt-1" />
        <ui-input v-model="state.search" block placeholder="Search story" @keyup.enter="search">
          <template #prepend>
            <ui-icon name="search" class="mr-2 text-gray-600" @click="search"></ui-icon>
          </template>
        </ui-input>
      </div>
      <div class="flex-grow"></div>
      <ui-button icon class="mr-2 md:hidden" @click="state.showSearch = !state.showSearch">
        <ui-icon :name="state.showSearch ? 'x' : 'search'"></ui-icon>
      </ui-button>
      <template v-if="user">
        <ui-popover trigger="mouseenter click" class="mr-4">
          <template #trigger>
            <ui-img
              :src="user.photoURL ?? `https://ui-avatars.com/api/?name=Ahmad`"
              class="h-10 w-10 overflow-hidden rounded-full mt-1"
            />
          </template>
          <ui-button
            variant="primary"
            class="w-full mb-2 md:hidden"
            @click="state.newStoryModal = true"
          >
            <ui-icon name="plus" class="-ml-3"></ui-icon>
            <span class="ml-1">Story</span>
          </ui-button>
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
        <ui-button variant="primary" class="hidden md:block" @click="state.newStoryModal = true">
          <ui-icon name="plus" class="md:-ml-2"></ui-icon>
          <span class="ml-1">Story</span>
        </ui-button>
      </template>
      <template v-else>
        <router-link to="/auth/register">
          <ui-button variant="primary" class="hidden md:block"> Sign up </ui-button>
        </router-link>
        <ui-button tag="router-link" to="/auth" class="ml-2"> Sign in </ui-button>
      </template>
    </div>
    <new-story v-model="state.newStoryModal"></new-story>
  </nav>
</template>
<script>
import { computed, onMounted, onUnmounted, shallowReactive, watch } from 'vue';
import { useRouter, onBeforeRouteLeave } from 'vue-router';
import { useStore } from 'vuex';
import { debounce } from '@/utils/helper';
import NewStory from './NewStory.vue';
import auth from '@/utils/auth';

export default {
  components: { NewStory },
  setup() {
    const store = useStore();
    const router = useRouter();

    const state = shallowReactive({
      hide: true,
      search: '',
      showSearch: false,
      newStoryModal: false,
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
