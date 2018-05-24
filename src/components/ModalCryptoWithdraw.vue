<template lang="pug">
ModalLayout
  .cryptoWithdraw
    .cryptoWithdraw__header
      .cryptoWithdraw__title Withdraw {{data.currency}}
    .cryptoWithdraw__content(v-if="step == 0")
      IInput.cryptoWithdraw__input(:placeholder="data.currency + ' wallet address'", v-model="address")
      IInput.cryptoWithdraw__input(:placeholder="data.currency + ' withdrawal amount (e.g. 0.5)'", type="number", v-model="amount")
      .cryptoWithdraw__amountText Your will receive:
      .cryptoWithdraw__amount {{netAmount}}
      BButton.cryptoWithdraw__button(color="malachite" rounded  @click.native="withdraw") Withdraw
      .cryptoWithdraw__fee Withdrawal fee: #[span.cryptoWithdraw__feeAmt {{fee}}] #[span.cryptoWithdraw__currency {{data.currency}}]
    TFA(v-if="step == 1", :onConfirm="tryConfirmation", :onCancel="cancelConfirmation", :onResend="withdraw", :isModal="true")
    Status.cryptoWithdraw__status(v-if="step === 2")
      .fiat__statusMsg Completed
</template>

<script>
import {mapState, mapMutations} from 'vuex';
import * as User from 'services/api/user';
import BButton from 'components/BButton';
import IInput from 'components/IInput';
import ModalLayout from '@/layouts/ModalLayout';
import TFA from 'components/TFA';
import Status from 'components/Status.vue';

export default {
  data() {
    return {
      address: '',
      amount: '',
      step: 0,
      fee: 0.00017,
      transId: '',
    };
  },
  computed: {
    ...mapState('modal', {
      data: 'data',
    }),
    netAmount() {
      return Math.max(this.amount - this.fee, 0);
    },
  },
  methods: {
    ...mapMutations('modal', {
      openModal: 'open',
    }),
    clearData() {
      this.transId = '';
    },
    setStep(step) {
      this.step = step;
    },
    withdraw() {
      User.withdraw({
        currency: this.data.currency,
        amount: this.amount,
        address: this.address,
      }).then((response) => {
        this.transId = response.data.transactionId;
        this.setStep(1);
      });
    },
    tryConfirmation(code) {
      User.confirmWithdraw({
        currency: this.data.currency,
        transactionId: this.transId,
        code,
      }).then(() => {
        this.setStep(2);
      });
    },
    cancelConfirmation() {
      this.setStep(0);
      this.clearData();
    },
  },
  components: {
    ModalLayout,
    BButton,
    IInput,
    Status,
    TFA,
  },
};
</script>

<style lang="scss">
@import 'variables';

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
    width: 80%;
  }
  &__input {
    margin-bottom: 30px;
    width: 100%;
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
</style>
