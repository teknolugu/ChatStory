<template>
  <div class="flex items-start">
    <ui-icon
      v-if="edit"
      id="handle"
      name="draggabledots"
      style="cursor: grab"
      view-box="0 0 24 24"
      class="text-gray-500"
    ></ui-icon>
    <img :src="chat.character.profileUrl" class="h-8 ml-2 w-8 rounded-full" />
    <div class="ml-2 border-b pb-4 w-10/12">
      <div class="bg-gray-50 rounded-xl px-4 py-2">
        <div class="flex items-center w-full">
          <p class="text-overflow w-10/12">{{ chat.character.name }}</p>
          <template v-if="edit">
            <ui-icon name="trash" size="20" class="text-red-500 cursor-pointer mr-2"></ui-icon>
            <ui-icon name="pencil" size="20" class="text-gray-600 cursor-pointer"></ui-icon>
          </template>
        </div>
        <p class="leading-tight line-clamp mt-1 text-gray-500">
          {{ chat.message }}
        </p>
      </div>
      <img v-if="chat.imageUrl" :src="chat.imageUrl" class="max-w-full mt-2 rounded-xl" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    chat: {
      type: Object,
      default: () => ({}),
    },
    edit: Boolean,
  },
};
</script>
