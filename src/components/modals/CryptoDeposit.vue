<template lang='pug'>
Modal
  .cryptoDeposit
    .cryptoDeposit__title Deposit {{data.currency}}
    QR.cryptoDeposit__qr(:text='address' size='148')
    .cryptoDeposit__addressText Your deposit address:
    .cryptoDeposit__address {{address}}
    BButton.cryptoDeposit__button(color="malachite" rounded v-clipboard='address' @click="makeDeposit()") Copy
    .cryptoDeposit__confirmations Funds will be deposited automatically after 3 confirmations
</template>

<script>
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
import * as User from '@/services/api/user';
import clipboard from '@/directives/clipboard';
import BButton from '@/components/BButton';
import QR from '@/components/QR';
import Modal from '@/components/modals/Modal';

export default {
  data () {
    return {
      address: '',
    };
  },
  computed: {
    ...mapState('modal', {
      data: 'data',
    }),
    ...mapGetters('user', [
      'getCurrencyTransFees',
    ]),
    fee() {
      return this.getCurrencyTransFees.find((item) => item.name === this.data.currency).depositFee;
    },
  },
  methods: {
    ...mapMutations('modal', {
      openModal: 'open',
    }),
    ...mapActions('user', {
      deposit: 'deposit',
    }),
    makeDeposit() {
      this.deposit({
        currency: (this.data.currency).toUpperCase(),
        amount: 100000,
      });
    },
  },
  created() {
    User.getDepositAddress({
      currency: this.data.currency
    }).then((response) => {
      this.address = response.data.address;
    });
  },
  directives: {
    clipboard,
  },
  components: {
    Modal,
    BButton,
    QR,
  },
};
</script>

<style lang='scss'>
@import '~variables';
@import '~@/sass/bootstrap/media';

.cryptoDeposit {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__title{
    font-size: 18px;
    font-weight: 900;
    text-transform: uppercase;
    color: #ffc600;
    margin-bottom: 57px;
  }
  &__qr {
    margin-bottom: 46px;
  }
  &__addressText {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    margin-bottom: 37px;
  }
  &__address {
    color: #ffc600;
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 53px;
  }
  &__button {
    padding: 8px 45px;
    border-radius: 3px;
    font-size: 16px;
    font-weight: 900;
    text-transform: uppercase;
  }
  &__confirmations {
    font-size: 10px;
    font-weight: 400;
    text-align: center;
    margin-top: 45px;
  }
}

@include media-breakpoint-down(md) {
}
</style>
