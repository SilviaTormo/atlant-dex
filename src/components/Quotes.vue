<template lang='pug'>
.quotes
  .quotes__item.quotes__item--header
    .quotes__headerLine
      .quotes__header Quotes:
      .quotes__headerText 24 hr change
      Dropdown.quotes__headerDropdown(:options="currencies" v-model="selected")
  .quotes__item
    .quotes__headerLine
      input.quotes__search(type="text", placeholder="Search for currencies")
      Icon.quotes__searchIcon(id="search")
  .quotes__item
    .quotes__headerLine
      .quotes__header Coins:
      Icon.quotes__icon(id="refresh")
    QuoteItem(currency="btc", price="$11 388,60", :priceChng="-3.71", cap="$44 192 919 519", volume="$1 100 850 000", :isActive="activeCur == 'btc'", @click.native="openQuote('btc')")
    QuoteItem(currency="eth", price="$459,70", :priceChng="-4.10", cap="$44 192 919 519", volume="$1 100 850 000", :isActive="activeCur == 'eth'", @click.native="openQuote('eth')")
</template>

<script>
import {mapState} from 'vuex';
import Icon from './Icon';
import Dropdown from './Dropdown';
import QuoteItem from './QuoteItem';

export default {
  data() {
    return {
      selected: '',
      activeCur: 'btc',
    };
  },
  computed: {
    ...mapState('user', {
      currencies: 'userCurrencies',
    }),
  },
  methods: {
    openQuote(cur) {
      this.activeCur = cur;
    },
  },
  components: {
    Icon,
    Dropdown,
    QuoteItem,
  },
};

</script>

<style lang="scss">
@import "~variables";
@import '~sass/bootstrap/media';

.quotes {
  &__icon {
    $size: 14px;
    height: $size;
    width: $size;
    fill: #fff;
    &:hover{
      pointer: cursor;
    }
  }
  &__item {
    padding: 32px 18px 32px 25px;
    border-bottom: 1px solid #032537;
    font-size: 12px;
    &--header {
      font-weight: 700;
    }
  }
  &__headerLine {
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-transform: uppercase;
  }
  &__search{
    border: none;
    padding: 0;
    height: 14px;
    width: 100%;
    background-color: transparent;
    color: #5b87a0;
    &::placeholder{
      color: #5b87a0;
    }
  }
  &__searchIcon {
    $size: 18px;
    height: $size;
    width: $size;
    fill: #ffffff;
    &:hover {
      cursor: pointer;
    }
  }
  &__headerDropdown {
    width: 50px;
    font-size: 12px;
  }
  &__headerText {
    font-size: 10px;
    text-transform: lowercase;
    font-weight: 400;
  }
}
</style>
