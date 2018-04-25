<template lang="pug">
Modal
  .inDemo
    Icon.inDemo__icon(id="info")
    .inDemo__text ATLANT exchange is currently in demo, live trading to be enabled once released
</template>

<script>
import Icon from 'components/Icon';
import Modal from 'components/modals/Modal';

export default {
  components: {
    Icon,
    Modal,
  },
};
</script>

<style lang="scss">
@import "~variables";
.inDemo {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 522px;
  justify-content: space-between;
  &__icon {
    margin: auto;
    $size: 128px;
    width: $size;
    height: $size;
    fill: $color_yellow;
  }
  &__text {
    font-size: 18px;
    margin-top: 64px;
    text-align: center;
  }
}
</style>
