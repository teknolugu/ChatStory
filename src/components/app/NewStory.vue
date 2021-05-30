<template>
  <ui-modal :model-value="modelValue" @close="close">
    <template #header>
      <p>Add Story</p>
    </template>
    <div
      class="h-36 bg-gray-100 bg-cover bg-center bg-no-repeat rounded-xl overflow-hidden"
      :style="{ backgroundImage: `url(${tempImage.url})` }"
    >
      <label
        class="flex justify-center items-center text-center text-gray-600 h-full w-full flex-col cursor-pointer"
        :class="{ 'bg-black bg-opacity-25 text-white': tempImage.url }"
      >
        <div class="bg-black bg-opacity-10 p-4 mb-2 rounded-full inline-block">
          <ui-icon name="upload"></ui-icon>
        </div>
        <p>Upload image</p>
        <input
          ref="fileForm"
          accept="image/png, .jpg, .jpeg, image/gif"
          type="file"
          class="hidden"
          @change="handleFileChange"
        />
      </label>
    </div>
    <p class="mb-4 text-sm mt-1">Banner Image (max. size 240KB)</p>
    <form @submit.prevent="addStory">
      <ui-input
        v-model="v$.title.$model"
        label="Title"
        block
        :error="v$.title.$dirty && v$.title.$invalid"
        :error-message="v$.title.$silentErrors[0]?.$message"
        class="mb-2"
      ></ui-input>
      <ui-textarea
        v-model="v$.description.$model"
        label="Description"
        block
        :error="v$.description.$dirty && v$.description.$invalid"
        :error-message="v$.description.$silentErrors[0]?.$message"
      ></ui-textarea>
      <ui-button :loading="loading" variant="primary" class="w-full mt-6" type="submit">
        Add Story
      </ui-button>
    </form>
  </ui-modal>
</template>
<script>
import { shallowReactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { url, required, minLength, maxLength } from '@vuelidate/validators';
import { useToast } from 'vue-toastification';
import { fetchAPI } from '@/utils/auth';
import upload from '@/utils/upload';
import Story from '@/models/story';

export default {
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const initialState = {
      title: '',
      description: '',
      bannerImage: '',
    };

    const router = useRouter();
    const toast = useToast();

    const loading = ref(false);
    const tempImage = shallowReactive({
      url: '',
      file: null,
    });
    const state = shallowReactive(initialState);

    const rules = {
      title: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(120),
      },
      description: {
        required,
        minLength: minLength(30),
        maxLength: maxLength(1024),
      },
    };
    const v$ = useVuelidate(rules, state);

    function close() {
      emit('update:modelValue', false);
    }
    async function addStory() {
      v$.value.$touch();

      if (v$.value.$invalid) return;

      loading.value = true;

      try {
        if (tempImage.file) {
          const { imageUrl } = await upload.image(tempImage.file);
          state.bannerImage = imageUrl;
        } else {
          state.bannerImage = 'https://picsum.photos/500';
        }

        const story = await fetchAPI('/story', { method: 'POST', body: JSON.stringify(state) });

        await Story.insert({
          data: {
            ...state,
            id: story.id,
            setting: {},
            style: {},
          },
        });

        Object.assign(state, initialState);
        Object.assign(tempImage, { file: null, url: '' });

        loading.value = false;
        router.push(`/story/${story.id}/edit`);
        close();
      } catch (error) {
        loading.value = false;
        toast.error(error.message || error);
        console.error(error);
      }
    }
    function handleFileChange({ target }) {
      const [file] = target.files;

      if (file) {
        tempImage.file = file;
        tempImage.url = URL.createObjectURL(file);
      }
    }

    return {
      v$,
      state,
      close,
      loading,
      addStory,
      tempImage,
      handleFileChange,
    };
  },
};
</script>
