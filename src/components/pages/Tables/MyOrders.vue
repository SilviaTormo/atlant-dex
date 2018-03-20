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
          th Status
          th Type
          th Action
          th Pair
          th Amount
          th Price
          th Total
      tbody
        tr(v-for="(item, index) in orders")
          td.myOrders__checkboxContainer
            Checkbox(color="yellow", :value="isChecked(item.id)" @change="setCheckedArray(item.id)")
          td {{item.id}}
          td {{setDate(item.creationDate)}}
          td {{item.status}}
          td {{item.type}}
          td.myOrders__action(:class="'myOrders__action--' + (item.action)") {{item.action}}
          td {{fixCurrencyPair(item.pair)}}
          td {{setFixNumber(item.amount)}} {{item.quoteCurrency}}
          td {{setFixNumber(item.price)}} {{item.baseCurrency}}
          td {{setFixNumber(item.amount * item.price)}} {{item.baseCurrency}}
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex';
import {DateTime} from 'luxon';
import Checkbox from 'components/Checkbox';
import Icon from '../../Icon';
import TablePage from './TablePage';

export default {
  data() {
    return {
      checkedArray: [],
    };
  },
  computed: {
    ...mapState('trade', {
      orders: (state) => state.accountOrders.orders,
      orderFilter: (state) => state.orderFilter,
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
    ...mapActions('trade', {
      getAccountOrders: 'getAccountOrders',
    }),
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
    fixCurrencyPair(pair) {
      return pair.replace('_', '/');
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
