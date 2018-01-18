<template lang="pug">
.grid
  .grid-stack
    .grid-stack-item(
      v-for="({x, y, w, h, minW, minH, maxH}, index) in gridLayout",
      :data-gs-x='x',
      :data-gs-y='y',
      :data-gs-width='w',
      :data-gs-height='h',
      :data-gs-min-width='minW',
      :data-gs-min-height='minH',
      :data-gs-max-height='maxH',
    )
      .grid-stack-item-content(v-scrollbar="")
        .grid__tile(v-if="index === 0")
          .grid__tileContent
            BuySell
        .grid__tile(v-if="index === 1")
          .grid__tileContent
            Chart
        .grid__tile.grid__tile--history(v-if="index === 2")
          .grid__tileContent.grid__tileContent--history
            TileHeader.grid__tileHeader.grid__tileHeader--history(title='History of trades' center)
            History
        .grid__tile(v-if="index === 3")
          .grid__tileContent.grid__tileContent--books
            TileHeader.grid__tileHeader.grid__tileHeader--book(title='Order book' center)
            .grid__books
              .grid__tile
                BookHeader
                Book.grid__book(:limit='19')
              .grid__tile
                BookHeader(ask)
                Book.grid__book(ask, :limit='19')
        .grid__tile(v-if="index === 4")
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
      gridLayout: [
        {x: 0, y: 0, w: 3, h: 6, minW: 2, minH: 6, maxH: 6},
        {x: 3, y: 0, w: 9, h: 6, minW: 5, minH: 6},
        {x: 0, y: 7, w: 3, h: 5, minW: 3, minH: 2},
        {x: 3, y: 7, w: 5, h: 5, minW: 5, minH: 2},
        {x: 9, y: 7, w: 4, h: 5, minW: 4, minH: 2},
      ],
    };
  },
  mounted() {
    $('.grid-stack').gridstack({
      animate: true,
      verticalMargin: 0,
      resizable: {
          handles: 'e, se, s, sw, w',
      },
    });
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
@import '~sass/bootstrap/media';

.grid-stack {
  .grid-stack-placeholder > .placeholder-content {
    left: 0;
    right: 0;
  }

  > .grid-stack-item {
    left: 1px;
    border: 1px solid #182235;
  }
}


.grid {
  margin-left: 1px;
  margin-right: 1px;
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
