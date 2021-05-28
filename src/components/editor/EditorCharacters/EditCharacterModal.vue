<template>
  <ui-modal
    :model-value="modelValue"
    content-class="max-w-sm"
    @close="$emit('update:modelValue', false)"
  >
    <template #header>
      <p class="capitalize">{{ type }} Character</p>
    </template>
    <div class="text-center">
      <label
        :style="{
          backgroundImage: `url(${tempCharacter.profileUrl || tempCharacter.hiddenProfileUrl})`,
        }"
        class="rounded-full mx-auto bg-gray-100 h-32 w-32 bg-cover bg-center bg-no-repeat relative inline-block"
      >
        <div class="absolute p-2 rounded-full bg-primary bottom-0 right-0 cursor-pointer">
          <input
            ref="fileForm"
            accept="image/png, .jpg, .jpeg, image/gif"
            type="file"
            class="hidden"
            @change="handleFileChange"
          />
          <ui-spinner v-if="uploadLoading" color="text-white"></ui-spinner>
          <ui-icon v-else name="pencil" class="text-white"></ui-icon>
        </div>
      </label>
    </div>
    <p class="text-center text-gray-500 text-sm mt-2">Character Profile Image (max. 240KB)</p>
    <ui-input
      v-model="validation.name.$model"
      label="Name"
      class="w-full mt-2"
      placeholder="John Doe"
      show-detail
      :error="validation.name.$dirty && validation.name.$invalid"
      :error-message="validation.name.$silentErrors[0]?.$message"
    ></ui-input>
    <div class="mt-8 flex space-x-2">
      <ui-button class="w-6/12" @click="$emit('update:modelValue', false)"> Cancel </ui-button>
      <ui-button
        class="w-6/12"
        variant="primary"
        :disabled="validation.$invalid"
        @click="saveBtnHandler"
      >
        Save
      </ui-button>
    </div>
  </ui-modal>
</template>
<script>
import { shallowReactive, watch, ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { minLength, url, required, maxLength } from '@vuelidate/validators';
import { debounce } from '@/utils/helper';
import upload from '@/utils/upload';
import Character from '@/models/character';

export default {
  props: {
    type: {
      type: String,
      default: 'add',
    },
    characterId: {
      type: String,
      default: 'add',
    },
    storyId: {
      type: String,
      default: 'add',
    },
    modelValue: Boolean,
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const uploadLoading = ref(false);
    const tempCharacter = shallowReactive({
      name: '',
      profileUrl: '',
      hiddenProfileUrl: '',
    });

    const rules = {
      name: { required, minLength: minLength(3), maxLength: maxLength(24) },
    };
    const validation = useVuelidate(rules, tempCharacter);

    function saveBtnHandler() {
      validation.value.$touch();

      if (validation.value.$invalid) return;

      if (props.type === 'edit') {
        Character.update({
          where: props.characterId,
          data: tempCharacter,
        });
      } else if (props.type === 'add') {
        Character.insert({
          data: {
            storyId: props.storyId,
            name: tempCharacter.name,
            profileUrl: tempCharacter.profileUrl || tempCharacter.hiddenProfileUrl,
          },
        });
      }

      emit('update:modelValue', false);
    }
    function handleFileChange({ target }) {
      uploadLoading.value = true;
      const [file] = target.files;

      if (file) {
        upload
          .image(file, props.storyid)
          .then(({ imageUrl }) => {
            uploadLoading.value = false;
            tempCharacter.profileUrl = imageUrl;
          })
          .catch((error) => {
            uploadLoading.value = false;
            console.error(error);
          });
      }
    }

    watch(
      () => props.modelValue,
      (value) => {
        if (value) {
          const character = Character.find(props.characterId);

          tempCharacter.hiddenProfileUrl = '';
          tempCharacter.profileUrl = character?.profileUrl || '';
          tempCharacter.name = character?.name || '';

          validation.value.$reset();
        }
      }
    );
    watch(
      () => tempCharacter.name,
      debounce((value) => {
        if (tempCharacter.profileUrl) return;

        tempCharacter.hiddenProfileUrl = `https://ui-avatars.com/api/?name=${tempCharacter.name}`.replace(
          /\s/,
          '+'
        );
      }),
      250
    );

    return {
      validation,
      tempCharacter,
      uploadLoading,
      saveBtnHandler,
      handleFileChange,
    };
  },
};
</script>
