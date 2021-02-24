<template>
  <div class="editor-characters p-5 container">
    <h3 class="text-xl mb-6">Characters</h3>
    <div class="grid grid-cols-5 gap-4">
      <ui-card
        class="flex flex-col items-center justify-center cursor-pointer"
        hover
        @click="showModal('add')"
      >
        <div class="inline-block p-4 bg-primary bg-opacity-20 rounded-full text-primary">
          <ui-icon name="plus" size="36"></ui-icon>
        </div>
        <p class="text-lg mt-4">Add Character</p>
      </ui-card>
      <ui-card
        v-for="character in characters"
        :key="character.id"
        class="text-center"
        hover
      >
        <img
          :src="character.profileUrl"
          class="h-14 w-14 rounded-full mx-auto"
          :alt="character.name"
        />
        <p class="text-lg mt-2">{{ character.name }}</p>
        <div class="flex mt-6 items-center">
          <ui-button @click="showModal('edit', character)" class="flex-1">
            <ui-icon size="20" name="pencil" class="mr-2 -ml-1"></ui-icon>
            <span>Edit</span>
          </ui-button>
          <ui-button icon class="text-red-500 ml-2" @click="deleteCharacter(character)">
            <ui-icon name="trash"></ui-icon>
          </ui-button>
        </div>
      </ui-card>
    </div>
    <ui-modal
      v-model="state.showModal"
      content-class="max-w-sm"
    >
      <template #header>
        <p class="capitalize">{{ state.modalType }} Character</p>
      </template>
      <img
        :src="tempCharacter.profileUrl"
        :alt="tempCharacter.name"
        class="h-28 w-28 rounded-full mx-auto"
      />
      <ui-input
        label="Profile Image URL"
        class="w-full mt-4"
        v-model="characterValidation.profileUrl.$model"
        placeholder="https://example.com/image.png"
        :error="characterValidation.profileUrl.$dirty && characterValidation.profileUrl.$invalid"
        :error-message="characterValidation.profileUrl.$silentErrors[0]?.$message"
      ></ui-input>
      <ui-input
        label="Name"
        class="w-full mt-2"
        placeholder="John Doe"
        show-detail
        :error="characterValidation.name.$dirty && characterValidation.name.$invalid"
        :error-message="characterValidation.name.$silentErrors[0]?.$message"
        v-model="characterValidation.name.$model"
      ></ui-input>
      <div class="mt-8 flex space-x-2">
        <ui-button class="w-6/12" @click="state.showModal = false">
          Cancel
        </ui-button>
        <ui-button
          @click="saveBtnHandler"
          class="w-6/12"
          variant="primary"
          :disabled="characterValidation.$invalid"
        >
          Save
        </ui-button>
      </div>
    </ui-modal>
  </div>
</template>
<script>
import { computed, shallowReactive, shallowRef } from 'vue';
import { useRoute } from 'vue-router';
import { useVuelidate } from '@vuelidate/core'
import { minLength, url, required } from '@vuelidate/validators'
import { useDialog } from '@/composable/dialog';
import Character from '@/models/character';

export default {
  setup() {
    const route = useRoute();
    const dialog = useDialog();

    const storyId = route.params.storyid;

    const tempCharacter = shallowReactive({
      profileUrl: '',
      name: '',
    });
    const state = shallowReactive({
      characterId: '',
      showModal: false,
      modalType: 'edit',
    });

    const characters = computed(() => {
      return Character.query().where('storyId', storyId).get();
    });

    const rules = {
      name: { required, minLength: minLength(4) },
      profileUrl: { required, url },
    };
    const characterValidation = useVuelidate(rules, tempCharacter);

    function showModal(type, character = {}) {
      state.characterId = character?.id || '';
      tempCharacter.profileUrl = character?.profileUrl || '';
      tempCharacter.name = character?.name || '';

      characterValidation.value.$reset();

      state.modalType = type;
      state.showModal = true;
    }
    function saveBtnHandler() {
      if (state.modalType === 'edit') {
        Character.update({
          where: state.characterId,
          data: tempCharacter,
        });
      } else if (state.modalType === 'add') {
        Character.insert({
          data: {
            storyId,
            ...tempCharacter,
          },
        });
      }

      state.showModal = false;
    }
    function deleteCharacter({ id, name }) {
      dialog.confirm({
        title: 'Delete Character',
        body: `This will delete all ${name} character chats. Are you sure want to delete this character?`,
        okVariant: 'danger',
        okText: 'Delete',
        onConfirm: () => {
          Character.delete(id);
        },
      });
    }

    return {
      state,
      showModal,
      characters,
      tempCharacter,
      saveBtnHandler,
      deleteCharacter,
      characterValidation,
    };
  },
};
</script>
