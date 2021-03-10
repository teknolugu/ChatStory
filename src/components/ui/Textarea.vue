<template>
  <label class="inline-block">
    <span v-if="label" class="text-gray-500 text-sm ml-2 block">{{ label }}</span>
    <textarea
      ref="textarea"
      v-bind="{ value: modelValue, placeholder }"
      class="ui-textarea w-full ui-input rounded-xl border border-gray-200 transition bg-transparent focus:ring focus:ring-opacity-50"
      :class="[
        { 'overflow-hidden resize-none': autoresize },
        error
          ? 'focus:ring-red-500 focus:border-red-500 border-red-500'
          : 'focus:border-primary focus:ring-primary',
      ]"
      @input="emitValue"
    ></textarea>
    <span
      v-if="(error && errorMessage) || showDetail"
      class="text-sm ml-2 h-6 inline-block text-red-500"
    >
      {{ errorMessage }}
    </span>
  </label>
</template>
<script>
import { ref, onMounted } from 'vue';

export default {
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    autoresize: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
      default: '',
    },
    error: Boolean,
    showDetail: Boolean,
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const textarea = ref(null);

    function calcHeight() {
      if (!props.autoresize) return;

      textarea.value.style.height = 'auto';
      textarea.value.style.height = `${textarea.value.scrollHeight}px`;
    }
    function emitValue({ target }) {
      const { value } = target;

      emit('update:modelValue', value);
      emit('change', value);
      calcHeight();
    }

    onMounted(calcHeight);

    return {
      textarea,
      emitValue,
    };
  },
};
</script>
