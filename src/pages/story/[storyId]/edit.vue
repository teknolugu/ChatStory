<template>
  <div class="editor">
    <div v-if="state.loading" class="py-10 text-center">
      <ui-spinner size="36"></ui-spinner>
    </div>
    <template v-else>
      <editor-nav
        v-model:activeTab="state.activeTab"
        v-bind="{ story, validation }"
        :loading="state.loading"
        :story="story"
        @showPreview="state.showPreview = true"
      ></editor-nav>
      <main class="h-screen" style="padding-top: 95px">
        <keep-alive>
          <component :is="state.activeTab"></component>
        </keep-alive>
      </main>
      <ui-modal v-model="state.showPreview" custom-content>
        <chats-container :story-id="storyId">
          <template #header>
            <div class="flex-grow"></div>
            <ui-icon name="x" class="cursor-pointer" @click="state.showPreview = false"></ui-icon>
          </template>
        </chats-container>
      </ui-modal>
    </template>
  </div>
</template>
<route>
{
  name: 'edit-story',
  meta: {
    middleware: 'auth'
  }
}
</route>
<script>
import { shallowReactive, onMounted, computed } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { useVuelidate } from '@vuelidate/core';
import { fetchAPI } from '@/utils/auth';
import Story from '@/models/story';
import Style from '@/models/style';
import EditorNav from '@/components/editor/EditorNav.vue';
import EditorStory from '@/components/editor/EditorStory/index.vue';
import EditorCharacters from '@/components/editor/EditorCharacters.vue';
import EditorStyle from '@/components/editor/EditorStyle/index.vue';
import EditorDetails from '@/components/editor/EditorDetails.vue';
import ChatsContainer from '@/components/chats/Container.vue';

export default {
  components: {
    EditorNav,
    EditorStory,
    EditorCharacters,
    EditorStyle,
    EditorDetails,
    ChatsContainer,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const validation = useVuelidate({}, {}, { $scope: 'detail' });

    const storyId = router.currentRoute.value.params.storyid;

    const state = shallowReactive({
      activeTab: 'editor-details',
      showPreview: false,
      loading: true,
      showAlert: false,
    });

    const story = computed(() => Story.query().withAll().where('id', storyId).first());
    const user = computed(() => store.state.user);

    onMounted(async () => {
      try {
        state.loading = true;

        if (!story.value || !story.value.isDataRetrieved) {
          const result = await fetchAPI(`/story/${storyId}?withData=true`);

          if (result.author.username !== user.value.username) {
            return router.replace(result.isPublished ? `/story/${storyId}` : '/404');
          }

          const { data } = result;

          delete result.data;

          if (!data.style) {
            await Style.insertOrUpdate({
              data: {
                storyId,
              },
            });
          }

          await Story.insertOrUpdate({
            data: {
              ...result,
              ...data,
              isDataRetrieved: true,
            },
          });
        }

        state.loading = false;
        state.showAlert = true;
      } catch (error) {
        console.error(error);
      }
    });
    onBeforeRouteLeave((to, from) => {
      if (!state.showAlert) return true;

      const answer = window.confirm('Do you really want to leave? you have unsaved changes!');

      if (!answer) return false;
      else window.location.pathname = to.path;
    });

    return {
      story,
      state,
      storyId,
      validation,
    };
  },
};
</script>
