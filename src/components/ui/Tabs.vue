<template>
  <div class="ui-tabs border-b flex items-center">
    <slot></slot>
  </div>
</template>
<script>
import { provide, toRef } from 'vue';

export default {
  emits: ['input'],
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
  },
  setup(props, { emit }) {
    provide('ui-tabs', {
      active: toRef(props, 'value'),
      changeActive: (value) => {
        emit('input', value);
      },
    });
  },
};
</script>
