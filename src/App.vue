<template>
  <div class="app text-gray-800">
    <router-view></router-view>
    <ui-dialog></ui-dialog>
  </div>
</template>
<script>
import Story from './models/story';

export default {
  setup() {
    Story.insert({
      data: {
        id: 'test',
        title: 'My story',
        description: 'this is my story',
        characters: [
          { name: 'Sophia', profileUrl: 'https://ui-avatars.com/api/?name=Shopia' },
          { name: 'Random', profileUrl: 'https://ui-avatars.com/api/?name=Random' },
        ],
      },
    });
  },
};
</script>
