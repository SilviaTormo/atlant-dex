<template lang='pug'>
.balance(:class="{'balance--zero': data.availableFunds == 0}")
  Icon.balance__currencyIcon(:class="{'balance__currencyIcon--zero': data.availableFunds == 0}", :id="logoId")
  .balance__currencyContainer
    .balance__main
      .balance__currencyName(:class="activeClass") {{data.currency}}
      //Icon.balance__icon.balance__icon--qr(id="qr")
      .balance__amount
        .balance__currencyBalance {{data.availableFunds}}
        .balance__equivBalance {{data.availableFunds}}
    .balance__additional(v-if="isActive")
      div &#8212;
      .balance__deposit
        Icon.balance__depositIcon(id="deposit")
        .balance__actionText(v-if="isCrypto" @click="openCrypto('cryptoDeposit')") Make deposit
        .balance__actionText(v-if="isCrypto" @click="openCrypto('cryptoWithdraw')") Withdraw
        .balance__actionText(v-if="!isCrypto" @click="openFiat(true)") Make deposit
        .balance__actionText(v-if="!isCrypto" @click="openFiat(false)") Withdraw
      div &#8212;
      .balance__withdraw
  Icon.balance__icon.balance__icon--alert(id="alert-inactive")
</template>

<script>
import {mapMutations} from 'vuex';
import Icon from './Icon';

export default {
  data() {
    return {
    };
  },
  computed: {
    activeClass() {
      return (this.data.isActive) ? 'balance__currencyName--active' : '';
    },
    logoId() {
      return 'cur_'+ this.data.currency.toLowerCase();
    },
  },
  methods: {
    ...mapMutations('modal', {
      openModal: 'open',
    }),
    openFiat(isDeposit) {
      this.openModal({
        name: 'fiat',
        data: {
          isDeposit,
          currency: this.data.currency,
        },
      });
    },
    openCrypto(name) {
      this.openModal({
        name,
        data: {
          currency: this.data.currency,
        },
      });
    },
  },
  props: {
    data: {
      type: Object,
      validator: (value) => {
        return value.currency !== '';
      },
    },
    isActive: {
      type: Boolean,
      default: false,
      required: false,
    },
    isCrypto: {
      type: Boolean,
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
@import '~sass/bootstrap/media';

.balance {
  display: flex;
  align-items: flex-start;
  margin-bottom: 30px;
  &--zero {
    opacity: 0.2;
  }
  &:hover {
    opacity: 1;
  }
  &__currencyContainer {
    width: 100%;
  }
  &__main {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    &:hover {
      cursor: pointer;
      color: #ffc600;
    }
  }
  &__currencyIcon {
    $size: 25px;
    width: $size;
    height: $size;
    margin-top: 5px;
    margin-right: 13px;
  }
  &__currencyName {
    font-size: 12px;
    font-weight: bold;
    margin-top: 9px;
    margin-right: 5px;
    text-transform: uppercase;
    &--active {
      color: #ffc600;
    }
  }
  &__amount {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin: 0;
  }
  &__currencyBalance {
    font-size: 18px;
    margin-top: 3px;
    margin-bottom: 10px;
    font-weight: 400;
  }
  &__equivBalance {
    font-size: 14px;
    font-weight: 400;
  }
  &__icon{
    $size: 12px;
    width: $size;
    height: $size;
    &--qr {
      fill: #fff;
      margin-top: 9px;
    }
    &--alert {
      fill: #044669;
      margin-top: 5px;
      margin-left: 14px;
    }
  }
  &__deposit {
    margin: 18px 0;
    display: flex;
    justify-content: space-between;
  }
  &__actionText {
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
  &__depositIcon {
    $size: 14px;
    width: $size;
    height: $size;
  }
}
</style>
