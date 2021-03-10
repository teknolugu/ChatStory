<template>
  <div class="py-5 container">
    <div class="flex items-center">
      <h4 class="text-xl font-semibold mb-8">Details</h4>
      <div class="flex-grow"></div>
      <ui-button variant="primary" class="w-24" @click="saveData">Save</ui-button>
    </div>
    <div class="flex">
      <p class="font-semibold w-2/12 align-top">Story details</p>
      <div class="space-y-3 border-b pb-5 inline-block flex-1">
        <ui-input
          v-model="validation.title.$model"
          class="w-6/12"
          placeholder="Story title"
          label="Title*"
          :error="validation.title.$dirty && validation.title.$invalid"
          :error-message="validation.title.$silentErrors[0]?.$message"
        ></ui-input>
        <div class="description flex items-start">
          <ui-textarea
            v-model="validation.description.$model"
            height="120px"
            class="w-6/12"
            placeholder="Description here"
            label="Description*"
            :error="validation.description.$dirty && validation.description.$invalid"
            :error-message="validation.description.$silentErrors[0]?.$message"
          ></ui-textarea>
          <div class="ml-4 -l-2 border-primary pl-2 mt-4">
            <p>Supported Markdown:</p>
            <ul class="list-disc list-inside">
              <li><b>**Bold**</b></li>
              <li><i>_Italic_</i></li>
            </ul>
          </div>
        </div>
        <ui-select
          v-model="validation.category.$model"
          :error="validation.category.$dirty && validation.category.$invalid"
          :error-message="validation.category.$silentErrors[0]?.$message"
          class="w-4/12"
          label="Category*"
          placeholder="Select category"
        ></ui-select>
        <ui-input
          v-model="story.tags"
          class="w-6/12"
          placeholder="tag 1, tag 2"
          label="Tags (use comma as separator)"
          block
        ></ui-input>
      </div>
    </div>
    <div class="flex mt-5">
      <p class="font-semibold w-2/12 align-top">Graphic assets</p>
      <div class="space-y-3 border-b pb-5 inline-block flex-1">
        <div class="flex">
          <ui-input
            v-model="story.iconImage"
            class="w-6/12"
            label="Story icon"
            :error="validation.iconImage.$dirty && validation.iconImage.$invalid"
            :error-message="validation.iconImage.$silentErrors[0]?.$message"
            placeholder="https://example.com/image.png"
          ></ui-input>
          <div class="mt-6 ml-4">
            <img src="https://picsum.photos/500" class="w-16 rounded-xl" />
            <p class="mt-1 text-sm">Recommended size 64x64 pixels</p>
          </div>
        </div>
        <div class="flex">
          <ui-input
            v-model="story.bannerImage"
            class="w-6/12"
            label="Banner*"
            :error="validation.bannerImage.$dirty && validation.bannerImage.$invalid"
            :error-message="validation.bannerImage.$silentErrors[0]?.$message"
            placeholder="https://example.com/image.png"
          ></ui-input>
          <div class="mt-6 ml-4">
            <div
              class="bg-cover bg-center rounded-xl bg-no-repeat"
              style="background-image: url('https://picsum.photos/600'); width: 120px; height: 80px"
            ></div>
            <p class="mt-1 text-sm">Recommended size 1280x720 pixels</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted, reactive } from 'vue';
import Story from '@/models/story';
import { useRoute } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { url, required, minLength, maxLength } from '@vuelidate/validators';

export default {
  setup() {
    const route = useRoute();
    const storyId = route.params.storyid;

    const story = reactive({
      title: '',
      description: '',
      tags: '',
      category: '',
      bannerImage: '',
      iconImage: '',
    });

    const rules = {
      title: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(120),
      },
      description: {
        required,
        minLength: minLength(30),
        maxLength: maxLength(1024),
      },
      category: {
        required,
      },
      bannerImage: {
        required,
        url,
      },
      iconImage: {
        url,
      },
    };
    const validation = useVuelidate(rules, story);

    function updateImage(type, index) {
      if (type === 'add') {
        story.images.push('');
      } else if (type === 'delete') {
        story.images.splice(index, 1);
      }
    }
    function saveData() {
      validation.value.$touch();

      if (validation.value.$invalid) return;

      Story.update({
        where: storyId,
        data: story,
      });
    }

    onMounted(() => {
      const data = Story.find(storyId);

      Object.keys(story).forEach((key) => {
        story[key] = data[key];
      });
    });

    return {
      story,
      saveData,
      validation,
      updateImage,
    };
  },
};
</script>
