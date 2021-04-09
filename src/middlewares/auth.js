import store from '../store';

export default function (to, from, next) {
  const { user } = store.state;

  if (user) {
    if (!user.emailVerified) {
      return next('/auth/verify');
    }

    next();
  } else {
    next({ path: '/' });
  }
}
