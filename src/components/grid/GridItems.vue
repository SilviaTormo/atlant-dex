<template lang="pug">
.gridItem
  .gridItem__tile(v-if="this.component === 'buySell'")
    .gridItem__tileContent
      BuySell
  .gridItem__tile(v-if="this.component === 'chart'")
    .gridItem__tileContent
      Chart
  .gridItem__tile.gridItem__tile--history(v-if="this.component === 'history'" )
    .gridItem__tileContent.gridItem__tileContent--history
      TileHeader.gridItem__tileHeader.gridItem__tileHeader--history(title='History of trades' center)
      .gridItem__containerWitchOverflow(v-scrollbar="")
        History
  .gridItem__tile(v-if="this.component === 'book'")
    .gridItem__tileContent.gridItem__tileContent--books
      TileHeader.gridItem__tileHeader.gridItem__tileHeader--book(title='Order book' center)
      .gridItem__booksTitle
        .gridItem__tile
          OrderBookHeader
        .gridItem__tile
          OrderBookHeader(ask)
      .gridItem__books
        .gridItem__containerWitchOverflow(v-scrollbar="")
          OrderBook.gridItem__book(:limit='19')
        .gridItem__containerWitchOverflow(v-scrollbar="")
          OrderBook.gridItem__book(ask, :limit='19')
  .gridItem__tile(v-if="this.component === 'orders'")
    .gridItem__tileContent.gridItem__tileContent--orders
      .gridItem__tileContent--ordersTop
        TileHeader.gridItem__tileHeader.gridItem__tileHeader--orders(title='Open orders')
        Orders(:isActive="true")
      .gridItem__ordersSep
      .gridItem__tileContent--ordersBottom
        TileHeader.gridItem__tileHeader.gridItem__tileHeader--orders(title='Completed orders')
        Orders
  Icon.gridItem__deleteTile(id="trash", @click="removeGridLayout(component)" v-show="isEdit")
</template>

<script>
import {mapState, mapMutations} from 'vuex';
import {scrollbar} from 'directives';
import Icon from '../Icon';
import TileHeader from './TileHeader';
import BuySell from './BuySell';
import Chart from './Chart';
import Orders from './Orders';
import OrderBook from './OrderBook';
import OrderBookHeader from './OrderBookHeader';
import History from './History';

export default {
  computed: {
    ...mapState('grid', {
      isEdit: 'isEdit',
    }),
  },
  methods: {
  ...mapMutations('grid', {
    removeGridLayout: 'removeGridLayout',
  }),
},
  props: {
    component: {
      type: String,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  directives: {
    scrollbar,
  },
  components: {
    Icon,
    TileHeader,
    BuySell,
    Chart,
    Orders,
    OrderBook,
    OrderBookHeader,
    History,
  },
};
</script>

<style lang="scss">
@import '~perfect-scrollbar/dist/css/perfect-scrollbar';
@import '~variables';
@import '~sass/overrides';
@import '~sass/bootstrap/media';

.gridItem {
  height: 100%;
  outline: 1px solid #032537;
  position: relative;
  &__tile {
    width: 100%;
    height: 100%;
    background-color: $color_blue;
  }
  &__tileContent {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    &--buysell {
      width: 15%;
    }
    &--chart {
      width: 35%;
      height: 512px;
    }
    &--map {
      width: 40%;
    }
    &--history {
      padding: $default_spacing;
    }
    &--orders {
      padding: $default_spacing;
    }
    &--ordersTop {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    &--ordersBottom {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
  }
  &__tileHeader {
    &--history {
      margin-bottom: $default_spacing;
    }
    &--book {
      padding: $default_spacing;
    }
    &--orders {
      margin-bottom: $default_spacing;
    }
  }
  &__booksTitle {
    display: flex;
  }
  &__books {
    width: 100%;
    display: flex;
    padding: 13px;
  }
  &__ordersSep {
    $margin: 18px;
    width: 100%;
    margin-top: $margin;
    margin-bottom: $margin + 8;
    border: 1px solid #032537;
  }
  &__containerWitchOverflow {
    position: relative;
    display: flex;
    flex: 1;
  }
  &__deleteTile {
    position: absolute;
    top: 10px;
    right: 10px;
    fill: red;
    cursor: pointer;
    z-index: 1;
  }
}

@include media-breakpoint-down(md) {
  .gridItem {
    &__tiles {
      flex-direction: column;
    }
    &__tile {
      position: relative;
      &:before {
        content: "";
        display: block;
        height: 20px;
        margin-bottom: -20px;
        background: $background__shadow__gradient__to__bottom;
      }
    }
    &__tileContent {
      overflow: hidden;
      &--buysell {
        width: 100%;
      }
      &--chart {
        height: 320px;
        width: 100%;
      }
      &--map {
        height: 320px;
        width: 100%;
      }
      &--history {
        width: 100%;
      }
      &--books {
        width: 100%;
      }
      &--orders {
        width: 100%;
      }
    }
  }
}
</style>
