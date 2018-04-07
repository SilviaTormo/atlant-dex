<template lang="pug">
TablePage(
  title="My orders",
  :data="orders",
  :pageCount='setPagesCount',
  :page="setPageNum",
  :changeActivePage="setOffsetForTradeHistory"
  :checkedArray.sync='checkedArray',
  :getRepeat="true",
  :getUndo="true",
  :getDelete="true",
  :getExport="true",
)
  .myOrders.table
    table.table__body
      thead
        tr
          th
          th ID
          th Timestamp
          th Fee
          th Action
          th Pair
          th Amount
          th Price
          th Total
      tbody(v-for="(item, index) in orders")
        tr.myOrders__row(@click="getTrades(item.id)")
          td.myOrders__checkboxContainer
            Checkbox(color="yellow", :value="isChecked(item.id)" @change="setCheckedArray(item.id)")
          td {{item.id}}
          td {{setDate(item.creationDate)}}
          td {{item.fee}} {{item.feeCurrency}}
          td.myOrders__action(:class="'myOrders__action--' + (item.action)") {{item.action}}
          td {{item.pair}}
          td {{setFixNumber(item.total)}} {{getOrderBaseCurrency(item.pair)}}
          td {{setFixNumber(item.price)}} {{getOrderQuoteCurrency(item.pair)}}
          td {{setFixNumber(item.total * item.price)}} {{getOrderQuoteCurrency(item.pair)}}
        tr(v-for="trade in item.trades" v-show="item.id === currentOrderId")
          td
          td
          td
          td {{getTradeFee(item.action, trade)}}
          td.myOrders__action(:class="'myOrders__action--' + getTradeAction(item.action)") {{getTradeAction(item.action)}}
          td {{trade.baseCurrency}}/{{trade.quoteCurrency}}
          td {{setFixNumber(trade.amount)}} {{trade.baseCurrency}}
          td {{setFixNumber(trade.price)}} {{trade.quoteCurrency}}
          td {{setFixNumber(trade.amount * trade.price)}} {{trade.quoteCurrency}}
</template>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex';
import {DateTime} from 'luxon';
import Checkbox from 'components/Checkbox';
import Icon from '../../Icon';
import TablePage from './TablePage';

export default {
  data() {
    return {
      checkedArray: [],
      currentOrderId: null,
    };
  },
  computed: {
    ...mapGetters('trade', {
      orders: 'getAccountOrders',
      orderFilter: 'getAccountOrderFilter',
    }),
    setPagesCount() {
      return Math.ceil(this.allDataLength / this.itemsOnPage);
    },
    setPageNum() {
      return Math.ceil((this.offset) / this.itemsOnPage) + 1;
    },
  },
  methods: {
    ...mapMutations('trade', {
      setOffsetForTradeHistory: 'setOffsetForTradeHistory',
    }),
    ...mapActions('trade', [
      'getAccountOrders',
      'getTradesForOrder',
    ]),
    isChecked(id) {
      return Boolean(this.checkedArray.indexOf(id) != -1);
    },
    setCheckedArray(id) {
      this.isChecked(id) ? this.checkedArray = this.checkedArray.filter((item) => item != id) : this.checkedArray.push(id);
    },
    setFixNumber(num, fixedTo = 4) {
      return num.toFixed(fixedTo);
    },
    setDate(isoTime) {
      return DateTime.fromISO(isoTime).toFormat('dd.LL.yyyy HH:mm');
    },
    getOrderBaseCurrency(pair) {
      return pair.split('/')[0];
    },
    getOrderQuoteCurrency(pair) {
      return pair.split('/')[1];
    },
    fixCurrencyPair(pair) {
      return pair.replace('_', '/');
    },
    setCurrentOrderId(orderId) {
      if (this.currentOrderId === orderId) {
        this.currentOrderId = null;
      } else {
        this.currentOrderId = orderId;
      };
    },
    isDetailedOrder(order) {
      return order.id === this.currentOrderId;
    },
    getTrades(orderId) {
      this.setCurrentOrderId(orderId);
      this.getTradesForOrder(orderId);
    },
    getTradeFee(orderAction, trade) {
      return (orderAction === 'Sell') ? `${trade.buyerFee} ${trade.baseCurrency}` : `${trade.sellerFee} ${trade.quoteCurrency}`;
    },
    getTradeAction(orderAction) {
      return (orderAction === 'Sell') ? 'Buy' : 'Sell';
    },
  },
  watch: {
    orderFilter() {
      this.getAccountOrders(this.orderFilter);
    },
    setPageNum() {
      this.getAccountTradeHistory;
    },
    setPagesCount() {
      this.getAccountTradeHistory;
    },
    dataType() {
      this.getAccountTradeHistory;
    },
    // orders: {
    //   handler() {
    //     console.log('orders changed');
    //     if (this.orders.find((item) => item.id === this.currentOrderId)) {
    //       console.log(this.orders.find((item) => item.id === this.currentOrderId).trades);
    //     };
    //   },
    //   deep: true,
    // },
  },
  created() {
    this.getAccountOrders();
  },
  components: {
    TablePage,
    Icon,
    Checkbox,
  },
};
</script>


<style lang="scss" scoped>
@import '~variables';
.myOrders {
  &__action {
    &--Buy {
      color: $color_green;
    }
    &--Sell {
      color: $color_red;
    }
  }
  &__row {
    cursor: pointer;
    & > td {
      width: 10%;
      &:nth-child(3) {
        width: 200px;
      }
      &:nth-child(4) {
        width: 125px;
      }
    }
    &:hover {
      background-color: $color_yellow;
    }
  }
  &__checkboxContainer {
    width: 50px;
    min-width: 32px;
    position: relative;
  }
  &__checkbox {
    position: absolute;
    top: 20px;
  }
}
</style>
