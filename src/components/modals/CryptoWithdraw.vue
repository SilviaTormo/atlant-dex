<template lang="pug">
Modal
  .cryptoWithdraw
    .cryptoWithdraw__header
      .cryptoWithdraw__title Withdraw {{data.currency}}
    .cryptoWithdraw__content(v-if="step == 0")
      IInput.cryptoWithdraw__input(placeholder="BTC wallet address", v-model="address")
      IInput.cryptoWithdraw__input(placeholder="Withdrawal amount BTC", v-model="amount")
      .cryptoWithdraw__amountText Your will receive:
      .cryptoWithdraw__amount {{netAmount}}
      BButton.cryptoWithdraw__button(color="malachite" rounded  @click.native="step++") Withdraw
      .cryptoWithdraw__fee Withdrawal fee: #[span.cryptoWithdraw__feeAmt {{fee}}] #[span.cryptoWithdraw__currency {{data.currency}}]
    TFA(v-if="step == 1", :onConfirm="tryConfirmation" text="Enter 2FA code to confirm withdrawal", :isModal="true")
    Status.cryptoWithdraw__status(v-if="step == 2", :isSuccess="isSuccess")
      .fiat__statusMsg {{ isSuccess ? 'Completed' : 'Failed' }}
</template>

<script>
import {mapState, mapMutations} from 'vuex';
import BButton from 'components/BButton';
import IInput from 'components/IInput';
import Modal from 'components/modals/Modal';
import TFA from 'components/modals/TFA';
import Status from 'components/modals/Status.vue';

export default {
  data() {
    return {
      address: '',
      amount: '',
      step: 0,
      fee: 0.00017,
      isSuccess: false,
    };
  },
  computed: {
    ...mapState('modal', {
      data: 'data',
    }),
    netAmount() {
      return Math.max(this.amount- this.fee, 0);
    },
  },
  methods: {
    ...mapMutations('modal', {
      openModal: 'open',
    }),
    tryConfirmation(code) {
      if (code) {
        this.step += 1;
        this.isSuccess = true;
      }
    },
  },
  components: {
    Modal,
    BButton,
    IInput,
    Status,
    TFA,
  },
};
</script>

<style lang="scss">
@import "~variables";
@import "~sass/bootstrap/media";

.cryptoWithdraw {
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
  &__currency {
    text-transform: uppercase;
  }
}

@include media-breakpoint-down(md) {
}
</style>
