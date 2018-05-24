<template lang="pug">
.pair
  Dropdown.pair__select(
    :options="baseCurrencyOptions",
    :value="baseCurrency",
    @input="changeBaseCurrency",
    no-border,
    no-padding,
  )
    template(slot="option", slot-scope="props")
      .pair__label
        Icon.pair__icon.pair__icon--option(:id="getCurrencyIconId(props.option)")
        div {{props.option}}
    template(slot="singleLabel", slot-scope="props")
      .pair__label
        Icon.pair__icon(:id="getCurrencyIconId(props.option)")
        span {{props.option}}
  Icon.pair__exchange(id="exchange")
  Dropdown.pair__select(
    :options="quoteCurrencyOptions",
    :value="quoteCurrency",
    @input="changeQuoteCurrency",
    no-border,
    no-padding,
  )
    template(slot="option", slot-scope="props")
      .pair__label
        Icon.pair__icon.pair__icon--option(:id="getCurrencyIconId(props.option)")
        div {{props.option}}
    template(slot="singleLabel", slot-scope="props")
      .pair__label
        Icon.pair__icon(:id="getCurrencyIconId(props.option)")
        span {{props.option}}
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
      'getPairs',
      'getPairInfo',
    ]),
    setQuoteAfterBaseChange(baseCurrency) {
      // This should be moved to Store
      // Do not change if current quote available for new base
      if (this.pairs[baseCurrency].includes(this.quoteCurrency)) return;
      // If not, change quote currency for first available
      this.changeQuoteCurrency(this.pairs[baseCurrency][0]);
    },
    getCurrencyIconId(currencyName) {
      return `cur_${currencyName}`.toLocaleLowerCase();
    },
  },
  watch: {
    baseCurrency(baseCurrency) {
      this.setQuoteAfterBaseChange(baseCurrency);
      this.getPairInfo();
    },
    quoteCurrency() {
      this.getPairInfo();
    },
  },
  created() {
    this.getPairs();
    this.getPairInfo();
  },
  components: {
    Icon,
    Dropdown,
  },
};
</script>

<style lang="scss">
@import 'variables';
.pair {
  align-items: center;
  display: flex;
  &__icon {
    $size: 25px;
    fill: $color_white;
    height: $size;
    margin-right: 10px;
    width: $size;

    &--option {
      $size: 17px;
      width: $size;
      height: $size;
    }
  }
  &__select {
    max-width: 90px;
    min-width: 90px;
  }
  &__label {
    align-items: center;
    display: flex;
    flex-direction: row;
    font-size: 16px;
    font-weight: bold;
    width: max-content;
  }
  &__option {
    align-items: center;
    display: flex;
    flex-direction: row;
    font-size: 16px;
    font-weight: bold;
  }
  &__exchange {
    $size: 15px;
    fill: $color_yellow;
    height: $size;
    margin: 0 10px;
    transform: rotate(90deg);
    width: $size;
  }
}
</style>
