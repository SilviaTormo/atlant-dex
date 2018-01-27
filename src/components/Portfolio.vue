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
    BalanceItem(v-for="bal in balances", v-if="bal.isCrypto && bal.balance", :key="bal.name",
      :currency="bal.name", :balance="bal.balance", :balanceEq="bal.balanceUSD",
      :isActive="bal.name == selectedCur", @click.native="openCur(bal.name)")
    BalanceItem(v-for="bal in balances", v-if="bal.isCrypto && !bal.balance && showAll", :key="bal.name",
      :currency="bal.name", :balance="bal.balance", :balanceEq="bal.balanceUSD",
      :isActive="bal.name == selectedCur", @click.native="openCur(bal.name)")
    Icon.portfolio__EllipsisIcon(v-if="!showAll" id="ellipsis" @click="toggleShowAll()")
  .portfolio__item
    .portfolio__headerLine
      .portfolio__header Fiat:
      Icon.portfolio__icon(id="refresh")
    BalanceItem(v-for="bal in balances", v-if="!bal.isCrypto", :key="bal.name",
      :currency="bal.name", :balance="bal.balance", :balanceEq="bal.balanceUSD",
      :isActive="bal.name == selectedCur", @click.native="openCur(bal.name)")
</template>

<script>
import {mapState} from 'vuex';
import Icon from './Icon';
import Dropdown from './Dropdown';
import BalanceItem from './BalanceItem';

export default {
  data() {
    return {
      showAll: false,
      selected: '',
      selectedCur: 'btc',
      percChng: 2.73,
      balances: [
        {
          name: 'btc',
          balance: 0.00714512,
          balanceUSD: '$25 695,94',
          isCrypto: true,
        },
        {
          name: 'eth',
          balance: 6.02981032,
          balanceUSD: '$3 773,11',
          isCrypto: true,
        },
        {
          name: 'tether',
          isCrypto: true,
        },
        {
          name: 'usd',
          balance: '4 960.02',
          balanceUSD: '$32 415,10',
          isCrypto: false,
        },
        {
          name: 'eur',
          balance: '27 230.00',
          balanceUSD: '$3 773,11',
          isCrypto: false,
        },
      ],
    };
  },
  computed: {
    ...mapState('user', {
      currencies: 'userCurrencies',
    }),
  },
  methods: {
    openCur(cur) {
      this.selectedCur = cur;
    },
    toggleShowAll() {
      this.showAll = true;
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
