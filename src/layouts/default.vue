<template>
  <div class="layout">
    <app-nav></app-nav>
    <router-view></router-view>
  </div>
</template>
<script>
import AppNav from '../components/app/AppNav.vue';

export default {
  components: { AppNav },
};
</script>
