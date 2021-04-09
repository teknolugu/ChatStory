<template>
  <div class="profile">
    <p class="text-lg font-semibold">Profile</p>
    <div class="mt-6 flex items-center mb-4">
      <img
        class="rounded-full overflow-hidden h-20 w-20"
        :src="user.photoURL"
        alt="profile picture"
      />
      <span class="text-lg ml-4 text-lg">{{ user.username }}</span>
    </div>
    <ui-alert v-model="state.alert.show" dismissible :variant="state.alert.variant" class="mb-4">
      {{ state.alert.message }}
    </ui-alert>
    <form @submit.prevent="updateUser">
      <ui-input label="Email" :model-value="user.email" disabled block></ui-input>
      <ui-input
        v-model="v$.photoURL.$model"
        :error="v$.photoURL.$dirty && v$.photoURL.$invalid"
        :error-message="v$.photoURL.$silentErrors[0]?.$message"
        label="Photo URL"
        type="url"
        shide-detail
        block
        placeholder="https://example.com/image.png"
        class="mt-4"
      ></ui-input>
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
import { fetchAPI } from '@/utils/auth';
import { usernameValidation } from '@/utils/helper';

export default {
  setup() {
    const store = useStore();

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
    });

    const user = computed(() => store.state.user);

    const rules = {
      username: {
        required,
        usernameValidation,
        minLength: minLength(3),
        maxLength: maxLength(16),
      },
      photoURL: {
        url,
      },
    };
    const v$ = useVuelidate(rules, state.userTemp);

    function updateUser() {
      v$.value.$touch();

      if (v$.value.$invalid) return;

      state.loading = true;
      state.alert.show = false;

      fetchAPI('/user', {
        method: 'PATCH',
        body: JSON.stringify(state.userTemp),
      })
        .then(() => {
          state.loading = false;
          console.log('the fuck?');
          store.commit('updateState', {
            key: 'user',
            value: {
              ...user.value,
              ...state.userTemp,
            },
          });
        })
        .catch((error) => {
          console.error(error);
          state.loading = false;
          state.alert.show = true;
          state.alert.variant = 'error';
          state.alert.message = 'Username is already use';
        });
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
    };
  },
};
</script>
