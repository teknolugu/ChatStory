<template>
  <label :class="[block ? 'block' : 'inline-block']">
    <span v-if="label" class="text-gray-500 text-sm ml-2">{{ label }}</span>
    <select
      class="rounded-xl ui-select w-full block border border-gray-200 transition bg-transparent focus:ring focus:ring-opacity-50"
      :value="modelValue"
      :class="[
        error
          ? 'focus:ring-red-500 focus:border-red-500 border-red-500'
          : 'focus:border-primary focus:ring-primary',
      ]"
      @change="emitValue"
    >
      <option v-if="placeholder" value="" disabled selected>{{ placeholder }}</option>
      <slot></slot>
    </select>
    <span
      v-if="(error && errorMessage) || showDetail"
      class="text-sm ml-2 h-6 inline-block text-red-500"
    >
      {{ errorMessage }}
    </span>
  </label>
</template>
<script>
export default {
  props: {
    modelValue: {
      type: [String, Number],
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
    errorMessage: {
      type: String,
      default: '',
    },
    error: Boolean,
    block: Boolean,
    showDetail: Boolean,
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    function emitValue({ target }) {
      emit('update:modelValue', target.value);
      emit('change', target.value);
    }

    return {
      emitValue,
    };
  },
};
</script>
<style>
.ui-select__arrow {
  top: 50%;
  transform: translateY(-50%) rotate(90deg);
}
</style>
