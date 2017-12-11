<template lang="pug">
.logout
  Icon.logout__icon(id="logout")
  .logout__label Logout
</template>

<script>
import Icon from './Icon';

export default {
  components: {
    Icon,
  },
};
</script>

<style lang="scss">
.logout {
  display: flex;
  align-items: center;
  &__icon {
    $size: 19px;
    width: $size;
    height: $size;
    margin-right: 12px;
    fill: #fff;
  }
  &__label {
    font-weight: 700;
  }
}
</style>
