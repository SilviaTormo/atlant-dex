import store from 'store';
import Index from 'components/Index';

export default [
  {
    path: '*',
    redirect: '',
  },
  {
    path: '',
    name: 'index',
    component: Index,
  },
  {
    path: '/finish-registration',
    component: Index,
    props: (route) => ({
      code: route.query.code,
    }),
    beforeEnter(to, from, next) {
      store.dispatch('membership/regFinish', to.query.code).then((data) => {
        next(true);
      }).catch(() => {
        next('/');
      });
    },
  },
];
