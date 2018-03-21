<template lang='pug'>
.quotes
  .quotes__item.quotes__item--header
    .quotes__headerLine
      .quotes__header Quotes:
      .quotes__headerText 24 hr change
      Dropdown.quotes__headerDropdown(:options="currencies" v-model="selected")
  .quotes__item
    .quotes__headerLine
      input.quotes__search(type="text", placeholder="Search for currencies" v-model="search")
      Icon.quotes__searchIcon(id="search")
  .quotes__item
    .quotes__headerLine
      .quotes__header Coins:
      Icon.quotes__icon(id="refresh")
    QuoteItem(v-for="q in filteredQuotes", :key="q.currency",
    :currency="q.currency", :price="q.price", :priceChng="q.priceChng", :cap="q.cap", :volume="q.volume",
    :isActive="activeCur == q.currency", @click.native="openQuote(q.currency)")
</template>

<script>
import {mapState} from 'vuex';
import {getCryptoName} from 'services/misc';
import Icon from './Icon';
import Dropdown from './Dropdown';
import QuoteItem from './QuoteItem';

export default {
  data() {
    return {
      selected: '',
      search: '',
      activeCur: 'btc',
      quotes: [
        {
          currency: 'btc',
          price: '$11 388,60',
          priceChng: '-3.71',
          cap: '$44 192 919 519',
          volume: '$1 100 850 000',
        },
        {
          currency: 'eth',
          price: '$459,70',
          priceChng: '-4.10',
          cap: '$44 192 919 519',
          volume: '$1 100 850 000',
        },
        {
          currency: 'tether',
          price: '$459,70',
          priceChng: '-4.10',
          cap: '$44 192 919 519',
          volume: '$1 100 850 000',
        },
      ],
    };
  },
  computed: {
    ...mapState('user', {
      currencies: 'userCurrencies',
    }),
    filteredQuotes() {
      if (!this.search) return this.quotes;
      return this.quotes.filter(({currency}) => {
        const fullName = getCryptoName(currency.toUpperCase()) || '';
        const searchLowerCased = this.search.toLowerCase();
        return (
            currency.toLowerCase().includes(searchLowerCased)
            || fullName.toLowerCase().includes(searchLowerCased)
        );
      });
    },
  },
  methods: {
    openQuote(cur) {
      this.activeCur = cur;
    },
//    isSearched(cur) {
//      return cur.includes(this.search);
//    },
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
  position: relative;
  &:after {
    display: block;
    content: '';
    height: 1px;
    border-top: 1px solid #00334C;
  }
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
    border-top: 1px solid #00334C;
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
