<template>
  <ui-modal v-model="showModal" content-class="max-w-sm">
    <template #header>
      <span class="font-semibold text-lg">Settings</span>
    </template>
    <div class="mb-4 flex items-center">
      <ui-button
        v-if="tempAudio.url || settings.backgroundMusic"
        v-tooltip="'Toggle play'"
        icon
        class="mr-2"
        @click="toggleAudio"
      >
        <ui-icon name="play"></ui-icon>
      </ui-button>
      <div class="text-overflow pr-4">
        <p>Background Music</p>
        <p
          v-if="tempAudio.file || settings.backgroundMusic"
          class="leading-none text-gray-600 text-overflow"
        >
          {{ getAudioName() }}
        </p>
      </div>
      <div class="flex-grow"></div>
      <div v-tooltip="'Upload audio (max. 360KB)'" class="relative">
        <ui-button icon>
          <ui-icon name="upload"></ui-icon>
        </ui-button>
        <input
          id="audio-input"
          accept="audio/mp3, audio/wav"
          type="file"
          class="opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer"
          @change="handleFileChange"
        />
      </div>
    </div>
    <form @submit.prevent="saveData">
      <ui-input
        v-model="v$.chatDelay.$model"
        placeholder="500"
        label="Chat delay (ms)"
        type="number"
        block
        class="mt-2"
        :error="v$.chatDelay.$dirty && v$.chatDelay.$invalid"
        :error-message="v$.chatDelay.$silentErrors[0]?.$message"
      ></ui-input>
      <ui-checkbox v-model="settings.autoPlay" class="mt-4"> Auto play chat </ui-checkbox>
      <ui-button
        class="w-full mt-8"
        variant="primary"
        :disabled="v$.$invalid"
        type="submit"
        :loading="tempAudio.uploading"
      >
        Save
      </ui-button>
    </form>
    <audio ref="audio" :src="tempAudio.url || settings.backgroundMusic"></audio>
  </ui-modal>
</template>
<script>
import { ref, shallowReactive, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { useToast } from 'vue-toastification';
import { url, minValue, maxValue } from '@vuelidate/validators';
import emitter from 'tiny-emitter/instance';
import Setting from '@/models/setting';
import upload from '@/utils/upload';

export default {
  setup() {
    const route = useRoute();
    const toast = useToast();

    const showModal = ref(false);
    const audio = ref(null);
    const tempAudio = shallowReactive({
      file: null,
      url: '',
      uploading: false,
    });
    const settings = shallowReactive({
      backgroundMusic: '',
      chatDelay: 500,
      autoPlay: true,
    });

    const storyId = route.params.storyid;

    const rules = {
      chatDelay: {
        minValue: minValue(500),
        maxValue: maxValue(10000),
      },
    };
    const v$ = useVuelidate(rules, settings);

    async function saveData() {
      v$.value.$touch();

      if (v$.value.$invalid) return;

      try {
        if (tempAudio.file) {
          tempAudio.uploading = true;

          const { url } = await upload.audio(tempAudio.file, storyId);

          settings.backgroundMusic = url || settings.backgroundMusic;

          tempAudio.url = '';
          tempAudio.file = null;
        }

        Setting.update({
          where: (setting) => setting.storyId === storyId,
          data: settings,
        });

        showModal.value = false;
        tempAudio.uploading = false;
      } catch (error) {
        tempAudio.uploading = false;
        toast.error(error.message || error);
        console.error(error);
      }
    }
    function getAudioName() {
      return tempAudio.file?.name || settings.backgroundMusic.split('/').pop();
    }
    function handleFileChange({ target }) {
      const [file] = target.files;

      if (file) {
        tempAudio.file = file;
        tempAudio.url = URL.createObjectURL(file);
      }
    }
    function toggleAudio() {
      const isPaused = audio.value.paused;

      audio.value[isPaused ? 'play' : 'pause']();
    }

    emitter.on('settings-modal', () => {
      showModal.value = true;
    });

    watch(showModal, (value) => {
      if (value) {
        const data = Setting.query().where('storyId', route.params.storyid).first();

        if (data) {
          delete data.$id;
          delete data.id;

          Object.assign(settings, data);
        } else {
          Setting.insert({
            data: {
              storyId: route.params.storyId,
            },
          });
        }
      }
    });

    return {
      v$,
      audio,
      settings,
      saveData,
      tempAudio,
      showModal,
      toggleAudio,
      getAudioName,
      handleFileChange,
    };
  },
};
</script>
