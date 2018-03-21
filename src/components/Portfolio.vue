<template lang='pug'>
.portfolio
  .portfolio__item.portfolio__item--header
    .portfolio__headerLine
      .portfolio__header Portfolio value:
      Dropdown.portfolio__headerDropdown(:options="currencies" v-model="selected")
    .portfolio__headerLine
      .portfolio__balance $651.240
      .portfolio__change
        Icon.portfolio__chngIcon(id="arrow", :class="{'portfolio__chngIcon--neg': percChng < 0}")
        .portfolio__changeAmt(:class="{'portfolio__changeAmt--neg': percChng < 0}") {{percChng}}%
      .portfolio__headerText 24 hr change
  .portfolio__item
    .portfolio__headerLine
      .portfolio__header Coins:
      Icon.portfolio__icon(id="refresh")
    BalanceItem(v-for="bal in balances", v-if="!isFiatCurrency(bal.currency) & bal.availableFunds > 0", :key="bal.currency",
      :data="bal", :isActive="bal.currency == selectedCur", :isCrypto="!isFiatCurrency(bal.currency)", @click.native="openCur(bal.currency)")
    BalanceItem(v-for="bal in balances", v-if="!isFiatCurrency(bal.currency) && bal.availableFunds == 0 && showAll", :key="bal.currency",
      :data="bal", :isActive="bal.currency == selectedCur", :isCrypto="!isFiatCurrency(bal.currency)", @click.native="openCur(bal.currency)")
    Icon.portfolio__EllipsisIcon(v-if="!showAll" id="ellipsis" @click="toggleShowAll()")
  .portfolio__item
    .portfolio__headerLine
      .portfolio__header Fiat:
      Icon.portfolio__icon(id="refresh")
    BalanceItem(v-for="bal in balances", v-if="isFiatCurrency(bal.currency)", :key="bal.currency",
      :data="bal", :isActive="bal.currency == selectedCur", :isCrypto="!isFiatCurrency(bal.currency)", @click.native="openCur(bal.currency)")
</template>

<script>
import {mapState} from 'vuex';
import {isFiat} from 'services/misc';
import Icon from './Icon';
import Dropdown from './Dropdown';
import BalanceItem from './BalanceItem';

export default {
  data() {
    return {
      showAll: false,
      selected: '',
      selectedCur: 'BTC',
      percChng: 2.73,
      balances: [
        {
          currency: 'BTC',
          availableFunds: 0.00714512,
          balanceUSD: '$25 695,94',
          isCrypto: true,
        },
        {
          currency: 'ETH',
          availableFunds: 6.02981032,
          balanceUSD: '$3 773,11',
          isCrypto: true,
        },
        {
          currency: 'ATL',
          availableFunds: 6.02981032,
          balanceUSD: '$3 773,11',
          isCrypto: true,
        },
        // {
        //   name: 'tether',
        //   isCrypto: true,
        // },
        // {
        //   name: 'usd',
        //   balance: '4 960.02',
        //   balanceUSD: '$32 415,10',
        //   isCrypto: false,
        // },
        // {
        //   name: 'eur',
        //   balance: '27 230.00',
        //   balanceUSD: '$3 773,11',
        //   isCrypto: false,
        // },
      ],
    };
  },
  computed: {
    ...mapState('user', {
      currencies: 'userCurrencies',
    }),
    ...mapState('trade', {
      // balances: 'wallet',
    }),
  },
  methods: {
    openCur(cur) {
      this.selectedCur = cur;
    },
    toggleShowAll() {
      this.showAll = true;
    },
    isFiatCurrency(cur) {
      return isFiat(cur);
    },
  },
  components: {
    Icon,
    Dropdown,
    BalanceItem,
  },
};

</script>

<style lang="scss">
@import "~variables";
@import '~sass/bootstrap/media';

.portfolio {
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
    font-size: 12px;
    border-top: 1px solid #00334C;
    &--header {
      font-weight: 700;
    }
  }
  &__headerLine {
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-transform: uppercase;
    &:first-of-type {
      margin-bottom: 21px;
      align-items: flex-end;
    }
  }
  &__balance {
    color: #31edd7;
    font-size: 22px;
    font-weight: 500;
  }
  &__headerDropdown {
    width: 50px;
    font-size: 12px;
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
  &__EllipsisIcon {
    width: 30px;
    height: 5px;
    fill: #044669;
    cursor: pointer;
  }
  &__changeAmt {
    font-size: 14px;
    color: $color_green;
    &--neg {
      color: $color_red;
    }
  }
  &__headerText {
    font-size: 10px;
    text-transform: lowercase;
    font-weight: 400;
  }
}
</style>
