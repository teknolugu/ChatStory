<template>
  <div class="py-6 lg:py-12 container">
    <p class="lg:text-2xl text-xl font-semibold">Settings</p>
    <div class="lg:mt-8 flex flex-col lg:flex-row items-start">
      <ui-select
        block
        :model-value="activeTab"
        class="mt-2 lg:hidden max-w-md w-full mb-8"
        @change="activeTab = $event"
      >
        <option v-for="tab in tabs" :key="tab.id" :value="tab.id">{{ tab.name }}</option>
      </ui-select>
      <ui-list class="w-64 space-y-2 mr-8 hidden lg:block">
        <ui-list-item
          v-for="tab in tabs"
          :key="tab.id"
          class="text-gray-600 cursor-pointer"
          :active="activeTab === tab.id"
          @click="activeTab = tab.id"
        >
          <ui-icon :name="tab.icon"></ui-icon>
          <span class="ml-3">{{ tab.name }}</span>
        </ui-list-item>
      </ui-list>
      <ui-card class="w-full">
        <component :is="`setting-${activeTab}`"></component>
      </ui-card>
    </div>
  </div>
</template>
<route>
{
  meta: {
    middleware: 'auth'
  }
}
</route>
<script>
import { onMounted, shallowRef } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@vueuse/head';
import SettingProfile from '@/components/settings/SettingProfile.vue';

export default {
  components: { SettingProfile },
  setup() {
    const tabs = [{ icon: 'user', name: 'Profile', id: 'profile' }];
    const route = useRoute();

    const activeTab = shallowRef('profile');

    useHead({
      title: 'Settings',
    });

    onMounted(() => {
      const { tab } = route.query;
      const isTabExist = tabs.some(({ id }) => tab === id);

      if (isTabExist) {
        activeTab.value = tab;
      }
    });

    return {
      tabs,
      activeTab,
    };
  },
};
</script>
