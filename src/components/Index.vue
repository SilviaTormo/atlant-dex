<template lang='pug'>
.main(:class="{'main--withSidebar': (showSidebar && isMobile)}")
  .main__body(v-show="(isModalOpened() && !isMobile) || !isModalOpened()")
    .main__leftSide(:class="`main__leftSide--${(showSidebar) ? 'shown' : 'hidden'}`")
      Sidebar.main__sidebar(v-scrollbar="")
      Toolbar.main__toolbar
    .main__content(:class="{'main__content--withSidebar': (showSidebar && !isMobile)}")
      TheHeader(v-if="!isMobile")
      .main__tiles
        .main__tile.main__tile--buysell
          BuySell
        .main__tile.main__tile--chart
          Chart
        .main__tile.main__tile--map
          PropertyMap
        .main__tile.main__tile--history
          TileHeader.main__tileHeader.main__tileHeader--history(title='History of trades' center)
          History
        .main__tile.main__tile--books
          TileHeader.main__tileHeader.main__tileHeader--book(title='Order book' center)
          .main__books
            .main__tile
              BookHeader
              Book.main__book(:limit='19')
            .main__tile
              BookHeader(ask)
              Book.main__book(ask, :limit='19')
        .main__tile.main__tile--orders
          TileHeader.main__tileHeader.main__tileHeader--orders(title='Open orders')
          Orders
          .main__ordersSep
          TileHeader.main__tileHeader.main__tileHeader--orders(title='Completed orders')
          Orders
  //- Modals
  InDemo
  ImportKey
  Welcome
</template>

<script>
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
import {defCandleSize, showWelcome} from 'config';
import {scrollbar} from 'directives';
import TheHeader from './TheHeader';
import TheFooter from './TheFooter';
import TileHeader from './TileHeader';
import Sidebar from './Sidebar';
import Toolbar from './Toolbar';
import BuySell from './BuySell';
import Chart from './Chart';
import Orders from './Orders';
import Book from './Book';
import History from './History';
import BookHeader from './BookHeader';
import PropertyMap from './PropertyMap';
import InDemo from './modals/InDemo';
import ImportKey from './modals/ImportKey';
import Welcome from './modals/Welcome';

export default {
  computed: {
    ...mapState('misc', {
      showSidebar: 'showSidebar',
    }),
    ...mapGetters('misc', {
      isMobile: 'isMobile',
    }),
    ...mapGetters('modal', {
      isModalOpened: 'isOpened',
    }),
  },
  methods: {
    ...mapMutations('misc', {
      updateScreenType: 'updateScreenType',
    }),
    ...mapMutations('modal', {
      openModal: 'open',
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
    updateOverflow() {
      document.querySelector('#app').style.overflow = (this.showSidebar && this.isMobile) ? 'hidden' : null;
    },
    hubSubscribe() {
      this.$hub.proxy.on('newCandle', (res) => {
        this.addNewCandle(res);
      });
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
  watch: {
    showSidebar() {
      this.updateOverflow();
    },
    isMobile() {
      this.updateOverflow();
    },
  },
  created() {
    this.setLang();
    this.updateScreenType();
    this.hubSubscribe();

    this.$hub.start().then(() => {
      this.$hub.proxy.invoke('setCandleSize', defCandleSize);
    });

    window.addEventListener('resize', () => {
      setTimeout(() => {
        this.updateScreenType();
      }, 66);
    });
  },
  mounted() {
    if (showWelcome) {
      this.openModal('welcome');
    }
    this.updateOverflow();
  },
  directives: {
    scrollbar,
  },
  components: {
    TheFooter,
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
    BookHeader,
    InDemo,
    ImportKey,
    Welcome,
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
@import '~sass/bootstrap/media';
@import '~perfect-scrollbar/dist/css/perfect-scrollbar';
@import '~bootstrap/scss/utilities/sizing';

.main {
  &__body {
    display: flex;
    min-width: 1250px;
    margin-left: auto;
    margin-right: auto;
  }
  &__leftSide {
    display: flex;
    width: $leftSide_width;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    transition: all $sidebar_speed linear;
    &--hidden {
      left: -280px;
    }
  }
  &__sidebar {
    width: $sidebar_width;
    position: relative;
    overflow-y: hidden;
  }
  &__toolbar {
    width: $toolbar_width;
  }
  &__content {
    width: calc(100% - #{$toolbar_width});
    margin-left: auto;
    transition: width $sidebar_speed linear;
    &--withSidebar {
      width: calc(100% - #{$leftSide_width});
    }
  }
  &__tiles {
    display: flex;
    flex-wrap: wrap;
  }
  &__tile {
    flex-grow: 1;
    border: 1px solid #182235;
    background-color: $color_blue;
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
      width: 20%;
      padding: $default_spacing;
    }
    &--books {
      width: 40%;
    }
    &--orders {
      width: 40%;
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
    padding: $default_spacing;
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
  &--withSidebar {
    overflow: hidden;
  }
}

@include media-breakpoint-down(md) {
  .main {
    &__body {
      min-width: 100%;
      flex-direction: column;
    }
    &__leftSide {
      &--shown {
        width: 100%;
      }
    }
    &__sidebar {
      width: 100%;
      overflow-y: scroll;
    }
    &__tiles {
      flex-direction: column;
    }
    &__tile {
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
