import { createRouter, createWebHistory } from 'vue-router';
/* eslint-disable-next-line */
import routes from 'virtual:generated-pages';
import middlewares from '../middlewares';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const { middleware } = to.meta;

  if (!middleware) next();
  else middlewares[middleware](to, from, next);
});

export default router;
