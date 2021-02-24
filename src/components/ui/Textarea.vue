<template>
  <label class="inline-block">
    <span v-if="label" class="text-gray-500 text-sm ml-2 block">{{ label }}</span>
    <textarea
      ref="textarea"
      v-bind="{ value: modelValue, placeholder }"
      :value="modelValue"
      class="ui-textarea w-full ui-input rounded-xl border border-gray-200 transition bg-transparent focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
      :class="{ 'overflow-hidden resize-none': autoresize }"
      @input="emitValue"
    ></textarea>
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
  },
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
