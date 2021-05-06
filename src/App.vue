<template>
  <div class="app text-gray-800">
    <app-nav v-if="!excludeNav.test($route.name)"></app-nav>
    <main>
      <router-view></router-view>
    </main>
    <ui-dialog></ui-dialog>
  </div>
</template>
<script>
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import AppNav from './components/app/AppNav.vue';
import Story from './models/story';
import { nodesData } from './utils/shared';

export default {
  components: { AppNav },
  setup() {
    const store = useStore();
    const excludeNav = /edit-story|auth/;

    store.dispatch('retrieveData');

    return {
      excludeNav,
    };
  },
};
</script>
