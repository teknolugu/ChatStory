<template>
  <ui-modal v-model="showModal" content-class="max-w-sm">
    <template #header>
      <span class="font-semibold text-lg">Settings</span>
    </template>
    <div class="space-y-2">
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
        :error="v$.chatDelay.$dirty && v$.chatDelay.$invalid"
        :error-message="v$.chatDelay.$silentErrors[0]?.$message"
      ></ui-input>
    </div>
    <ui-button class="w-full mt-12" variant="primary" :disabled="v$.$invalid" @click="saveData">
      Save
    </ui-button>
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
    });

    const storyId = route.params.storyid;

    const rules = {
      backgroundMusic: {
        url,
      },
      chatDelay: {
        minValue: minValue(500),
        maxValue: maxValue(1000),
      },
    };
    const v$ = useVuelidate(rules, settings);

    function saveData() {
      if (v$.$invalid) return;

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

        delete data.$id;
        delete data.id;

        Object.assign(settings, data);
      }
    });

    return {
      v$,
      saveData,
      showModal,
    };
  },
};
</script>
