<template>
  <label class="inline-block">
    <span v-if="label" class="text-gray-500 text-sm ml-2">{{ label }}</span>
    <div class="relative flex items-center">
      <ui-icon
        v-if="prependIcon"
        :name="prependIcon"
        class="ml-3 left-0 absolute text-gray-600"
      ></ui-icon>
      <input
        class="w-full ui-input rounded-xl border border-gray-200 transition bg-transparent focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
        v-bind="{ value: modelValue, type, placeholder }"
        :class="{ 'pr-10': appendIcon, 'pl-10': prependIcon }"
        @input="emitValue"
      />
      <ui-icon
        v-if="appendIcon"
        :name="appendIcon"
        class="mr-3 right-0-0 absolute text-gray-600"
      ></ui-icon>
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
    placeholder: String,
    appendIcon: String,
    prependIcon: String,
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
