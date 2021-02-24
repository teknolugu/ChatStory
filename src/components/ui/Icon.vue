<template>
  <svg
    v-bind="{
      viewBox,
      height: size,
      width: size,
    }"
    class="icon-ui"
    fill="currentColor"
    @click="$emit('click', $event)"
    v-html="icon"
  ></svg>
</template>
<script>
import { computed } from 'vue';
import icons from '@/lib/icons';

export default {
  props: {
    viewBox: {
      type: String,
      default: '0 0 20 20',
    },
    size: {
      type: [String, Number],
      default: 24,
    },
    name: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    return {
      icon: computed(() => {
        try {
          const icon = icons[props.name];

          if (icon) {
            return icon;
          }

          throw new Error(`[${props.name}] icon not found`);
        } catch (err) {
          console.error(err);

          return [];
        }
      }),
    };
  },
};
</script>
<style>
.icon-ui {
  display: inline-block;
  transition: transform 250ms ease;
}
</style>
