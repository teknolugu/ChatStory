<template>
  <ui-modal :model-value="modelValue" @close="close">
    <template #header>
      <p>Add Story</p>
    </template>
    <ui-img
      v-if="state.bannerImage"
      class="h-36 rounded-xl overflow-hidden mb-4"
      :src="state.bannerImage"
    />
    <form @submit.prevent="addStory">
      <ui-input
        v-model="v$.title.$model"
        label="Title"
        block
        :error="v$.title.$dirty && v$.title.$invalid"
        :error-message="v$.title.$silentErrors[0]?.$message"
        class="mb-2"
      ></ui-input>
      <ui-input
        v-model="v$.bannerImage.$model"
        label="Banner image"
        block
        placeholder="https://example.com/image.png"
        :error="v$.bannerImage.$dirty && v$.bannerImage.$invalid"
        :error-message="v$.bannerImage.$silentErrors[0]?.$message"
        class="mb-2"
      ></ui-input>
      <ui-textarea
        v-model="v$.description.$model"
        label="Description"
        block
        :error="v$.description.$dirty && v$.description.$invalid"
        :error-message="v$.description.$silentErrors[0]?.$message"
      ></ui-textarea>
      <ui-button :loading="loading" variant="primary" class="w-full mt-6" type="submit"
        >Add Story</ui-button
      >
    </form>
  </ui-modal>
</template>
<script>
import { shallowReactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { url, required, minLength, maxLength } from '@vuelidate/validators';
import { fetchAPI } from '@/utils/auth';
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
      bannerImage: 'https://picsum.photos/500',
    };

    const router = useRouter();

    const loading = ref(false);
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
      bannerImage: {
        required,
        url,
      },
    };
    const v$ = useVuelidate(rules, state);

    function close() {
      emit('update:modelValue', false);
    }
    function addStory() {
      v$.value.$touch();

      if (v$.value.$invalid) return;

      loading.value = true;

      fetchAPI('/story', {
        method: 'POST',
        body: JSON.stringify(state),
      })
        .then(async (story) => {
          await Story.insert({
            data: {
              ...state,
              id: story.id,
              setting: {},
              style: {},
            },
          });

          Object.assign(state, initialState);
          loading.value = false;
          router.push(`/story/${story.id}/edit`);
          close();
        })
        .catch((error) => {
          loading.value = false;
          console.error(error);
        });
    }

    return {
      v$,
      state,
      close,
      loading,
      addStory,
    };
  },
};
</script>
