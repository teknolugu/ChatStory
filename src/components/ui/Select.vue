<template>
  <label class="inline-block">
    <span v-if="label" class="text-gray-500 text-sm ml-2">{{ label }}</span>
    <select
      class="rounded-xl ui-select w-full block border border-gray-200 transition bg-transparent focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
      :value="modelValue"
      @change="emitValue"
    >
      <option v-if="placeholder" value="" disabled selected>{{ placeholder }}</option>
      <slot></slot>
    </select>
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
