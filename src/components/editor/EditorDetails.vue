<template>
  <div class="py-5 container">
    <h4 class="text-xl font-semibold mb-8">Details</h4>
    <div class="flex lg:flex-row flex-col">
      <p class="font-semibold lg:w-2/12 align-top mb-4 lg:mb-0">Story details</p>
      <div class="space-y-3 border-b pb-5 inline-block flex-1">
        <ui-input
          v-model="validation.title.$model"
          class="lg:w-6/12"
          placeholder="Story title"
          block
          label="Title*"
          :error="validation.title.$dirty && validation.title.$invalid"
          :error-message="validation.title.$silentErrors[0]?.$message"
        ></ui-input>
        <ui-textarea
          v-model="validation.description.$model"
          height="120px"
          class="lg:w-6/12"
          block
          placeholder="Description here"
          label="Description*"
          :error="validation.description.$dirty && validation.description.$invalid"
          :error-message="validation.description.$silentErrors[0]?.$message"
        ></ui-textarea>
        <ui-select
          v-if="false"
          v-model="validation.category.$model"
          :error="validation.category.$dirty && validation.category.$invalid"
          :error-message="validation.category.$silentErrors[0]?.$message"
          class="lg:w-4/12"
          block
          label="Category*"
          placeholder="Select category"
        ></ui-select>
      </div>
    </div>
    <div class="flex lg:flex-row flex-col mt-5">
      <p class="font-semibold lg:w-2/12 align-top mb-4 lg:mb-0">Graphic assets</p>
      <div class="space-y-3 border-b pb-5 inline-block flex-1">
        <div class="flex flex-col lg:flex-row">
          <ui-input
            v-model="story.bannerImage"
            class="lg:w-6/12"
            block
            label="Banner*"
            :error="validation.bannerImage.$dirty && validation.bannerImage.$invalid"
            :error-message="validation.bannerImage.$silentErrors[0]?.$message"
            placeholder="https://example.com/image.png"
          ></ui-input>
          <div class="mt-6 lg:ml-4">
            <div
              class="bg-cover bg-center rounded-xl bg-no-repeat"
              :style="{
                'background-image': `url('${story.bannerImage}')`,
                width: '120px',
                height: '80px',
              }"
            ></div>
            <p class="mt-1 text-sm">Recommended size 1280x720 pixels</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted, reactive, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { url, required, minLength, maxLength } from '@vuelidate/validators';
import Story from '@/models/story';
import { debounce } from '@/utils/helper';

export default {
  setup() {
    const route = useRoute();
    const storyId = route.params.storyid;

    const story = reactive({
      title: '',
      description: '',
      // category: '',
      bannerImage: '',
    });

    const rules = {
      title: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(120),
      },
      description: {
        required,
        minLength: minLength(30),
        maxLength: maxLength(1024),
      },
      // category: {
      //   required,
      // },
      bannerImage: {
        required,
        url,
      },
    };
    const validation = useVuelidate(rules, story, { $scope: 'detail' });

    function updateImage(type, index) {
      if (type === 'add') {
        story.images.push('');
      } else if (type === 'delete') {
        story.images.splice(index, 1);
      }
    }

    watch(story, debounce(() => {
      Story.update({
        where: storyId,
        data: story,
      });
    }, 200));

    onMounted(() => {
      const data = Story.find(storyId);

      Object.keys(story).forEach((key) => {
        story[key] = data[key];
      });
    });

    return {
      story,
      validation,
      updateImage,
    };
  },
};
</script>
