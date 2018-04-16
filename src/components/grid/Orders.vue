<template lang='pug'>
.orders
  .orders__container(v-scrollbar="")
    table.orders__body
      tr.orders__row(v-for="order in (isActive ? getActiveOrders : getClosedOrders)", :key="order.id")
        td.orders__cell.orders__cell--sell
          .orders__typeWrapper
            .orders__square(:class="'orders__square--' + order.action")
            .orders__type {{order.action}}
        td.orders__cell.orders__cell--type {{order.type}}
        td.orders__cell.orders__cell--number {{order.price}}
        td.orders__cell.orders__cell--number {{order.amount}}
        td.orders__cell.orders__cell--number {{order.total}}
        td.orders__cell.orders__cell--status {{order.status}}
        td.orders__cell.orders__cell--date {{setDate(order.creationDate)}}
        td.orders__cell.orders__cell--trash
          Icon.orders__trash(id='trash' @click="isActive ? deleteOrder(order.id) : ''", :class="'orders__trash--' + (isActive ? 'active' : 'disabled')")
  table.orders__body
    tr.orders__title
      td.orders__cell--sell Side
      td.orders__cell--type Type
      td.orders__cell--number Price
      td.orders__cell--number Current
      td.orders__cell--number Initial
      td.orders__cell--status Status
      td.orders__cell--date Date
      td.orders__cell--trash
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex';
import {DateTime} from 'luxon';
import {scrollbar} from 'directives';
import Icon from '../Icon';

export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapState('trade', {
      orders: (state) => state.orders,
    }),
    ...mapGetters('membership', {
      isLoggedIn: 'isLoggedIn',
    }),
    ...mapGetters('trade', {
      getActiveOrders: 'getActiveOrders',
      getClosedOrders: 'getClosedOrders',
    }),
  },
  methods: {
    ...mapActions('trade', {
      getOrders: 'getOrders',
      cancelOrder: 'cancelOrder',
    }),
    setDate(isoTime) {
      return DateTime.fromISO(isoTime).toFormat('dd.LL.yyyy HH:mm');
    },
    deleteOrder(id) {
      this.cancelOrder(id);
    },
    getApiRequest() {
        this.getOrders();
    },
  },
  watch: {
    isLoggedIn() {
      if (this.isLoggedIn) this.getApiRequest();
    },
  },
  created() {
    this.getApiRequest();
  },
  props: {
    isActive: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  directives: {
    scrollbar,
  },
  components: {
    Icon,
  },
};

</script>

<style lang='scss'>
@import '~perfect-scrollbar/dist/css/perfect-scrollbar';
@import "~variables";
.orders {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  &__container {
    position: relative;
    display: flex;
  }
  &__body {
    width: 100%;
    padding-right: 15px;
  }
  &__cell {
    padding-bottom: 4px;
    &--sell {
      width: 55px;
    }
    &--type {
      width: 43px;
    }
    &--number {
      width: 69px;
    }
    &--status {
      width: 55px;
    }
    &--date {
      width: 66px;
    }
    &--trash {
      width: 12px;
    }
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
    &--Buy {
      background-color: #7ed321;
    }
    &--Sell {
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
