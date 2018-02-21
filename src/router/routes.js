import store from 'store';
import Index from 'components/Index';
import * as Membership from 'services/api/membership';

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
  {
    path: '/finish-restore',
    component: Index,
    props: (route) => ({
      code: route.query.code,
    }),
    beforeEnter(to, from, next) {
      Membership.confirmPasswordRestore(to.query.code).then((data) => {
        store.commit('modal/open', {
          name: 'newPassword',
          data: {
            code: to.query.code,
          },
        });
        next('/');
      }).catch(() => {
        next(true);
      });
    },
  },
];
