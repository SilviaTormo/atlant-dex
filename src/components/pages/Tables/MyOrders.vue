<template lang="pug">
TablePage(
  title="My orders",
  :data="orders",
  :pageCount='setPagesCount',
  :page="page",
  :changeActivePage="changeActivePage",
  :checkedArray.sync='checkedArray',
  :getRepeat="true",
  :getCancel="true",
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
          th.table__sortable(:class="{'table__sortable--active': sortBy==='action'}" @click="sortOrders('action')") Action
          th Pair
          th Amount
          th Price
          th Total
      transition-group(
        v-for="(item, index) in orders",
        tag="tbody",
        :key="index",
        name="order-list",
      )
        tr.myOrders__row(
          @click="getTrades(item.id)"
          key="main"
        )
          td.myOrders__checkboxCell
            .myOrders__checkboxContainer
              div(@click.stop="()=>{}")
                Checkbox(
                  color="yellow",
                  :value="isChecked(item.id)",
                  @change="setCheckedArray(item.id)",
                )
              .myOrders__chevronContainer(v-if="isOrderHasDetails(item)")
                .myOrders__chevron(:class="{'myOrders__chevron--down': isOrderDetailed(item)}")
          td {{item.id}}
          td {{setDate(item.creationDate)}}
          td {{getOrderFee(item)}}
          td.myOrders__action(:class="'myOrders__action--' + getAction(item.side)") {{getAction(item.side)}}
          td {{item.baseCurrency}}/{{item.quoteCurrency}}
          td {{setFixNumber(item.totalQuantity)}} {{item.baseCurrency}}
          td {{setFixNumber(item.price)}} {{item.quoteCurrency}}
          td {{setFixNumber(item.totalQuantity * item.price)}} {{item.quoteCurrency}}
        tr.myOrders__loading(
          key="spinner"
          v-if="isOrderTradesLoading(item)",
        )
          td(colspan="9") loading...
        tr.myOrders__trades.order-list-item(
          v-for="(trade, index) in item.trades",
          v-if="isOrderDetailed(item)",
          :key="index",
        )
          td.myOrders__guidline
          td
          td
          td {{getTradeFee(item.side, trade)}}
          td.myOrders__action(:class="'myOrders__action--' + getTradeAction(item.side)") {{getTradeAction(item.side)}}
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
      orderIdTradesLoading: null,
      page: 1,
      sortBy: 'action',
      asc: false,
      itemsOnPage: 3,
    };
  },
  computed: {
    ...mapGetters('trade', {
      orders: 'getAccountOrders',
      orderFilter: 'getAccountOrderFilter',
      totalItems: 'getAccountOrdersItems',
    }),
    setPagesCount() {
      return Math.ceil(this.totalItems / this.itemsOnPage);
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
    getAction(side) {
      return (side === 0) ? 'buy' : 'sell';
    },
    getOrderFee(order) {
      return `${order.fee} ${(order.side === 0) ? order.baseCurrency : order.quoteCurrency}`;
    },
    getTradeAction(orderSide) {
      return (orderSide === 1) ? 'buy' : 'sell';
    },
    getTradeFee(orderSide, trade) {
      return (orderSide === 1) ? `${trade.buyerFee} ${trade.baseCurrency}` : `${trade.sellerFee} ${trade.quoteCurrency}`;
    },
    setCurrentOrderId(orderId) {
      if (this.currentOrderId === orderId) {
        this.currentOrderId = null;
      } else {
        this.currentOrderId = orderId;
      }
    },
    isOrderDetailed(order) {
      return order.id === this.currentOrderId;
    },
    isOrderHasDetails(order) {
      return order.leavesQuantity !== order.totalQuantity;
    },
    isOrderTradesLoading(order) {
      return order.id === this.orderIdTradesLoading;
    },
    getMyOrders() {
      this.getAccountOrders({
        page: this.page,
        limit: this.itemsOnPage,
        sortBy: this.sortBy,
        ascending: this.asc,
      });
    },
    getTrades(orderId) {
      console.log('orderId');
      if (this.currentOrderId !== orderId) {
        this.orderIdTradesLoading = orderId;
        this.getTradesForOrder(orderId).then((response) => {
          this.orderIdTradesLoading = false;
          return response;
        }).catch((error) => {
          this.orderIdTradesLoading = false;
          return error;
        });
      }
      this.setCurrentOrderId(orderId);
    },
    changeActivePage(num) {
      this.page = num;
      this.getMyOrders();
    },
    sortOrders(column) {
      if (this.sortBy === column) {
        this.asc = !this.asc;
      } else {
        this.sortBy = column;
        this.asc = false;
      };
      this.getMyOrders();
    },
  },
  watch: {
    orderFilter() {
      this.getMyOrders();
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
    this.getMyOrders();
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
    text-transform: capitalize;
    &--buy {
      color: $color_green;
    }
    &--sell {
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
      background-color: rgba(#000, .1);
    }
  }
  &__trades {
    height: 30px;
    font-size: 11px;
    /*background-color: rgba(#000, .1);*/
    font-weight: normal;
  }
  &__guidline {
    $line-color: #e9bd2455;
    position: relative;
    &:before {
      border-left: 1px solid $line-color;
      position: absolute;
      top: 0;
      margin-left: 8px;
      bottom: 0;
      content: '';
    }
    tbody tr.myOrders__trades:last-child &:before {
      bottom: 50%;
      width: 5px;
      border-bottom: 1px solid $line-color;
    }
  }
  &__chevronContainer {
    flex: 1;
    justify-content: center;
    display: flex;
  }
  &__chevron {
    border-color: #e9bd24;
    border-style: solid;
    border-width: 2px 2px 0 0;
    content: "";
    height: 10px;
    margin: 0 5px 0 15px;
    position: relative;
    transform: rotate(-45deg);
    transition: transform .3s;
    width: 10px;

    &--down {
      transform: rotate(135deg);
    }
  }
  &__checkboxCell {
    width: 50px;
    min-width: 32px;
    position: relative;
  }
  &__checkboxContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  &__checkbox {
    position: absolute;
    top: 20px;
  }
  &__loading {
    text-align: center;
    height: 30px;
    font-size: 10px;
    font-weight: 300;
  }
  .order-list-enter, .order-list-leave-to {
    opacity: 0;
    height: 0;
    line-height: 0;
  }
  .order-list-enter-active, .order-list-leave-active {
    transition: all .3s;
  }
}
</style>
