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
          td {{fixCurrencyPair(item.pair)}}
          td {{setFixNumber(item.amount)}} {{item.quoteCurrency}}
          td {{setFixNumber(item.price)}} {{item.baseCurrency}}
          td {{setFixNumber(item.amount * item.price)}} {{item.baseCurrency}}
        tr.myOrders__row(v-if="isDetailedOrder(item)")
          td
          td
          td
          td {{currentOrder.fee}}
          td.myOrders__action(:class="'myOrders__action--' + (currentOrder.action)") {{currentOrder.action}}
          td {{fixCurrencyPair(currentOrder.pair)}}
          td {{setFixNumber(currentOrder.amount)}} {{currentOrder.quoteCurrency}}
          td {{setFixNumber(currentOrder.price)}} {{currentOrder.baseCurrency}}
          td {{setFixNumber(currentOrder.amount * currentOrder.price)}} {{currentOrder.baseCurrency}}
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
    currentOrder() {
      return (this.orders && this.currentOrderId) ? this.orders.find((item) => item.id === this.currentOrderId) : {};
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
      // this.getTradesForOrder(orderId);
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
    // this.getAccountOrders();
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
