<template lang="pug">
.user
  Icon.user__icon(id="user")
  .user__label User info
  Icon.user__triangle(id="triangle")
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
.user {
  display: flex;
  align-items: center;
  &__icon {
    $size: 19px;
    width: $size;
    height: $size;
    fill: #fff;
  }
  &__label {
    font-weight: 700;
    margin: 0 12px;
  }
  &__triangle {
    $size: 7px;
    width: $size;
    height: $size;
    fill: #fff;
  }
}
</style>
