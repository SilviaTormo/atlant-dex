<template lang="pug">
.orderStatus
  .orderStatus__title Success
  .orderStatus__block(v-if="isSuccess")
    Icon.orderStatus__icon(id="orderStatusSucceed")
  .orderStatus__block(v-else)
    Icon.orderStatus__icon(id="orderStatusFailed")
  slot
</template>

<script>
import Icon from 'components/Icon';

export default {
  props: {
    isSuccess: {
      type: [Boolean, String],
      required: true,
    },
  },
  components: {
    Icon,
  },
};
</script>

<style lang="scss">
@import "~variables";
.orderStatus {

  &__title {
    margin-top: 30px;
    color: #ffc600;
    font-size: 18px;
    font-weight: 900;
    text-transform: uppercase;
  }
  &__icon {
    width: 150px;
    height: 150px;
    margin: 90px auto;
  }
  &__text {
    color: #ffffff;
    text-align: center;
    font-size: 30px;
    font-weight: 300;
    line-height: 45px;
  }
}

</style>
