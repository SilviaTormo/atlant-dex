<template lang='pug'>
.buySell
  .buySell__header
    Icon.buySell__flag(id="flag")
    .buySell__tab(@click="isBuy = true", :class="{'buySell__tab--active': isBuy}") Buy
    .buySell__tab(@click="isBuy = false", :class="{'buySell__tab--active': !isBuy}") Sell
  .buySell__main
    .buySell__types
      Radio(:name="`type${_uid}`", value="market", label="Market", v-model="type", checked)
      Radio(:name="`type${_uid}`", value="limit", label="Limit", v-model="type")
    .buySell__label Amount to {{isBuy ? 'buy' : 'sell'}}
    input.buySell__input(type="number" placeholder="0.0000" step="0.0001" min="0.0000" max="10000.0000", v-model="amount")
    .buySell__wrap(v-if="type === 'limit'")
      .buySell__label Price
      input.buySell__input(type="number", v-model="price")
    .buySell__wrap(v-else)
      .buySell__label Price
      input.buySell__input(type="number", v-model="price", disabled)
    .buySell__label Total
    input.buySell__input(:placeholder="getTotal" disabled)
    BButton.buySell__button(color="yellow" full caps @click="getOrder") Place order
    div.buySell__note Do not forget to top up the trade balance
</template>

<script>
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex';
import {notification} from '@/services/notification';
import Icon from '@/components/Icon';
import Radio from '@/components/Radio';
import BButton from '@/components/BButton';

export default {
  data() {
    return {
      type: 'market',
      isBuy: false,
      amount: 0,
      price: 0,
      total: 0,
    };
  },
  computed: {
    ...mapState('trade', {
      bid: (state) => state.pairInfo.bid,
      ask: (state) => state.pairInfo.ask,
      fee: (state) => state.pairInfo.makerFee,
    }),
    ...mapGetters('membership', {
      isLoggedIn: 'isLoggedIn',
    }),
    ...mapGetters('trade', {
      baseCurrency: 'baseCurrency',
      quoteCurrency: 'quoteCurrency',
    }),
    getPrice() {
      return this.isBuy ? this.ask : this.bid;
    },
    getTotal() {
      let total = 0;
      if (this.type === 'market') {
        total = this.isBuy ? this.ask * this.amount : this.bid * this.amount;
      } else {
        total = this.amount * this.price;
      };
      return (this.isBuy ? total + (total / 100) * this.fee : total - (total / 100) * this.fee).toFixed(8);
    },
  },
  methods: {
    ...mapActions('trade', {
      placeOrder: 'placeOrder',
    }),
    ...mapMutations('modal', {
      openModal: 'open',
    }),
    getOrder() {
      if (!this.isLoggedIn) {
        this.openModal({name: 'signIn'});
        return false;
      };
      if (this.amount <= 0) {
        notification({
          title: 'Negative or zero value:',
          text: 'Please correct the value provided.',
          type: 'error',
        });
        return false;
      };
      this.placeOrder({
        isMarketOrder: this.type === 'market',
        isSellOrder: !this.isBuy,
        baseCurrency: this.baseCurrency,
        quoteCurrency: this.quoteCurrency,
        price: this.price,
        quantity: this.amount,
        isQuantityInBaseCurrency: true,
      }).then(() => {
        this.amount = 0;
        this.total = 0;
      });
    },
  },
  watch: {
    isBuy() {
      this.price = this.getPrice;
    },
    type() {
      this.price = this.getPrice;
    },
    bid() {
      if (this.type === 'market') this.price = this.getPrice;
    },
    ask() {
      if (this.type === 'market') this.price = this.getPrice;
    },
  },
  created() {
    this.price = this.getPrice;
  },
  components: {
    Icon,
    Radio,
    BButton,
  },
};

</script>

<style lang='scss'>
@import "~variables";
.buySell {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__header{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding-top: 24px;
    border-bottom: 1px solid #182235;
  }
  &__flag{
    width: 7px;
    height: 10px;
    margin-right: 8px;
    fill: $color_yellow;
  }
  &__types {
    display: flex;
    justify-content: space-between;
    margin-bottom: 32px;
  }
  &__tab{
    padding: 4px 15px;
    font-weight: bold;
    font-size: 12px;
    text-transform: uppercase;
    line-height: 100%;
    position: relative;
    cursor: pointer;
    &:first-of-type {
      margin-right: 15px;
    }
    &--active{
      color: #7ed321;
      border: 1px solid #182235;
      border-bottom: 0;
      &::after {
        content: "";
        width: 10px;
        height: 1px;
        background-color: #03354f;
        display: block;
        position: absolute;
        bottom: -1px;
        left: 0;
        width: 100%;
      }
    }
  }
  &__main {
    padding: 20px;
    padding-bottom: 0;
  }
  &__label{
    width: 100%;
    margin-bottom: 6px;
    margin-top: 12px;
    font-size: 12px;
  }
  &__input {
    width: 100%;
    &::placeholder {
      color: #fff;
    }
  }
  &__button {
    margin-top: 34px;
    font-size: 12px;
  }
  &__note{
    margin-top: 38px;
    font-size: 9px;
    font-weight: 300;
    text-align: center;
    list-style: none;
    &::before{
      content: "• ";
      color: #f3ad28;
    }
  }
}
</style>
