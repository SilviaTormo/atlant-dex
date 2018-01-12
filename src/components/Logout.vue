<template lang="pug">
.logout(@click="openModal({name:'signIn',})")
  Icon.logout__icon(id="logout")
</template>

<script>
import {mapMutations} from 'vuex';
import Icon from './Icon';

export default {
  methods: {
    ...mapMutations('modal', {
      openModal: 'open',
    }),
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
  &__icon {
    $size: 19px;
    width: $size;
    height: $size;
    fill: #ffc600;
    &:hover {
      fill: #ffffff;
    }
  }
}
</style>
