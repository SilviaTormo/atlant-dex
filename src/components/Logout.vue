<template lang="pug">
.logout(@click="membershipAction")
  Icon.logout__icon(id="logout")
  .logout__text {{ isLoggedIn ? 'Logout' : 'Login' }}
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex';
import Icon from './Icon';

export default {
  computed: {
    ...mapGetters('membership', {
      isLoggedIn: 'isLoggedIn',
    }),
  },
  methods: {
    ...mapMutations('modal', {
      openModal: 'open',
    }),
    ...mapActions('membership', {
      logout: 'logout',
    }),
    membershipAction() {
      this.isLoggedIn ? this.logout() : this.openModal({name: 'signIn'});
    },
  },
  components: {
    Icon,
  },
};
</script>

<style lang="scss">
.logout {
  cursor: pointer;
  display: flex;
  align-items: center;
  fill: #fff;
  &__icon {
    $size: 19px;
    width: $size;
    height: $size;
  }
  &__text {
    font-size: 12px;
    font-weight: 700;
    margin-left: 12px;
  }
  &:hover {
    fill: #ffc600;
    color: #ffc600;
  }
}
</style>
