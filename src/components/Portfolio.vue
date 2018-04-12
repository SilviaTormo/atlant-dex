<template lang='pug'>
.portfolio
  .portfolio__item.portfolio__item--header
    .portfolio__headerLine
      .portfolio__header Portfolio value:
      // Dropdown.portfolio__headerDropdown(:options="currencies" v-model="selected")
    .portfolio__headerLine
      .portfolio__balance ${{toCurrencyFormat(portfolioValue)}}
      // .portfolio__change
        Icon.portfolio__chngIcon(id="arrow", :class="{'portfolio__chngIcon--neg': percChng < 0}")
        .portfolio__changeAmt(:class="{'portfolio__changeAmt--neg': percChng < 0}") {{percChng}}%
      //.portfolio__headerText 24 hr change
  .portfolio__item
    .portfolio__headerLine
      .portfolio__header Coins:
      Icon.portfolio__icon(id="refresh" @click="getBalances")
    BalanceItem(v-for="bal in getUserBalancesInCrypto", :key="bal.currency", :data="bal",
     :isActive="bal.currency === selectedCur", @click.native="openCur(bal.currency)")
    //- BalanceItem(v-for="bal in balances", v-if="bal.isCrypto && bal.availableFunds == 0 && showAll", :key="bal.currency",
      :data="bal", :isActive="bal.currency == selectedCur", :isCrypto="bal.isCrypto", @click.native="openCur(bal.currency)")
    //- Icon.portfolio__EllipsisIcon(v-if="!showAll" id="ellipsis" @click="toggleShowAll()")
  //- .portfolio__item
    .portfolio__headerLine
      .portfolio__header Fiat:
      Icon.portfolio__icon(id="refresh")
    BalanceItem(v-for="bal in getUserBalancesInFiat", :key="bal.currency",
      :data="bal", :isActive="bal.currency == selectedCur", :isCrypto="bal.isCrypto", @click.native="openCur(bal.currency)")
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import Icon from './Icon';
import Dropdown from './Dropdown';
import BalanceItem from './BalanceItem';

export default {
  data() {
    return {
      showAll: false,
      selected: '',
      selectedCur: '',
      percChng: 2.73,
    };
  },
  computed: {
    ...mapGetters('user', {
      getUserBalancesInCrypto: 'getUserBalancesInCrypto',
      getUserBalancesInFiat: 'getUserBalancesInFiat',
      portfolioValue: 'getPortofolioValue',
    }),
  },
  methods: {
    ...mapActions('user', [
      'getBalances',
    ]),
    openCur(cur) {
      this.selectedCur = cur;
    },
    toCurrencyFormat(amount) {
      return amount.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1 ');
    },
    // toggleShowAll() {
    //   this.showAll = true;
    // },
  },
  created() {
    this.getBalances();
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
    &:active {
      animation: spin 0.5s 1 ease-in-out;
    }
    &:hover{
      cursor: pointer;
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

@keyframes spin {
  0%  {-webkit-transform: rotate(0deg);}
  100% {-webkit-transform: rotate(-180deg);}
}
</style>
