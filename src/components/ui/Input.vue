<template>
  <label class="relative" :class="[block ? 'block' : 'inline-block']">
    <span v-if="label" class="text-gray-500 text-sm ml-2">
      {{ label }}
      <slot name="label"></slot>
    </span>
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
        @blur="$emit('blur', $event)"
      />
      <span v-if="$slots.append" class="mr-3 right-0 absolute inline-block">
        <slot name="append"></slot>
      </span>
    </div>
    <div
      v-if="(error && errorMessage) || showDetail"
      class="text-sm ml-2 h-6 inline-block text-red-500"
    >
      <span v-if="error">{{ errorMessage }}</span>
    </div>
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
    block: Boolean,
    showDetail: Boolean,
  },
  emits: ['update:modelValue', 'input', 'change', 'blur'],
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
  -webkit-appearance: none;
  margin: 0;
}
.ui-input.hide-appearance[type='number'] {
  -moz-appearance: textfield;
}
</style>
