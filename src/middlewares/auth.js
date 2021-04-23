import auth from '@/utils/auth';

export default function (to, from, next) {
  if (auth.user) {
    if (!auth.user.emailVerified) {
      return next('/auth/verify');
    }

    next();
  } else {
    next({ path: '/' });
  }
}
