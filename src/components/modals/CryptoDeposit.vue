<template lang="pug">
Modal
  .cryptoDeposit
    .cryptoDeposit__title Deposit BTC
    QR.cryptoDeposit__qr(text="1Em13kZhv8VZcqDFhTE7TSAuTaxzRrykmG" size="148")
    .cryptoDeposit__addressText Your deposit address:
    .cryptoDeposit__address 1Em13kZhv8VZcqDFhTE7TSAuTaxzRrykmG
    BButton.cryptoDeposit__button(rounded) Copy
    .cryptoDeposit__confirmations Funds will be deposited automatically after 3 confirmations
</template>

<script>
import {mapMutations} from 'vuex';
import BButton from 'components/BButton';
import QR from 'components/QR';
import Modal from 'components/modals/Modal';

export default {
  data() {
    return {
      email: '',
      password: '',
      remember: false,
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
    QR,
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
  &__qr {
    margin-bottom: 21px;
  }
  &__addressText {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    margin-bottom: 17px;
  }
  &__address {
    color: #ffc600;
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 23px;
  }
  &__button {
    padding-left: 45px;
    padding-right: 45px;
    border-radius: 3px;
    text-transform: uppercase;
  }
  &__confirmations {
    font-size: 10px;
    font-weight: 400;
    text-align: center;
    margin-top: 35px;
  }
}

@include media-breakpoint-down(md) {
}
</style>
