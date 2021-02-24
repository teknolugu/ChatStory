import { createRouter, createWebHistory } from 'vue-router';
/* eslint-disable-next-line */
import routes from 'voie-pages';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
