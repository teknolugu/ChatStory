<template>
  <label :class="[block ? 'block' : 'inline-block']">
    <span v-if="label" class="text-gray-500 text-sm ml-2 block">{{ label }}</span>
    <textarea
      ref="textarea"
      v-bind="{ value: modelValue, placeholder, maxlength: max }"
      class="ui-textarea w-full ui-input rounded-xl border border-gray-200 transition bg-transparent focus:ring focus:ring-opacity-50"
      :class="[
        { 'overflow-hidden resize-none': autoresize },
        error
          ? 'focus:ring-red-500 focus:border-red-500 border-red-500'
          : 'focus:border-primary focus:ring-primary',
      ]"
      :style="{ height }"
      @input="emitValue"
    ></textarea>
    <div
      v-if="error || showDetail"
      class="text-sm ml-2 min-h-[1.5rem] flex items-start justify-between"
    >
      <span
        v-if="error && errorMessage"
        class="inline-block leading-tight text-red-500 flex-1 text-overflow"
        :title="errorMessage"
      >
        {{ errorMessage }}
      </span>
      <span v-if="max">{{ modelValue.length }}/{{ max }}</span>
    </div>
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
    height: {
      type: [Number, String],
      default: '',
    },
    max: [Number, String],
    error: Boolean,
    block: Boolean,
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
    function emitValue(event) {
      let { value } = event.target;
      const maxLength = Math.abs(props.max);

      if (value.length > maxLength) {
        value = value.slice(0, maxLength);
      }

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
