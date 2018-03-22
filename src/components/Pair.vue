<template lang="pug">
.pair
  Icon.pair__icon(:id="('cur_' + baseCurrency).toLocaleLowerCase()")
  Dropdown.pair__dropdown(
    :options="baseCurrencyOptions",
    :selectDefault="baseCurrency",
    :value="baseCurrency",
    @change="changeBaseCurrency",
  )
  Icon.pair__exchange(id="exchange")
  Icon.pair__icon(:id="('cur_' + quoteCurrency).toLocaleLowerCase()")
  Dropdown.pair__dropdown(
    :options="quoteCurrencyOptions",
    :selectDefault="quoteCurrency",
    :value="quoteCurrency",
    @change="changeQuoteCurrency",
  )
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex';
import Icon from './Icon';
import Dropdown from './Dropdown';

export default {
  computed: {
    ...mapState('trade', [
      'pairs',
    ]),
    ...mapGetters('trade', [
      'baseCurrency',
      'quoteCurrency',
    ]),
    baseCurrencyOptions() {
      return Object.keys(this.pairs);
    },
    quoteCurrencyOptions() {
      return this.pairs[this.baseCurrency];
    },
  },
  methods: {
    ...mapActions('trade', [
      'changeQuoteCurrency',
      'changeBaseCurrency',
    ]),
    setQuoteAfterBaseChange(baseCurrency) {
      // Do not change if current quote available for new base
      if (this.pairs[baseCurrency].includes(this.quoteCurrency)) return;
      // If not, change quote currency for first available
      this.changeQuoteCurrency(this.pairs[baseCurrency][0]);
    },
  },
  watch: {
    baseCurrency(baseCurrency) {
      this.setQuoteAfterBaseChange(baseCurrency);
    },
  },
  components: {
    Icon,
    Dropdown,
  },
};
</script>

<style lang="scss">
@import "~variables";
.pair {
  display: flex;
  align-items: center;
  &__icon {
    $size: 25px;
    fill: $color_white;
    width: $size;
    height: $size;
    margin-right: 10px;
  }
  &__dropdown {
    min-width: 64px;
    max-width: 64px;
    font-size: 16px;
  }
  &__currency {
    font-weight: bold;
    font-size: 16px;
  }
  &__exchange {
    $size: 15px;
    height: $size;
    width: $size;
    transform: rotate(90deg);
    margin: 0 10px;
    fill: $color_yellow;
  }
}
</style>
