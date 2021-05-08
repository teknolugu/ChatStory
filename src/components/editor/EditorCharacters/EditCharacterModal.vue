<template>
  <ui-modal
    :model-value="modelValue"
    content-class="max-w-sm"
    @close="$emit('update:modelValue', false)"
  >
    <template #header>
      <p class="capitalize">{{ type }} Character</p>
    </template>
    <img
      :src="tempCharacter.profileUrl || tempCharacter.hiddenProfileUrl"
      :alt="tempCharacter.name"
      class="h-28 w-28 rounded-full mx-auto"
    />
    <ui-input
      v-model="validation.profileUrl.$model"
      label="Profile Image URL"
      class="w-full mt-4"
      placeholder="https://example.com/image.png"
      type="url"
      :error="validation.profileUrl.$dirty && validation.profileUrl.$invalid"
      :error-message="validation.profileUrl.$silentErrors[0]?.$message"
    ></ui-input>
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
import { shallowReactive, watch } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { minLength, url, required, maxLength } from '@vuelidate/validators';
import { debounce } from '@/utils/helper';
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
    const tempCharacter = shallowReactive({
      name: '',
      profileUrl: '',
      hiddenProfileUrl: '',
    });

    const rules = {
      name: { required, minLength: minLength(4), maxLength: maxLength(24) },
      profileUrl: { url },
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
      saveBtnHandler,
    };
  },
};
</script>
