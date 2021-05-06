<template>
  <div class="editor-characters p-5 container">
    <h3 class="text-xl mb-6 font-semibold">Characters</h3>
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <ui-card
        class="flex flex-col items-center justify-center text-center cursor-pointer"
        hover
        @click="showModal('add')"
      >
        <div class="inline-block p-4 bg-primary bg-opacity-20 rounded-full text-primary">
          <ui-icon name="plus" size="36"></ui-icon>
        </div>
        <p class="text-lg mt-4">Add Character</p>
      </ui-card>
      <ui-card v-for="character in characters" :key="character.id" class="text-center" hover>
        <img
          :src="character.profileUrl"
          class="h-14 w-14 rounded-full mx-auto"
          :alt="character.name"
        />
        <p class="text-lg text-overflow mt-2">{{ character.name }}</p>
        <div class="flex mt-6 space-x-2 items-center">
          <ui-button class="flex-1" @click="showModal('edit', character.id)">
            <ui-icon size="20" name="pencil" class="mr-2 -ml-1"></ui-icon>
            <span>Edit</span>
          </ui-button>
          <ui-button
            v-tooltip="`${mainCharacter === character.id ? 'Remove' : 'Set'} as main character`"
            icon
            :class="[mainCharacter === character.id ? 'text-yellow-500' : 'text-gray-600']"
            @click="changeMainCharacter(character.id)"
          >
            <ui-icon name="star" class="align-middle"></ui-icon>
          </ui-button>
          <ui-button icon class="text-red-500" @click="deleteCharacter(character)">
            <ui-icon name="trash"></ui-icon>
          </ui-button>
        </div>
      </ui-card>
    </div>
    <edit-character-modal
      v-model="state.showModal"
      :character-id="state.characterId"
      :type="state.modalType"
      :story-id="storyId"
    ></edit-character-modal>
  </div>
</template>
<script>
import { computed, shallowReactive, shallowRef } from 'vue';
import { useRoute } from 'vue-router';
import { useDialog } from '@/composable/dialog';
import Character from '@/models/character';
import Story from '@/models/story';
import EditCharacterModal from './EditCharacterModal.vue';

export default {
  components: { EditCharacterModal },
  setup() {
    const route = useRoute();
    const dialog = useDialog();

    const storyId = route.params.storyid;

    const state = shallowReactive({
      characterId: '',
      showModal: false,
      modalType: 'edit',
    });

    const characters = computed(() => {
      return Character.query().where('storyId', storyId).get();
    });
    const mainCharacter = computed(() => {
      return Story.find(storyId)?.mainCharacter || '';
    });

    function showModal(type, characterId) {
      state.characterId = characterId || '';
      state.modalType = type;
      state.showModal = true;
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
    function changeMainCharacter(id) {
      Story.update({
        where: storyId,
        data: {
          mainCharacter: mainCharacter.value === id ? '' : id,
        },
      });
    }

    return {
      state,
      storyId,
      showModal,
      characters,
      mainCharacter,
      deleteCharacter,
      changeMainCharacter,
    };
  },
};
</script>
