<template>
  <label class="inline-flex items-center">
    <input
      type="checkbox"
      class="rounded border-gray-300 text-primary shadow-sm focus:border-primary focus:ring focus:ring-primary transition h-5 w-5 focus:ring-opacity-50"
      :value="modelValue"
      v-bind="{ checked: modelValue }"
      @change="changeHandler"
    />
    <span v-if="$slots.default" class="ml-2">
      <slot></slot>
    </span>
  </label>
</template>
<script>
export default {
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    function changeHandler(event) {
      console.log(event);
      // emit('update:modelValue', )
    }

    return {
      changeHandler,
    };
  },
};
</script>
