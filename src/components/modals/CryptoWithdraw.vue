<template lang="pug">
Modal
  .cryptoDeposit
    .cryptoDeposit__header
      .cryptoDeposit__title Withdraw BTC
    .cryptoDeposit__content(v-if="step == 0")
      IInput.cryptoDeposit__input(placeholder="BTC wallet address", v-model="address")
      IInput.cryptoDeposit__input(placeholder="Withdrawal amount BTC", v-model="amount")
      .cryptoDeposit__amountText Your will receive:
      .cryptoDeposit__amount 0,00714512
      BButton.cryptoDeposit__button(rounded @click="step++") Withdraw
      .cryptoDeposit__fee Withdrawal fee: #[span.cryptoDeposit__feeAmt 0.00017] BTC
    Status.cryptoDeposit__status(v-if="step == 1" isSuccess)
      .fiat__statusMsg {{ isSuccess ? 'Completed' : 'Failed' }}
</template>

<script>
import {mapMutations} from 'vuex';
import BButton from 'components/BButton';
import IInput from 'components/IInput';
import Modal from 'components/modals/Modal';
import Status from 'components/modals/Status.vue';

export default {
  data() {
    return {
      address: '',
      amount: '',
      step: 0,
      isSuccess: false,
    };
  },
  methods: {
    ...mapMutations('modal', {
      openModal: 'open',
    }),
  },
  components: {
    Modal,
    BButton,
    IInput,
    Status,
  },
};
</script>

<style lang="scss">
@import "~variables";
@import "~sass/bootstrap/media";

.cryptoDeposit {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__title{
    font-size: 18px;
    font-weight: 900;
    text-transform: uppercase;
    color: #ffc600;
    margin-bottom: 32px;
  }
  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__input {
    margin-bottom: 30px;
    width: 211px;
  }
  &__amountText {
    height: 16px;
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 17px;
  }
  &__amount {
    color: #ffc600;
    font-size: 22px;
    font-weight: 400;
    margin-bottom: 20px;
  }
  &__button {
    padding-left: 45px;
    padding-right: 45px;
    border-radius: 3px;
    text-transform: uppercase;
  }
  &__fee {
    font-size: 14px;
    margin-top: 35px;
  }
  &__feeAmt {
    color: #31ecce;
  }
}

@include media-breakpoint-down(md) {
}
</style>
