<template>
  <ui-modal :model-value="state.show" content-class="max-w-sm" persist>
    <template #header>
      <h3 class="font-semibold text-lg">{{ state.options.title }}</h3>
    </template>
    <ui-input
      v-if="state.type === 'prompt'"
      v-model="state.input"
      :placeholder="state.options.placeholder"
      :label="state.options.label"
    ></ui-input>
    <p v-else class="text-gray-600">{{ state.options.body }}</p>
    <div class="mt-8 flex space-x-2">
      <ui-button class="w-6/12" @click="fireCallback('onCancel')">
        {{ state.options.cancelText }}
      </ui-button>
      <ui-button
        class="w-6/12"
        :variant="state.options.okVariant"
        @click="fireCallback('onConfirm')"
      >
        {{ state.options.okText }}
      </ui-button>
    </div>
  </ui-modal>
</template>
<script>
import { reactive, watch } from 'vue';
import emitter from 'tiny-emitter/instance';

export default {
  setup() {
    const state = reactive({
      show: false,
      type: '',
      input: '',
      options: {
        html: false,
        body: '',
        title: '',
        placeholder: '',
        label: '',
        okText: 'Confirm',
        okVariant: 'primary',
        cancelText: 'Cancel',
        onConfirm: null,
        onCancel: null,
      },
    });

    emitter.on('show-dialog', (type, options) => {
      state.type = type;
      state.options = {
        ...state.options,
        ...options,
      };

      state.show = true;
    });

    function fireCallback(type) {
      const callback = state.options[type];
      const param = state.type === 'prompt' ? state.input : true;

      if (callback) callback(param);

      state.show = false;
    }
    function keyupHandler({ code }) {
      if (code === 'Enter') {
        fireCallback('onConfirm');
      } else if (code === 'Escape') {
        fireCallback('onCancel');
      }
    }

    watch(
      () => state.show,
      (value) => {
        if (value) {
          window.addEventListener('keyup', keyupHandler);
        } else {
          window.removeEventListener('keyup', keyupHandler);
        }
      }
    );

    return {
      state,
      fireCallback,
    };
  },
};
</script>
