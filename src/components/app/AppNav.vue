<template>
  <nav ref="nav" class="h-16 bg-white w-full z-50 transition">
    <div class="container flex items-center h-full">
      <p class="font-semibold text-lg">Myyy</p>
      <ui-input placeholder="Search..." class="w-72 ml-8">
        <template #prepend>
          <ui-icon name="search" class="mr-2 text-gray-600"></ui-icon>
        </template>
      </ui-input>
      <div class="flex-grow"></div>
      <template v-if="user">
        <ui-popover trigger="mouseenter click" class="mr-4">
          <template #trigger>
            <img src="https://picsum.photos/500" class="h-10 w-10 rounded-full mt-1" />
          </template>
          <ui-list class="w-48 text-gray-600">
            <ui-list-item small tag="router-link" to="/profile">
              <ui-icon name="user" class="mr-3"></ui-icon>
              My Profile
            </ui-list-item>
            <ui-list-item small tag="router-link" to="/settings?query=profile">
              <ui-icon name="pencil-alt" class="mr-3"></ui-icon>
              Edit Profile
            </ui-list-item>
            <hr class="my-2" />
            <ui-list-item small tag="router-link" to="/saved">
              <ui-icon name="bookmark" class="mr-3"></ui-icon>
              Saved Stories
            </ui-list-item>
            <hr class="my-2" />
            <ui-list-item small class="text-red-500">
              <ui-icon name="logout" class="mr-3"></ui-icon>
              Logout
            </ui-list-item>
          </ui-list>
        </ui-popover>
        <ui-button variant="primary">
          <ui-icon name="plus" class="mr-1 -ml-2"></ui-icon>
          <span>Story</span>
        </ui-button>
      </template>
      <ui-button v-else variant="primary"> Log in </ui-button>
    </div>
  </nav>
</template>
<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { debounce } from '@/utils/helper';

export default {
  setup() {
    const store = useStore();

    const user = computed(() => store.state.user);

    return {
      user,
    };
  },
};
</script>
