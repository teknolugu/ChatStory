<template>
  <div class="main-element">
    <ui-select label="Select font" class="w-full" v-model="state.fontFamily">
      <option v-for="font in fonts" :key="font" :value="font">
        {{ font }}
      </option>
    </ui-select>
    <div class="mt-2 space-x-2 flex items-end">
      <ui-color-picker v-model="state.textColor"></ui-color-picker>
      <ui-input v-model="state.textColor" label="Text Color" placeholder="#ffffff"></ui-input>
    </div>
    <div class="mt-2 space-x-2 flex items-end">
      <ui-color-picker v-model="state.backgroundColor"></ui-color-picker>
      <ui-input
        v-model="state.backgroundColor"
        label="Background Color"
        placeholder="#ffffff"
      ></ui-input>
    </div>
  </div>
</template>
<script>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import Style from '@/models/style';

export default {
  props: {
    fonts: {
      type: Array,
      default: () => [],
    },
    id: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const route = useRoute();

    const state = ref({
      fontFamily: 'Poppins',
      textColor: '#fff',
      backgroundColor: '#1e293b',
    });

    watch(state, () => {
      Style.update({
        where: ({ storyId }) => storyId === route.params.storyid,
        data: {
          [props.id]: state.value,
        },
      });
    }, { deep: true });

    return {
      state,
    };
  },
};
</script>
