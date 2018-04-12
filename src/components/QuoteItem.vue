<template lang='pug'>
.quote
  Icon.quote__currencyIcon(:id="'cur_'+ currency")
  .quote__currencyContainer
    .quote__main
      .quote__row
        .quote__currencyName(:class="activeClass") {{currency}}
        .quote__price {{price}}
      .quote__row
        .quote__currencyFull {{fullCurrencyName()}}
        .quote__change
          Icon.quote__chngIcon(id="arrow", :class="{'quote__chngIcon--neg': priceChng < 0}")
          .quote__changeAmt(:class="{'quote__changeAmt--neg': priceChng < 0}") {{absPriceChng}}%
    .quote__additional(v-if="isActive")
      div &#8212;
        .quote__details #[.quote__detail Market Cap] #[span {{cap}}]
        .quote__details #[.quote__detail Volume] #[span {{volume}}]
      div &#8212;
      .quote__deposit
        Icon.quote__depositIcon(id="deposit")
        .quote__actionText(@click="makeDeposit()") Make deposit
      div &#8212;
  Icon.quote__icon.quote__icon--alert(id="alert-inactive")
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
      return (this.isActive) ? 'quote__currencyName--active' : '';
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

.quote {
  display: flex;
  align-items: flex-start;
  margin-top: 25px;
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
}
</style>
