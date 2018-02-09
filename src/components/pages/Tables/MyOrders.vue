<template lang="pug">
TablePage(title="My orders", :data="accountTradeHistory")
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
        tr(v-for="(item, index) in accountTradeHistory")
          td.myOrders__checkboxContainer
            Checkbox.myOrders__checkbox(:key="item.id" v-model="item.checked")
          td {{item.id}}
          td {{getDate(item.openDate)}} - {{getDate(item.closeDate)}}
          td {{status[item.status]}}
          td {{type[item.type]}}
          td.myOrders__action(:class="'myOrders__action--' + (item.side ? 'sell' : 'buy')") {{item.side ? 'Sell' : 'Buy'}}
          td {{fixCurrencyPair(item.pair)}}
          td {{setFixNumber(item.cashOrderQty)}} {{item.derivedCurrency}}
          td {{setFixNumber(item.price)}} {{item.baseCurrency}}
          td {{setFixNumber(item.cashOrderQty * item.price)}} {{item.baseCurrency}}
</template>

<script>
import {mapState, mapActions} from 'vuex';
import Checkbox from 'components/Checkbox';
import {ticksToMilliseconds} from 'services/misc';
import Icon from '../../Icon';
import TablePage from './TablePage';

export default {
  data() {
    return {
      status: [
        'Accepted',
        'Partially filled',
        'Filled',
        'Cancelled',
      ],
      type: [
        'Limit',
        'Market',
      ],
    };
  },
  computed: {
    ...mapState('trade', {
      accountTradeHistory: 'accountTradeHistory',
    }),
    ...mapActions('trade', {
      getAccountTradeHistory: 'getAccountTradeHistory',
    }),
  },
  methods: {
    setFixNumber(num, fixedTo = 4) {
      return num.toFixed(fixedTo);
    },
    getDate(tick) {
      return tick ? new Date(ticksToMilliseconds(tick)).toLocaleString() : 'Not closed';
    },
    fixCurrencyPair(pair) {
      return pair.replace('_', '/');
    },
  },
  created() {
    this.getAccountTradeHistory;
  },
  components: {
    TablePage,
    Icon,
    Checkbox,
  },
};
</script>


<style lang="scss" scoped>
@import '~sass/bootstrap/media';
.myOrders {
  &__action {
    &--buy{
      color: #7ed321;
    }
    &--sell {
      color: #f33a3a;
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
