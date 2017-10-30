<template lang='pug'>
div
  .main
    .main__sidebar(:class="`main__sidebar--${(showSidebar) ? 'hidden' : 'shown'}`")
      Sidebar
    .main__toolbar
      Toolbar
    .main__content
      .main__header
        TheHeader
      .main__tiles
        .main__tile.main__tile--buysell
          BuySell
        .main__tile.main__tile--chart
          Chart
        .main__tile.main__tile--map
          PropertyMap
        .main__tile.main__tile--history
          Padding
            Padding(bottom)
              TileHeader(title='History of trades' center)
            History
        .main__tile.main__tile--book
          Padding
            TileHeader(title='Order book' center)
          .d-flex.w-100
            .main__tile
              Book(:limit='19')
            .main__tile
              Book(ask, :limit='19')
        .main__tile.main__tile--orders
          Padding
            Padding(bottom)
              TileHeader(title='Open orders')
            Orders
            .main__ordersSep
            Padding(bottom)
              TileHeader(title='Completed orders')
            .main__orders
              Orders
  //- Modals
  InDemo
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex';
import TheHeader from './TheHeader';
import TheFooter from './TheFooter';
import Padding from './Padding';
import TileHeader from './TileHeader';
import Sidebar from './Sidebar';
import Toolbar from './Toolbar';
import BuySell from './BuySell';
import Chart from './Chart';
import Orders from './Orders';
import Book from './Book';
import History from './History';
import PropertyMap from './PropertyMap';
import InDemo from './modals/InDemo';

export default {
  computed: {
    ...mapState('misc', {
      showSidebar: 'showSidebar',
    }),
  },
  methods: {
    ...mapMutations('misc', {
      updateScreenType: 'updateScreenType',
    }),
    ...mapMutations('trade', {
      addNewCandle: 'addNewCandle',
      addLastTrade: 'addLastTrade',
      setOrdersAsks: 'setOrdersAsks',
      setOrdersBids: 'setOrdersBids',
    }),
    ...mapActions('localization', {
      setLang: 'setLang',
    }),
    hubSubscribe() {
      // this.$hub.proxy.on('newCandle', (res) => {
      //   this.addNewCandle(res);
      // });
      this.$hub.proxy.on('newOrderBookTop', ([currency, side, orders, volume]) => {
        if (side) {
          this.setOrdersAsks(orders);
        } else {
          this.setOrdersBids(orders);
        };
      });

      this.$hub.proxy.on('newTrade', (data) => {
        this.addLastTrade(data);
      });
    },
  },
  created() {
    this.setLang();
    this.updateScreenType();
    this.hubSubscribe();

    this.$hub.start();

    window.addEventListener('resize', () => {
      setTimeout(() => {
        this.updateScreenType();
      }, 66);
    });
  },
  components: {
    TheHeader,
    TheFooter,
    Padding,
    Sidebar,
    TheHeader,
    Toolbar,
    BuySell,
    Orders,
    TileHeader,
    Book,
    History,
    PropertyMap,
    Chart,
    InDemo,
  },
};
</script>

<style lang='scss'>
@import '~normalize.css/normalize';
@import '~sass/defaults';
@import '~sass/fonts';
@import '~sass/overrides';
@import '~sass/global';
@import '~variables';
@import '~sass/bootstrap/flex';
@import '~bootstrap/scss/utilities/sizing';

.main {
  $tilePadding: 32px;
  display: flex;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  &__sidebar {
    width: $sidebar_width;
    position: relative;
    transition: width $sidebar_speed ease-in-out;
    &::after {
      content: "";
      display: none;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-image: linear-gradient(90deg,
        transparent,
        rgba(0,0,0,.20) 70%,
        rgba(0,0,0,.30) 85%,
        rgba(0,0,0,.45)
      );
    }
    &--hidden {
      width: 0;
        &::after {
          display: block;
      }
    }
    &--shown {
      width: $sidebar_width;
      &::after {
        display: block;
        opacity: 0.0;
        transition: opacity $sidebar_speed ease-in-out;
      }
    }
  }
  &__toolbar {
    width: 64px;
    background-color: $color_blue;
    border-left: 1px solid $color_tangaroa;
    z-index: 1;
  }
  &__content {
    width: 100%;
    z-index: 1;
  }
  &__tiles {
    display: flex;
    flex-wrap: wrap;
  }
  &__orders {
    // margin-left: -$tilePadding;
  }
  &__ordersSep {
    $margin: 18px;
    width: 100%;
    margin-top: $margin;
    margin-bottom: $margin + 8;
    border: 1px solid #032537;
  }
  &__tile {
    flex-grow: 1;
    border: 1px solid #182235;
    background-color: $color_blue;
    &--buysell {
      flex-basis: 20%;
    }
    &--chart {
      flex-basis: 40%;
    }
    &--map {
      flex-basis: 40%;
    }
    &--history {
      flex-basis: 20%;
    }
    &--book {
      flex-basis: 40%;
    }
    &--orders {
      flex-basis: 40%;
    }
  }

  @media (max-width: 991px) {
    .main {
    }
  }
}
</style>
