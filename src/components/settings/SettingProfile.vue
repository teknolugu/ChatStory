<template>
  <div class="profile">
    <p class="text-lg font-semibold">Profile</p>
    <div class="mt-6 flex items-center mb-4">
      <label class="h-20 w-20 relative">
        <ui-img
          class="rounded-full overflow-hidden h-full w-full"
          :src="state.tempImage.url || user.photoURL"
          alt="profile picture"
        />
        <div
          class="p-1 bottom-0 cursor-pointer right-0 absolute text-white bg-primary rounded-full"
        >
          <ui-icon name="pencil"></ui-icon>
        </div>
        <input
          ref="fileForm"
          accept="image/png, .jpg, .jpeg, image/gif"
          type="file"
          class="hidden"
          @change="handleFileChange"
        />
      </label>
      <span class="text-lg ml-4 text-lg">{{ user.username }}</span>
    </div>
    <ui-alert v-model="state.alert.show" dismissible :variant="state.alert.variant" class="mb-4">
      {{ state.alert.message }}
    </ui-alert>
    <form @submit.prevent="updateUser">
      <ui-input label="Email" :model-value="user.email" disabled block></ui-input>
      <ui-input
        v-model="v$.username.$model"
        :error="v$.username.$dirty && v$.username.$invalid"
        :error-message="v$.username.$silentErrors[0]?.$message"
        label="Username"
        block
        show-detail
        class="mt-4"
      ></ui-input>
      <ui-button variant="primary" type="submit" class="mt-8 w-36" :loading="state.loading">
        Save
      </ui-button>
    </form>
  </div>
</template>
<script>
import { onMounted, computed, reactive } from 'vue';
import { useStore } from 'vuex';
import { url, required, minLength, maxLength } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { useToast } from 'vue-toastification';
import { fetchAPI } from '@/utils/auth';
import { usernameValidation } from '@/utils/helper';
import upload from '@/utils/upload';

export default {
  setup() {
    const store = useStore();
    const toast = useToast();

    const state = reactive({
      loading: false,
      alert: {
        show: false,
        variant: 'error',
        message: '',
      },
      userTemp: {
        username: '',
        photoURL: '',
      },
      tempImage: {
        url: '',
        file: null,
      },
    });

    const user = computed(() => store.state.user);

    const rules = {
      username: {
        required,
        usernameValidation,
        minLength: minLength(3),
        maxLength: maxLength(16),
      },
    };
    const v$ = useVuelidate(rules, state.userTemp);

    async function updateUser() {
      v$.value.$touch();

      if (v$.value.$invalid) return;

      state.loading = true;
      state.alert.show = false;

      try {
        if (state.tempImage.file) {
          const { imageUrl } = await upload.image(state.tempImage.file, 'users');
          state.userTemp.photoURL = imageUrl || user.value.photoURL;

          state.tempImage.file = null;
          state.tempImage.url = '';
        }

        await fetchAPI('/user', {
          method: 'PATCH',
          body: JSON.stringify(state.userTemp),
        });

        state.loading = false;
        store.commit('updateState', {
          key: 'user',
          value: {
            ...user.value,
            ...state.userTemp,
          },
        });
      } catch (error) {
        console.error(error);
        state.loading = false;
        state.tempImage.file = null;
        state.tempImage.url = '';

        state.alert.show = true;
        state.alert.variant = 'error';
        state.alert.message = error.message || error;
      }
    }
    function handleFileChange({ target }) {
      const [file] = target.files;

      if (file) {
        state.tempImage.file = file;
        state.tempImage.url = URL.createObjectURL(file);
      }
    }

    onMounted(() => {
      const { username, photoURL } = store.state.user;

      state.userTemp.username = username;
      state.userTemp.photoURL = photoURL;
    });

    return {
      v$,
      user,
      state,
      updateUser,
      handleFileChange,
    };
  },
};
</script>
