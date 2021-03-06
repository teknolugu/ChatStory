<template>
  <label class="inline-block relative">
    <span v-if="label" class="text-gray-500 text-sm ml-2">{{ label }}</span>
    <div class="relative flex items-center">
      <span v-if="$slots.prepend" class="ml-3 left-0 absolute inline-block">
        <slot name="prepend"></slot>
      </span>
      <input
        class="w-full ui-input rounded-xl border border-gray-200 transition bg-transparent focus:ring focus:ring-opacity-50"
        v-bind="{ value: modelValue, type, placeholder }"
        :class="[
          { 'hide-appearance': hideAppearance },
          error
            ? 'focus:ring-red-500 focus:border-red-500 border-red-500'
            : 'focus:border-primary focus:ring-primary',
          { 'pr-10': $slots.append, 'pl-10': $slots.prepend },
        ]"
        @input="emitValue"
      />
      <span v-if="$slots.append" class="mr-3 right-0 absolute inline-block">
        <slot name="append"></slot>
      </span>
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
    hideAppearance: Boolean,
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
.ui-input {
  text-align: inherit;
}
.ui-input.hide-appearance::-webkit-outer-spin-button,
.ui-input.hide-appearance::-webkit-inner-spin-button {
  /* display: none; <- Crashes Chrome on hover */
  -webkit-appearance: none;
  margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}
.ui-input.hide-appearance[type='number'] {
  -moz-appearance: textfield; /* Firefox */
}
</style>
