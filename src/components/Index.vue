<template lang='pug'>
.main(:class="{'main--withSidebar': (showSidebar && isMobile)}")
  .main__body(v-show="modalOpenedDesktop || !isModalOpened()", :class="{'main__body--modalOpened': modalOpenedDesktop}")
    .main__leftSide(:class="`main__leftSide--${(showSidebar) ? 'shown' : 'hidden'}`")
      Sidebar.main__sidebar(v-scrollbar="")
      Toolbar.main__toolbar
    .main__content(:class="{'main__content--withSidebar': (showSidebar && !isMobile)}")
      TheHeader(v-if="!isMobile")
      .main__tiles(v-show="!isPageOpened()")
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
              .main__tile(v-if="index === 0")
                BuySell
              .main__tile(v-if="index === 1")
                Chart
              .main__tile.main__tile--history(v-if="index === 2")
                TileHeader.main__tileHeader.main__tileHeader--history(title='History of trades' center)
                History
              .main__tile.main__tile--books(v-if="index === 3")
                TileHeader.main__tileHeader.main__tileHeader--book(title='Order book' center)
                .main__books
                  .main__tile
                    BookHeader
                    Book.main__book(:limit='19')
                  .main__tile
                    BookHeader(ask)
                    Book.main__book(ask, :limit='19')
              .main__tile.main__tile--orders(v-if="index === 4")
                TileHeader.main__tileHeader.main__tileHeader--orders(title='Open orders')
                Orders
                .main__ordersSep
                TileHeader.main__tileHeader.main__tileHeader--orders(title='Completed orders')
                Orders
      //- Pages
      TransactionHistory(v-if="isPageOpened('transactionHistory')")
      GeneralSettings(v-if="isPageOpened('generalsettings')")
      ChangePassword(v-if="isPageOpened('changePassword')")
      AccountInformation(v-if="isPageOpened('accountinformation')")
  //- Modals
  InDemo(v-if="isModalOpened('inDemo')")
  ImportKey(v-else-if="isModalOpened('importKey')")
  Welcome(v-else-if="isModalOpened('welcome')")
  Reset(v-else-if="isModalOpened('reset')")
  SignUp(v-else-if="isModalOpened('signUp')")
  SignIn(v-else-if="isModalOpened('signIn')")
  CryptoDeposit(v-else-if="isModalOpened('cryptoDeposit')")
  CryptoWithdraw(v-else-if="isModalOpened('cryptoWithdraw')")
  Status(v-else-if="isModalOpened('status')")
  Fiat(v-else-if="isModalOpened('fiat')")
</template>

<script>
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
import * as Trade from 'services/api/trade';
import {defCandleSize, showWelcome, gridLayout} from 'config';
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
import TransactionHistory from './pages/TransactionHistory';
import GeneralSettings from './pages/GeneralSettings';
import ChangePassword from './pages/ChangePassword';
import AccountInformation from './pages/AccountInformation';
import InDemo from './modals/InDemo';
import ImportKey from './modals/ImportKey';
import Welcome from './modals/Welcome';
import Reset from './modals/Reset';
import SignUp from './modals/SignUp';
import SignIn from './modals/SignIn';
import CryptoDeposit from './modals/CryptoDeposit';
import CryptoWithdraw from './modals/CryptoWithdraw';
import Status from './modals/Status';
import Fiat from './modals/Fiat';

export default {
  data() {
    return {
      gridLayout,
    };
  },
  computed: {
    ...mapState('misc', {
      showSidebar: 'showSidebar',
      currentPage: 'currentPage',
    }),
    ...mapState('trade', {
      pair: 'pair',
    }),
    ...mapGetters('misc', {
      isMobile: 'isMobile',
    }),
    ...mapGetters('modal', {
      isModalOpened: 'isOpened',
    }),
    ...mapGetters('page', {
      isPageOpened: 'isOpened',
    }),
    modalOpenedDesktop() {
      return this.isModalOpened() && !this.isMobile;
    },
  },
  methods: {
    ...mapMutations('misc', {
      updateScreenType: 'updateScreenType',
    }),
    ...mapMutations('modal', {
      openModal: 'open',
    }),
    ...mapMutations('stats', {
      setStats: 'setStats',
    }),
    ...mapMutations('trade', {
      setBook: 'setBook',
      setOHLC: 'setOHLC',
      addNewCandle: 'addNewCandle',
      addLastTrade: 'addLastTrade',
      setOrdersAsks: 'setOrdersAsks',
      setOrdersBids: 'setOrdersBids',
      setTradeHistory: 'setTradeHistory',
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
    modalChangeStyleforBody() {
      document.querySelector('body').style.overflow = (this.isModalOpened()) ? 'hidden' : 'auto';
    },
  },
  watch: {
    showSidebar() {
      this.updateOverflow();
    },
    isMobile() {
      this.updateOverflow();
    },
    modalOpenedDesktop() {
      this.modalChangeStyleforBody();
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
    $('.grid-stack').gridstack({
      animate: true,
      resizable: {
          handles: 'e, se, s, sw, w',
      },
    });
    Trade.getDesktop({
      limit: 23,
      pair: this.pair,
    }).then((res) => {
      this.setTradeHistory(res.data.result.trades);
      this.setBook(res.data.result);
      this.setOHLC(res.data.result);
      this.setStats(res.data.result);
    });
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
    Reset,
    SignUp,
    SignIn,
    CryptoDeposit,
    CryptoWithdraw,
    TransactionHistory,
    GeneralSettings,
    ChangePassword,
    AccountInformation,
    Status,
    Fiat,
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
  height: 100%;
  &__body {
    display: flex;
    min-width: 1250px;
    margin-left: auto;
    margin-right: auto;
    &--modalOpened {
      filter: blur(10px);
    }
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
  &__tile {
    width: 100%;
    height: 100%;
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
