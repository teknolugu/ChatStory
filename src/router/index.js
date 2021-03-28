import { createRouter, createWebHistory } from 'vue-router';
/* eslint-disable-next-line */
import { setupLayouts } from 'layouts-generated';
import generatedRoutes from 'pages-generated';

const routes = setupLayouts(generatedRoutes);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
