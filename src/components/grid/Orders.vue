<template lang='pug'>
table.orders
  tbody.orders__body
    tr.orders__row(v-for="order in (isActive ? getActiveOrders : getClosedOrders)")
      td.orders__cell
        .orders__typeWrapper
          .orders__square(:class="'orders__square--' + (order[2] ? 'sell' : 'buy')")
          .orders__type {{order[2] ? 'Sell' : 'Buy'}}
      td.orders__cell {{type[order[8]]}}
      td.orders__cell {{ order[5] }}
      td.orders__cell {{ order[3] }}
      td.orders__cell {{ order[4] }}
      td.orders__cell {{status[order[7]]}}
      td.orders__cell {{ setDate(order[10]) }}
      td.orders__cell
        Icon.orders__trash(id='trash' @click="isActive ? deleteOrder(order[0]) : ''" :class="'orders__trash--' + (isActive ? 'active' : 'disabled')")
  tfoot.orders__header
    tr
      th.orders__title Side
      th.orders__title Type
      th.orders__title Price
      th.orders__title Current
      th.orders__title Initial
      th.orders__title Status
      th.orders__title Date
      th
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex';
import Icon from '../Icon';

export default {
  data() {
    return {
      type: [
        'Limit',
        'Market',
      ],
      status: [
        'Accepted',
        'Partially filled',
        'Filled',
        'Cancelled',
      ],
    };
  },
  computed: {
    ...mapState('trade', {
      accountOrders: (state) => state.tradeInfo.orders,
    }),
    ...mapGetters('trade', {
      getActiveOrders: 'getActiveOrders',
      getClosedOrders: 'getClosedOrders',
    }),
  },
  methods: {
    ...mapActions('trade', {
      getTradeInfo: 'getTradeInfo',
      getCancelOrder: 'getCancelOrder',
    }),
    setDate(tick) {
      return new Date((tick - 621355968000000000) / 10000).toLocaleDateString(); // C# ticks to local date
    },
    deleteOrder(id) {
      this.getCancelOrder(id);
    },
  },
  props: {
    isActive: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  components: {
    Icon,
  },
};

</script>

<style lang='scss'>
@import "~variables";
.orders {
  width: 100%;
  &__cell {
    padding-bottom: 4px;
  }
  &__title {
    text-align: left;
    text-transform: uppercase;
    color: lighten(desaturate(adjust-hue($color_blue, 9), 47.23), 11.96);
  }
  &__typeWrapper {
    display: flex;
    align-items: center;
  }
  &__type {
    text-transform: uppercase;
  }
  &__square  {
    $size: 8px;
    width: $size;
    height: $size;
    border-radius: 1px;
    margin-right: 16px;
    &--buy {
      background-color: #7ed321;
    }
    &--sell {
      background-color: #f33a3a;
    }
  }
  &__trash {
    width: 7px;
    height: 9px;
    &--active {
      cursor: pointer;
      fill: $color_yellow;
      &:hover {
        fill: $color_red;
      }
    }
    &--disabled {
      fill: #4a4a4a;
    }
  }
}
</style>
