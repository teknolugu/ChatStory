<template>
  <div ref="container"></div>
</template>
<script>
import { ref, onMounted, watch, shallowRef, onBeforeUnmount } from 'vue';
import Pickr from '@simonwep/pickr';
import '@simonwep/pickr/dist/themes/nano.min.css';

export default {
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const container = ref(null);
    const pickr = shallowRef(null);

    watch(
      () => props.modelValue,
      (value) => {
        pickr.value.setColor(value);
      }
    );

    onMounted(() => {
      pickr.value = Pickr.create({
        el: container.value,
        theme: 'nano',
        default: props.modelValue,
        components: {
          preview: true,
          opacity: true,
          hue: true,
          interaction: {
            hex: true,
            rgba: true,
          },
        },
      });

      pickr.value.on('changestop', () => {
        const colorRepresentation = pickr.value.getColorRepresentation();
        const color = pickr.value.getColor();
        const colorStr = color[`to${colorRepresentation}`]().toString(0);

        emit('change', colorStr);
        emit('update:modelValue', colorStr);
      });
    });
    onBeforeUnmount(() => {
      pickr.value.destroyAndRemove();
    });

    return {
      container,
    };
  },
};
</script>
<style>
.pickr .pcr-button:after,
.pickr .pcr-button:before {
  @apply rounded-xl border border-gray-200 !important;
}

.pickr .pcr-button {
  @apply h-10 w-10 rounded-xl !important;
}
</style>
