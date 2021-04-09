<template>
  <div class="py-12 container">
    <p class="text-2xl font-semibold">Settings</p>
    <div class="mt-8 flex items-start">
      <ui-list class="w-64 space-y-2 mr-8">
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
      <ui-card class="flex-1">
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
import SettingProfile from '@/components/settings/SettingProfile.vue';

export default {
  components: { SettingProfile },
  setup() {
    const tabs = [{ icon: 'user', name: 'Profile', id: 'profile' }];
    const route = useRoute();

    const activeTab = shallowRef('profile');

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
