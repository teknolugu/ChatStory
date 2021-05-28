<template>
  <form ref="form" class="dropzone flex items-center justify-center rounded-xl"></form>
</template>
<script>
import { ref, onMounted } from 'vue';
import Dropzone from 'dropzone';
import 'dropzone/dist/dropzone.css';

export default {
  props: {
    url: {
      type: String,
      default: '/upload/image',
    },
  },
  setup(props) {
    const form = ref(null);

    onMounted(() => {
      const myDropzone = new Dropzone(form.value, {
        url: `${import.meta.env.VITE_API_BASE_URL}${props.url}`,
      });

      myDropzone.on('addedfile', (file) => {
        console.log(`File added: ${file.name}`);
      });
    });

    return {
      form,
    };
  },
};
</script>
<style>
.dropzone {
  @apply border border-dashed !important;
}
</style>
