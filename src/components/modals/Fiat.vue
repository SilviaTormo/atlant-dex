<template lang="pug">
Modal
  .fiat
    .fiat__header
      .fiat__title {{title}} {{data.currency}}
      .fiat__balance(v-if="step == 0") Current balance: #[span.fiat__balanceAmt ${{balance.toFixed(2)}}]
      .fiat__right
    .fiat__content(v-if="step == 0")
      .fiat__block.fiat__block--left
        span.fiat__step
          span.fiat__stepNumber STEP 1
          span Choose {{transactionType}} method:
        .fiat__options
          Radio.fiat__option(v-for="(method, index) in paymentMethods", :key="index", name="paymentSys" value="method.paymentName" v-model="CheckedPaymentSystem")
            Icon.fiat__systemLogo(:id="method.iconName")
        .fiat__bottom
          div ***
          .fiat__note
            p(v-if="data.isDeposit") The funds will be blocked for 24 hours
            p(v-else) Withdrawals to payment systems may take up to 24 hours.
            p Operations are carried out with a commission, with which you can in a #[a.fiat__link special section]
      .fiat__block.fiat__block--right
        .fiat__step
          .fiat__stepNumber STEP 2
          div Enter {{transactionType}} amount:
        IInput.fiat__input(:placeholder="'Amount for ' + transactionType", v-model="amount")
        .fiat__fee Fee: {{fee}}%
        .fiat__toReceive
          span Your balance after operation:
          span.fiat__receiveAmt ${{newBalance.toFixed(2)}}
        IInput.fiat__input(placeholder="Contact information" v-model="contact")
        IInput.fiat__input(placeholder="Comment" v-model="comment")
        BButton.fiat__button(color="malachite" rounded @click="makeDeposit()") Make {{transactionType}}
    Status.fiat__status(v-if="step == 1" isSuccess)
      .fiat__statusMsg {{ isSuccess ? 'Completed' : 'Failed' }}
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex';
import BButton from '@/components/BButton';
import IInput from '@/components/IInput';
import Icon from '@/components/Icon';
import Dropdown from '@/components/Dropdown';
import Radio from '@/components/Radio';
import Modal from '@/components/modals/Modal';
import Status from '@/components/modals/Status.vue';

export default {
  data() {
    return {
      step: 0,
      isSuccess: true,
      amount: '',
      fee: 1,
      paymentMethods: [
        {
          'paymentName': 'sepa',
          'iconName': 'sepa',
        },
        {
          'paymentName': 'swift',
          'iconName': 'swift',
        },
      ],
      CheckedPaymentSystem: '',
      contact: '',
      comment: '',
    };
  },
  computed: {
    ...mapState('modal', {
      data: 'data',
    }),
    ...mapState('user', {
      balance: 'balance',
    }),
    title() {
      return (this.data.isDeposit) ? 'deposit' : 'withdraw';
    },
    transactionType() {
      return (this.data.isDeposit) ? 'deposit' : 'withdrawal';
    },
    newBalance() {
      return this.balance + ((this.data.isDeposit) ? this.amount * (1 - this.fee / 100) : - this.amount * (1 + this.fee / 100));
    },
  },
  methods: {
    ...mapMutations('modal', {
      openModal: 'open',
    }),
    ...mapActions('user', {
      deposit: 'deposit',
    }),
    getPaymentMethods(array) {
      return array.map((item) => item.paymentName);
    },
    makeDeposit() {
      this.deposit({
        currency: this.data.currency,
        amount: 1000,
      });
      this.step++;
    },
  },
  components: {
    Modal,
    BButton,
    Icon,
    IInput,
    Radio,
    Status,
    Dropdown,
  },
};
</script>

<style lang="scss">
@import "~variables";

.fiat {
  width: 100%;
  &__header{
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 30px;
  }
  &__title {
    font-size: 18px;
    font-weight: 900;
    text-transform: uppercase;
    color: #ffc600;
    flex: 1;
    margin-right: auto;
  }
  &__right {
    flex: 1;
    margin-left: auto;
  }
  &__balance {
    font-size: 14px;
  }
  &__balanceAmt {
    font-size: 22px;
    margin-left: 5px;
  }
  &__content{
    display: flex;
  }
  &__block{
    display: flex;
    flex-direction: column;
    flex: 1;
    &--left{
      border-right: 1px dashed #fff;
      padding-right: 30px;
    }
    &--right{
      padding-left: 30px;
    }
  }
  &__step {
    display: flex;
    align-items: flex-start;
    font-size: 14px;
    margin-bottom: 23px;
  }
  &__stepNumber {
    color: #31edd7;
    text-transform: uppercase;
    white-space: nowrap;
    margin-right: 23px;
  }
  &__options {
    display: flex;
    flex-wrap: wrap;
  }
  &__option {
    width: 50%;
  }
  &__systemLogo {
    margin-left: 15px;
    $size: 80px;
    height: $size;
    width: $size;
  }
  &__bottom {
    margin-top: auto;
  }
  &__note{
    font-size: 12px;
    line-height: 20px;
    margin-top: 15px;
  }
  &__link {
    color: #febc09;
    &:hover {
      cursor: pointer;
    }
  }
  &__input{
    margin: 20px 0;
  }
  &__fee {
    color: #31edd7;
    font-size: 14px;
  }
  &__toReceive {
    margin-left: auto;
  }
  &__receiveAmt {
    color: #ffc600;
    font-size: 22px;
    margin-left: 20px;
  }
  &__button{
    text-transform: uppercase;
    width: 176px;
  }
  &__statusMsg {
    min-width: 300px;
    text-align: center;
    text-transform: uppercase;
    font-size: 18px;
    font-weight: 900;
  }
}
</style>
