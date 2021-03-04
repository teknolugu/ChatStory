<template>
  <label class="inline-block relative">
    <span v-if="label" class="text-gray-500 text-sm ml-2">{{ label }}</span>
    <div class="relative flex items-center">
      <ui-icon
        v-if="prependIcon"
        :name="prependIcon"
        class="ml-3 left-0 absolute text-gray-600"
      ></ui-icon>
      <input
        class="w-full ui-input rounded-xl border border-gray-200 transition bg-transparent focus:ring focus:ring-opacity-50"
        v-bind="{ value: modelValue, type, placeholder }"
        :class="[
          error
            ? 'focus:ring-red-500 focus:border-red-500 border-red-500'
            : 'focus:border-primary focus:ring-primary',
          { 'pr-10': appendIcon, 'pl-10': prependIcon },
        ]"
        @input="emitValue"
      />
      <ui-icon
        v-if="appendIcon"
        :name="appendIcon"
        class="mr-3 right-0-0 absolute text-gray-600"
      ></ui-icon>
    </div>
    <span v-if="error" class="text-sm ml-2 h-6 inline-block text-red-500">
      {{ errorMessage }}
    </span>
  </label>
</template>
<script>
export default {
  props: {
    modelValue: {
      type: [Number, String],
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    errorMessage: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    appendIcon: {
      type: String,
      default: '',
    },
    prependIcon: {
      type: String,
      default: '',
    },
    error: Boolean,
  },
  emits: ['update:modelValue', 'input', 'change'],
  setup(props, { emit }) {
    function emitValue({ target }) {
      emit('update:modelValue', target.value);
      emit('input', target.value);
      emit('change', target.value);
    }

    return {
      emitValue,
    };
  },
};
</script>
<style>
.ui-input__content:focus-within {
  @apply border-primary;
}
</style>
