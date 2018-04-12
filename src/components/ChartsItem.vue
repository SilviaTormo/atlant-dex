<template lang='pug'>
.chartItem
  Icon.chartItem__currencyIcon(:id="'cur_'+ currency")
  .chartItem__currencyContainer
    .chartItem__main
      .chartItem__row
        .chartItem__currencyName(:class="activeClass") {{currency}}
        .chartItem__price {{price}}
      .chartItem__row
        .chartItem__currencyFull {{fullCurrencyName()}}
        .chartItem__change
          Icon.chartItem__chngIcon(id="arrow", :class="{'chartItem__chngIcon--neg': priceChng < 0}")
          .chartItem__changeAmt(:class="{'chartItem__changeAmt--neg': priceChng < 0}") {{absPriceChng}}%
    .chartItem__additional(v-if="isActive")
      .chartItem__separator —
        .chartItem__details #[.chartItem__detail Market Cap] #[span.chartItem__number ${{toCurrencyFormat(cap)}}]
        .chartItem__details #[.chartItem__detail Volume] #[span.chartItem__number ${{toCurrencyFormat(volume)}}]
      .chartItem__separator —
      .chartItem__deposit
        Icon.chartItem__depositIcon(id="deposit")
        .chartItem__actionText(@click="makeDeposit()") Make deposit
      .chartItem__separator —
  Icon.chartItem__icon.chartItem__icon--alert(id="alert-inactive")
  Icon.chartItem__icon.chartItem__icon--triagle(id="triangle2" v-show="isActive")
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';
import {getCryptoName} from 'services/misc';
import Icon from './Icon';

export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters('membership', [
      'isLoggedIn',
    ]),
    activeClass() {
      return (this.isActive) ? 'chartItem__currencyName--active' : '';
    },
    absPriceChng() {
      return Math.abs(this.priceChng);
    },
  },
  methods: {
    ...mapMutations('modal', {
      openModal: 'open',
    }),
    fullCurrencyName() {
      const name = this.currency.toUpperCase();
      return getCryptoName(name);
    },
    makeDeposit() {
      if (this.isLoggedIn) {
        this.openModal({
          name: 'cryptoDeposit',
          data: {
            currency: this.currency,
          },
        });
      } else {
        this.openModal({
          name: 'signUp',
        });
      }
    },
    toCurrencyFormat(amount) {
      return amount.replace(/(\d)(?=(\d{3})+\.)/g, '$1 ');
    },
  },
  props: {
    currency: {
      type: String,
      required: true,
    },
    price: {
      type: [Number, String],
      required: true,
    },
    priceChng: {
      type: [Number, String],
      required: true,
    },
    cap: {
      type: [Number, String],
      default: 0,
      required: false,
    },
    volume: {
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

.chartItem {
  display: flex;
  align-items: flex-start;
  margin-top: 25px;
  position: relative;
  &__currencyContainer {
    width: 100%;
  }
  &__main {
    &:hover {
      cursor: pointer;
      color: #ffc600;
    }
  }
  &__row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  &__currencyIcon {
    $size: 25px;
    width: $size;
    height: $size;
    margin-right: 13px;
  }
  &__currencyName {
    font-size: 12px;
    font-weight: bold;
    margin-top: 6px;
    text-transform: uppercase;
    &--active {
      color: #ffc600;
    }
  }
  &__price {
    font-size: 18px;
    font-weight: 400;
  }
  &__icon{
    $size: 12px;
    width: $size;
    height: $size;
    &--alert {
      fill: #044669;
      margin-top: 3px;
      margin-left: 14px;
    }
    &--triagle {
      fill: #ffc600;
      position: absolute;
      top: 6px;
      left: -29px;
      transform: rotate(-90deg);
    }
  }
  &__change {
    display: flex;
    align-items: center;
  }
  &__chngIcon {
    width: 11px;
    height: 9px;
    margin-right: 3px;
    fill: $color_green;
    &--neg {
      fill: $color_red;
      transform: rotate(180deg);
    }
  }
  &__changeAmt {
    font-size: 14px;
    font-weight: bold;
    color: $color_green;
    &--neg {
      color: $color_red;
    }
  }
  &__deposit {
    margin: 18px 0;
    display: flex;
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
    margin-right: 11px;
  }
  &__details {
    margin: 18px 0;
    display: flex;
    font-size: 11px;
    color: #5b87a0;
  }
  &__detail {
    width: 70px;
    margin-right: 14px;
  }
  &__number {
    white-space: nowrap;
  }
}
</style>
