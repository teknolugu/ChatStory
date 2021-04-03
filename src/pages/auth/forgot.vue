<template>
  <div class="forgot">
    <ui-alert v-model="state.showAlert" :variant="state.alertVariant">
      {{ state.alertMessage }}
    </ui-alert>
    <ui-button icon class="absolute top-0 left-0 m-10" tag="router-link" to="/auth">
      <ui-icon name="arrow-narrow-left"></ui-icon>
    </ui-button>
    <div class="mt-6">
      <h3 class="text-2xl font-semibold">Forgot your password?</h3>
      <p class="text-gray-500">Enter your email below to start reset your password</p>
    </div>
    <form class="mt-16" @submit.prevent="resetPassword">
      <ui-input
        v-model="v$.email.$model"
        block
        label="Email"
        placeholder="example@mail.com"
        :error="v$.email.$dirty && v$.email.$invalid"
        :error-message="v$.email.$silentErrors[0]?.$message"
        show-detail
      ></ui-input>
      <ui-button variant="primary" class="mt-12 w-full" :loading="state.loading"
        >Reset password</ui-button
      >
    </form>
  </div>
</template>
<script>
import { shallowReactive } from 'vue';
import { email, required } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import auth from '@/utils/auth';

export default {
  setup() {
    const state = shallowReactive({
      email: '',
      loading: false,
      showAlert: false,
      alertVariant: 'primary',
      alertMessage: '',
    });

    const v$ = useVuelidate(
      {
        email: {
          email,
          required,
        },
      },
      state
    );

    async function resetPassword() {
      try {
        v$.value.$touch();

        if (v$.value.$invalid) return;

        state.loading = true;

        await auth.sendOobCode('PASSWORD_RESET', state.email);

        state.showAlert = true;
        state.alertVariant = 'primary';
        state.alertMessage = 'A link to reset your password has been sent to your email';
        state.loading = false;
      } catch (error) {
        console.error(error);
        state.loading = false;
        state.showAlert = true;
        state.alertVariant = 'error';
        state.alertMessage = 'Something went wrong';
      }
    }

    return {
      v$,
      state,
      resetPassword,
    };
  },
};
</script>
