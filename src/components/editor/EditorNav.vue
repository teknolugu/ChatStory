<template>
  <nav class="bg-white z-50 w-full px-5 shadow-sm fixed top-0">
    <div class="nav-content py-2 flex items-center border-b border-gray-100">
      <p class="text-overflow mr-2">{{ story.title }}</p>
      <span
        v-if="!story.isPublished"
        class="inline-block px-2 py-1 bg-purple-500 mr-2 rounded-full text-sm text-white"
      >
        Draft
      </span>
      <div class="flex-grow"></div>
      <ui-popover v-if="validation.$errors.length !== 0" trigger="mouseenter click">
        <template #trigger>
          <ui-button icon color="bg-red-100" class="mr-2 text-red-500">
            <ui-icon name="exclamaction"></ui-icon>
          </ui-button>
        </template>
        <p class="mb-2">Errors</p>
        <ul class="list-disc ml-6 w-48">
          <li v-for="(error, index) in validation.$errors" :key="index">
            <span class="font-semibold capitalize">{{ error.$property }}:</span>
            <p>{{ error.$message }}</p>
          </li>
        </ul>
      </ui-popover>
      <ui-popover class="mr-2">
        <template #trigger>
          <ui-button icon>
            <ui-icon name="dots-vertical"></ui-icon>
          </ui-button>
        </template>
        <ui-list class="space-y-1">
          <ui-list-item
            v-if="story.isPublished"
            class="cursor-pointer"
            :disabled="state.loadingSetDraft"
            @click="setAsDraft"
          >
            Set as draft
          </ui-list-item>
          <ui-list-item class="cursor-pointer" @click="previewStory">Preview</ui-list-item>
        </ui-list>
      </ui-popover>
      <ui-button
        v-if="!story.isPublished"
        v-tooltip="'Save draft'"
        icon
        class="text-primary mr-2"
        :loading="state.saveBtn"
        :disabled="validation.$invalid"
        @click="updateStory(false, 'saveBtn')"
      >
        <ui-icon name="save" view-box="0 0 24 24"></ui-icon>
      </ui-button>
      <ui-button
        variant="primary"
        :loading="state.loadingPrimaryBtn"
        :disabled="validation.$invalid"
        @click="updateStory(true, 'loadingPrimaryBtn')"
      >
        {{ story.isPublished ? 'Update' : 'Publish' }}
      </ui-button>
    </div>
    <div class="nav-tab flex items-center text-sm">
      <button>
        <ui-icon
          v-show="activeTab === 'editor-story'"
          v-tooltip="'Show blocks'"
          name="view-grid"
          class="text-primary lg:hidden mr-2"
          @click="showBlocks"
        ></ui-icon>
      </button>
      <div class="flex-1 overflow-auto w-10/12 whitespace-nowrap">
        <div
          v-for="tab in tabs"
          :key="tab"
          class="tab px-4 py-2 transition whitespace-nowrap cursor-pointer capitalize inline-block"
          :class="[
            activeTab === tab.id
              ? 'border-b-2 border-primary text-primary'
              : 'text-gray-500 hover:text-gray-700',
          ]"
          @click="$emit('update:activeTab', tab.id)"
        >
          {{ tab.name }}
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
import { shallowReactive } from 'vue';
import { useToast } from 'vue-toastification';
import emitter from 'tiny-emitter/instance';
import Story from '@/models/story';
import { fetchAPI } from '@/utils/auth';
import { convertStoryObj } from '@/utils/helper';

export default {
  props: {
    activeTab: {
      type: String,
      default: '',
    },
    story: {
      type: Object,
      default: () => ({}),
    },
    validation: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['update:activeTab', 'showPreview'],
  setup(props, { emit }) {
    const tabs = [
      { id: 'editor-details', name: 'details' },
      { id: 'editor-story', name: 'story flow' },
      { id: 'editor-characters', name: 'characters' },
      { id: 'editor-style', name: 'chat style' },
    ];

    const toast = useToast();

    const state = shallowReactive({
      saveBtn: false,
      loadingPrimaryBtn: false,
      loadingSetDraft: false,
    });

    function previewStory() {
      emitter.emit('save-node', () => {
        emit('showPreview');
      });
    }
    function showBlocks() {
      emitter.emit('show-blocks');
    }
    function updateStory(isPublished, buttonId) {
      state[buttonId] = true;

      emitter.emit('save-node', async () => {
        try {
          const data = convertStoryObj(props.story);

          await fetchAPI(`/story/${props.story.id}`, {
            method: 'PATCH',
            body: JSON.stringify({
              ...data,
              isPublished,
            }),
          });

          if (isPublished) {
            await Story.update({
              where: props.story.id,
              data: {
                isPublished,
              },
            });
          }

          state[buttonId] = false;
        } catch (error) {
          state[buttonId] = false;
          toast.error('Something went wrong');
          console.error(error);
        }
      });
    }
    async function setAsDraft() {
      try {
        state.loadingSetDraft = true;

        await fetchAPI(`/story/${props.story.id}`, {
          method: 'PATCH',
          body: JSON.stringify({
            isPublished: false,
          }),
        });

        await Story.update({
          where: props.story.id,
          data: {
            isPublished: false,
          },
        });

        state.loadingSetDraft = false;
      } catch (error) {
        state.loadingSetDraft = false;
        toast.error('Something went wrong');
        console.error(error);
      }
    }

    return {
      tabs,
      state,
      showBlocks,
      setAsDraft,
      updateStory,
      previewStory,
    };
  },
};
</script>
