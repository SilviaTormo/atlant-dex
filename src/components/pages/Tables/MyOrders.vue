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
          td {{item.fee}}
          td.myOrders__action(:class="'myOrders__action--' + (item.action)") {{item.action}}
          td {{item.pair}}
          td {{setFixNumber(item.total)}} {{getOrderBaseCurrency(item.pair)}}
          td {{setFixNumber(item.price)}} {{getOrderQuoteCurrency(item.pair)}}
          td {{setFixNumber(item.total * item.price)}} {{getOrderQuoteCurrency(item.pair)}}
        tr.myOrders__row(v-for="trade in trades" v-show="item.id === currentOrderId")
          td
          td
          td
          td {{trade.buyerFee}} {{trade.quoteCurrency}}
          td.myOrders__action(:class="'myOrders__action--' + (item.action)") {{item.action}}
          td {{trade.baseCurrency}}/{{trade.quoteCurrency}}
          td {{setFixNumber(trade.amount)}} {{trade.quoteCurrency}}
          td {{setFixNumber(trade.price)}} {{trade.baseCurrency}}
          td {{setFixNumber(trade.amount * trade.price)}} {{trade.baseCurrency}}
</template>

<script>
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';
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
    ...mapState('trade', {
      orders: (state) => state.accountOrders.orders,
      orderFilter: (state) => state.orderFilter,
    }),
    ...mapGetters('trade', {
      trades: 'getOrderTrades',
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
      return num; // num.toFixed(fixedTo);
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
