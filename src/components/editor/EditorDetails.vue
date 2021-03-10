<template>
  <div class="py-5 container">
    <h2 class="text-xl font-semibold">Story Details</h2>
    <div class="mt-6 flex items-start">
      <ui-card class="bg-white mr-5 w-7/12 space-y-2">
        <ui-input
          v-model="validation.title.$model"
          class="w-full"
          placeholder="Story title"
          label="Title*"
          :error="validation.title.$dirty && validation.title.$invalid"
          :error-message="validation.title.$silentErrors[0]?.$message"
        ></ui-input>
        <ui-textarea
          v-model="validation.description.$model"
          class="w-full"
          placeholder="Description here"
          label="Description*"
          :error="validation.description.$dirty && validation.description.$invalid"
          :error-message="validation.description.$silentErrors[0]?.$message"
        ></ui-textarea>
        <div class="flex items-center space-x-3">
          <ui-select
            v-model="validation.category.$model"
            :error="validation.category.$dirty && validation.category.$invalid"
            :error-message="validation.category.$silentErrors[0]?.$message"
            show-detail
            label="Category*"
            class="w-6/12"
            placeholder="Select category"
          ></ui-select>
          <ui-input
            v-model="story.tags"
            class="w-6/12"
            placeholder="tag 1, tag 2"
            label="Tags (use comma as separator)"
            show-detail
          ></ui-input>
        </div>
        <div class="pb-8">
          <div v-for="(image, index) in story.images" :key="index" class="flex items-end mb-2">
            <ui-input
              v-model="story.images[index]"
              class="flex-1 mr-3"
              placeholder="https://example.com/image.png"
              :label="`Image ${index + 1}`"
            ></ui-input>
            <ui-button
              v-if="story.images.length !== 1"
              icon
              class="text-red-500"
              @click="updateImage('delete', index)"
            >
              <ui-icon name="trash"></ui-icon>
            </ui-button>
          </div>
          <ui-button v-if="story.images.length !== 3" @click="updateImage('add')">
            <ui-icon class="mr-1 -ml-2" name="plus"></ui-icon>
            Add Image
          </ui-button>
        </div>
        <ui-button variant="primary" class="w-full" @click="saveData">Save</ui-button>
      </ui-card>
      <div class="w-5/12">
        <div
          class="w-full h-64 rounded-xl bg-center bg-no-repeat bg-cover"
          style="background-image: url('https://picsum.photos/600')"
        ></div>
        <h4 class="text-2xl font-semibold mt-4">{{ story.title }}</h4>
        <div class="flex items-center mb-6 mt-4">
          <img src="https://picsum.photos/600" class="rounded-full h-10 w-10" />
          <p class="ml-4 font-semibold">Name</p>
        </div>
        <p class="whitespace-pre">{{ story.description }}</p>
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
      images: [''],
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
      images: {
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
