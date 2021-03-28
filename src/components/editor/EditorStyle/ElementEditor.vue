<template>
  <div class="main-element">
    <ui-select
      v-if="style.fontFamily"
      v-model="style.fontFamily"
      label="Select font"
      class="w-full"
    >
      <option v-for="font in fonts" :key="font" :value="font">
        {{ font }}
      </option>
    </ui-select>
    <div v-if="style.textColor" class="mt-3 space-x-2 flex items-end">
      <ui-color-picker v-model="style.textColor"></ui-color-picker>
      <ui-input v-model="style.textColor" label="Text Color" placeholder="#ffffff"></ui-input>
    </div>
    <div v-if="style.backgroundColor" class="mt-3 space-x-2 flex items-end">
      <ui-color-picker v-model="style.backgroundColor"></ui-color-picker>
      <ui-input
        v-model="style.backgroundColor"
        label="Background Color"
        placeholder="#ffffff"
      ></ui-input>
    </div>
    <div v-if="style.borderStyle" class="mt-3 space-x-2 flex items-end">
      <ui-color-picker v-model="style.borderColor"></ui-color-picker>
      <ui-select v-model="style.borderStyle" class="flex-1" label="Border">
        <option v-for="style in borderStyles" :key="style" :value="style">
          {{ style }}
        </option>
      </ui-select>
      <ui-input
        v-model="style.borderWidth"
        hide-appearance
        placeholder="0"
        class="w-20 text-right"
        type="Number"
      >
        <template #append> px </template>
      </ui-input>
    </div>
    <div v-if="style.borderRadius" class="mt-3">
      <div class="flex items-end mb-2">
        <ui-button
          icon
          class="mr-2"
          :class="{ 'text-primary': state.standaloneRadius }"
          @click="state.standaloneRadius = !state.standaloneRadius"
        >
          <ui-icon view-box="0 0 24 24" name="focus"></ui-icon>
        </ui-button>
        <ui-input
          :model-value="state.borderRadius"
          label="Border Radius"
          type="number"
          @change="updateBorderRadius"
        >
          <template #append> px </template>
        </ui-input>
      </div>
      <transition-expand>
        <div
          v-if="state.standaloneRadius"
          class="flex items-center space-x-2 justify-between text-center"
        >
          <ui-input v-model="style.borderRadius[0]" type="number" placeholder="0"> </ui-input>
          <ui-input v-model="style.borderRadius[1]" type="number" placeholder="0"> </ui-input>
          <ui-input v-model="style.borderRadius[3]" type="number" placeholder="0"> </ui-input>
          <ui-input v-model="style.borderRadius[2]" type="number" placeholder="0"> </ui-input>
        </div>
      </transition-expand>
    </div>
  </div>
</template>
<script>
import { ref, watch, shallowReactive } from 'vue';
import { useRoute } from 'vue-router';
import { debounce } from '@/utils/helper';
import Style from '@/models/style';

export default {
  props: {
    id: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const route = useRoute();

    const borderStyles = ['none', 'solid', 'dashed', 'dotted', 'double'];
    const fonts = ['Poppins', 'DotGothic16', 'Lato', 'Montserrat', 'Open Sans'];

    const style = ref({});
    const state = shallowReactive({
      standaloneRadius: false,
      borderRadius: 0,
      isChangingId: false,
    });

    function updateBorderRadius(value) {
      state.borderRadius = value;
      style.value.borderRadius = [value, value, value, value];
    }

    watch(
      style,
      debounce(() => {
        if (state.isChangingId) return;

        Style.update({
          where: ({ storyId }) => storyId === route.params.storyid,
          data: {
            [props.id]: style.value,
          },
        });
      }, 200),
      { deep: true }
    );
    watch(
      () => props.id,
      (elementId) => {
        state.isChangingId = true;

        const styleStore = Style.query().where('storyId', route.params.storyid).first();
        const styleObj = styleStore[elementId];

        style.value = styleObj;
        state.borderRadius = styleObj?.borderRadius?.[0] ?? 0;

        state.isChangingId = false;
      },
      { immediate: true }
    );

    return {
      fonts,
      state,
      style,
      borderStyles,
      updateBorderRadius,
    };
  },
};
</script>
