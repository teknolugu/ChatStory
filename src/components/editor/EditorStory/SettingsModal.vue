<template>
  <ui-modal v-model="showModal" content-class="max-w-sm">
    <template #header>
      <span class="font-semibold text-lg">Settings</span>
    </template>
    <form @submit.prevent="saveData">
      <ui-input
        v-model="v$.backgroundMusic.$model"
        label="Background music"
        placeholder="https://example.com/music.mp3"
        block
        :error="v$.backgroundMusic.$dirty && v$.backgroundMusic.$invalid"
        :error-message="v$.backgroundMusic.$silentErrors[0]?.$message"
      ></ui-input>
      <ui-input
        v-model="v$.chatDelay.$model"
        placeholder="500"
        label="Chat delay (ms)"
        type="number"
        block
        class="mt-2"
        :error="v$.chatDelay.$dirty && v$.chatDelay.$invalid"
        :error-message="v$.chatDelay.$silentErrors[0]?.$message"
      ></ui-input>
      <ui-checkbox v-model="settings.autoPlay" class="mt-4"> Auto play chat </ui-checkbox>
      <ui-button class="w-full mt-8" variant="primary" :disabled="v$.$invalid" type="submit">
        Save
      </ui-button>
    </form>
  </ui-modal>
</template>
<script>
import { ref, shallowReactive, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { url, minValue, maxValue } from '@vuelidate/validators';
import emitter from 'tiny-emitter/instance';
import Setting from '@/models/setting';

export default {
  setup() {
    const route = useRoute();

    const showModal = ref(false);
    const settings = shallowReactive({
      backgroundMusic: '',
      chatDelay: 500,
      autoPlay: true,
    });

    const storyId = route.params.storyid;

    const rules = {
      backgroundMusic: {
        url,
      },
      chatDelay: {
        minValue: minValue(500),
        maxValue: maxValue(10000),
      },
    };
    const v$ = useVuelidate(rules, settings);

    function saveData() {
      v$.value.$touch();

      if (v$.value.$invalid) return;

      Setting.update({
        where: (setting) => setting.storyId === storyId,
        data: settings,
      });

      showModal.value = false;
    }

    emitter.on('settings-modal', () => {
      showModal.value = true;
    });

    watch(showModal, (value) => {
      if (value) {
        const data = Setting.query().where('storyId', route.params.storyid).first();

        if (data) {
          delete data.$id;
          delete data.id;

          Object.assign(settings, data);
        } else {
          Setting.insert({
            data: {
              storyId: route.params.storyId,
            },
          });
        }
      }
    });

    return {
      v$,
      settings,
      saveData,
      showModal,
    };
  },
};
</script>
