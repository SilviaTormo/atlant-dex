<template lang='pug'>
table.orders
  tbody.orders__body
    tr.orders__row(v-for="item in items")
      td.orders__cell
        .orders__typeWrapper
          .orders__square(:class="'orders__square--' + (!item[2] ? 'buy' : 'sell')")
          .orders__type {{!item[2] ? 'Buy' : 'Sell'}}
      td.orders__cell(v-show="item[7]") Filled
      td.orders__cell(v-show="!item[7]") Accepted
      td.orders__cell {{ item[5] }}
      td.orders__cell {{ item[3] }}
      td.orders__cell {{ item[4] }}
      td.orders__cell(v-show="item[8]") Market
      td.orders__cell(v-show="!item[8]") Limit
      td.orders__cell {{ setDate(item[10]) }}
      td.orders__cell
        Icon.orders__trash(id='trash' @click="deleteOrder(item[0])")
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
import {mapState, mapActions} from 'vuex';
import Icon from '../Icon';

export default {
  // data() {
  //   return {
  //     items: [
  //       {
  //         buy: true,
  //         eth: 7.000,
  //         atl: 7.272,
  //         date: '12.12.2017',
  //       },
  //       {
  //         buy: false,
  //         eth: 0.526,
  //         atl: 1.500,
  //         date: '31.11.2017',
  //       },
  //     ],
  //   };
  // },
  computed: {
    ...mapState('trade', {
      items: 'orders',
    }),
  },
  methods: {
    ...mapActions('trade', {
      getCancelOrder: 'getCancelOrder',
    }),
    getItem(index) {
      return this.items[index % 2];
    },
    setDate(tick) {
      return new Date((tick - 621355968000000000) / 10000).toLocaleDateString(); // C# ticks to local date
    },
    deleteOrder(id) {
      this.getCancelOrder(id);
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
    fill: $color_yellow;
    cursor: pointer;
    &:hover {
      fill: $color_red;
    }
  }
}
</style>
