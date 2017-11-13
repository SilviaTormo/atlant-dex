<template lang="pug">
.balance
  .balance__currency {{currency}}
  .balance__amount {{balance}}
  Icon.balance__icon(id='deposit' @click="deposit()")
</template>

<script>
import {mapState} from 'vuex';
import Icon from './Icon';

export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapState('user', {
      balance: 'balance',
    }),
  },
  methods: {
    deposit() {
      this.openInDemo();
    },
  },
  props: {
    currency: {
      type: String,
      default: 'ETH',
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
.balance {
  display: flex;
  align-items: center;
  &__currency {
    font-size: 16px;
    font-weight: 900;
    text-transform: uppercase;
  }
  &__amount {
    margin: 0 11px;
    font-size: 22px;
    font-weight: 300;
  }
  &__icon {
    $size: 14px;
    height: $size;
    width: $size;
    fill: $color_green;
    cursor: pointer;
  }
}
</style>
