<template lang="pug">
.grid
  .grid-stack
    .grid-stack-item(
      v-for="({id, x, y, width, height, minWidth, minHeight, maxHeight}, index) in gridLayout",
      :data-gs-id='id',
      :data-gs-x='x',
      :data-gs-y='y',
      :data-gs-width='width',
      :data-gs-height='height',
      :data-gs-min-width='minWidth',
      :data-gs-min-height='minHeight',
      :data-gs-max-height='maxHeight',
    )
      .grid-stack-item-content#chartContainer(v-scrollbar="")
        .grid__tile(v-if="id === 'buySell'")
          .grid__tileContent
            BuySell
        .grid__tile(v-if="id === 'chart'")
          .grid__tileContent
            Chart
        .grid__tile.grid__tile--history(v-if="id === 'history'" )
          .grid__tileContent.grid__tileContent--history(styles="overflow: hidden")
            TileHeader.grid__tileHeader.grid__tileHeader--history(title='History of trades' center)
            History(styles="overflow: auto")(v-scrollbar="")
        .grid__tile(v-if="id === 'book'")
          .grid__tileContent.grid__tileContent--books
            TileHeader.grid__tileHeader.grid__tileHeader--book(title='Order book' center)
            .grid__books
              .grid__tile
                BookHeader
                Book.grid__book(:limit='19')
              .grid__tile
                BookHeader(ask)
                Book.grid__book(ask, :limit='19')
        .grid__tile(v-if="id === 'orders'")
          .grid__tileContent.grid__tileContent--orders
            TileHeader.grid__tileHeader.grid__tileHeader--orders(title='Open orders')
            Orders
            .grid__ordersSep
            TileHeader.grid__tileHeader.grid__tileHeader--orders(title='Completed orders')
            Orders
</template>

<script>
// import $ from 'jquery';
// import 'jquery-ui';
// import 'lodash';
// import 'gridstack';
// import 'gridstack.jquery-ui';
import {scrollbar} from 'directives';
import TileHeader from './TileHeader';
import BuySell from './BuySell';
import Chart from './Chart';
import Orders from './Orders';
import Book from './Book';
import History from './History';
import BookHeader from './BookHeader';

export default {
  data() {
    return {
      defaultGridLayout: [
        {id: 'buySell', x: 0, y: 0, width: 3, height: 7, minWidth: 2, minHeight: 7, maxHeight: 7},
        {id: 'chart', x: 3, y: 0, width: 9, height: 7, minWidth: 5, minHeight: 7},
        {id: 'book', x: 0, y: 7, width: 3, height: 5, minWidth: 3, minHeight: 2},
        {id: 'history', x: 3, y: 7, width: 5, height: 5, minWidth: 5, minHeight: 2},
        {id: 'orders', x: 9, y: 7, width: 4, height: 5, minWidth: 4, minHeight: 2},
      ],
      gridLayout: [],
    };
  },
  mounted() {
    $('.grid-stack').gridstack({
      width: 12,
      verticalMargin: 0,
      animate: true,
      resizable: {
        handles: 'e, se, s, sw, w',
      },
    });
    $('.grid-stack').on('change', function(event, items) {
        console.log(items);
        // localStorage.gridLayout(JSON.stringify(items));
    });
  },
  created() {
    this.gridLayout = (localStorage.getItem('gridLayout') || this.defaultGridLayout);
  },
  directives: {
    scrollbar,
  },
  components: {
    TileHeader,
    BuySell,
    Chart,
    Orders,
    Book,
    History,
    BookHeader,
  },
};
</script>

<style lang="scss">
@import '~perfect-scrollbar/dist/css/perfect-scrollbar';
@import '~variables';
@import '~sass/overrides';
@import '~sass/bootstrap/media';

.grid {
  &__tile {
    width: 100%;
    height: 100%;
    background-color: $color_blue;
  }
  &__tileContent {
    width: 100%;
    height: 100%;
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
  &__book {
    padding: 13px;
  }
  &__books {
    width: 100%;
    display: flex;
  }
  &__ordersSep {
    $margin: 18px;
    width: 100%;
    margin-top: $margin;
    margin-bottom: $margin + 8;
    border: 1px solid #032537;
  }
}

@include media-breakpoint-down(md) {
  .grid {
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
    &__books {
      flex-direction: column;
    }
  }
}
</style>
