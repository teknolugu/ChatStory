<template>
  <ui-modal v-model="showModal" content-class="max-w-sm">
    <template #header>
      <span class="font-semibold text-lg">Settings</span>
    </template>
    <ui-input
      v-model="v$.backgroundMusic.$model"
      label="Background music"
      placeholder="https://example.com/music.mp3"
      class="w-full"
      show-detail
      :error="v$.backgroundMusic.$dirty && v$.backgroundMusic.$invalid"
      :error-message="v$.backgroundMusic.$silentErrors[0]?.$message"
    ></ui-input>
    <ui-button class="w-full mt-8" variant="primary" :disabled="v$.$invalid"> Save </ui-button>
  </ui-modal>
</template>
<script>
import { ref, shallowReactive } from 'vue';
import emitter from 'tiny-emitter/instance';
import { useVuelidate } from '@vuelidate/core';
import { url } from '@vuelidate/validators';

export default {
  setup() {
    const showModal = ref(false);
    const settings = shallowReactive({
      backgroundMusic: '',
    });

    const rules = {
      backgroundMusic: {
        url,
      },
    };
    const v$ = useVuelidate(rules, settings);

    emitter.on('settings-modal', () => {
      showModal.value = true;
    });

    return {
      v$,
      showModal,
    };
  },
};
</script>
