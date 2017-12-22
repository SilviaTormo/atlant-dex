<template lang="pug">
Modal.orderStatus(name="orderStatus")
  .orderStatus__title {{type}} {{currency}}
  .orderStatus__block(v-if="isSuccess")
    Icon.orderStatus__icon(id="orderStatusSucceed")
    .orderStatus__text The operation was successfully done.
  .orderStatus__block(v-else)
    Icon.orderStatus__icon(id="orderStatusFailed")
    .orderStatus__text Something went wrong.
    .orderStatus__text Please try again.
</template>

<script>
import {mapState} from 'vuex';
import Icon from 'components/Icon';
import Modal from 'components/modals/Modal';

export default {
  computed: {
    ...mapState('modal', {
      type: (state) => state.data.type,
      currency: (state) => state.data.currency,
      isSuccess: (state) => state.data.isSuccess,
    }),
  },
  components: {
    Icon,
    Modal,
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
