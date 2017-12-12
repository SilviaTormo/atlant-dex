<template lang='pug'>
.balance__currencyContainer
  .balance__main
    .balance__currency
      Icon.balance__currencyIcon(:id="'cur_'+ currency")
      .balance__currencyName(:class="activeClass") {{currency}}
      Icon.balance__icon.balance__icon--qr(id="qr")
    .balance__amount
      .balance__currencyBalance {{balance}}
      .balance__equivBalance {{balanceEq}}
    Icon.balance__icon.balance__icon--alert(id="alert-inactive")
</template>

<script>
import Icon from './Icon';

export default {
  data() {
    return {
    };
  },
  computed: {
    activeClass() {
      return (this.isActive) ? 'balance__currencyName--active' : '';
    },
  },
  methods: {
  },
  props: {
    currency: {
      type: String,
      required: true,
    },
    balance: {
      type: [Number, String],
      default: 0,
      required: false,
    },
    balanceEq: {
      type: [Number, String],
      default: 0,
      required: false,
    },
    isActive: {
      type: Boolean,
      default: false,
      required: false,
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
  &__main {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 30px;
    &:hover {
      cursor: pointer;
      color: #ffc600;
    }
  }
  &__currency {
    display: flex;
    align-items: center;
  }
  &__currencyIcon {
    $size: 25px;
    width: $size;
    height: $size;
    margin-right: 13px;
  }
  &__currencyName {
    font-size: 12px;
    margin-right: 28px;
    text-transform: uppercase;
    &--active {
      color: #ffc600;
    }
  }
  &__amount {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
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
    }
    &--alert {
      fill: #044669;
      margin-top: 5px;
    }
  }
}
</style>
