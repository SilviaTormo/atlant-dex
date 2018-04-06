<template lang='pug'>
.main(:class="{'main--withSidebar': (showSidebar && isMobile)}")
  .main__body(v-show="modalOpenedDesktop || !isModalOpened()", :class="{'main__body--modalOpened': modalOpenedDesktop}")
    .main__leftSide(:class="`main__leftSide--${(showSidebar) ? 'shown' : 'hidden'}`")
      Sidebar.main__sidebar(v-scrollbar="")
      Toolbar.main__toolbar
    .main__content(:class="{'main__content--withSidebar': (showSidebar && !isMobile)}")
      .main__shadows(v-show="isPageOpened()")
        .main__shadow--top
        .main__shadow--bottom
      TheHeader
      .main__tiles(v-show="!isPageOpened()")
        Grid
        PairInfo(v-if="isMobile")
      //- Pages
      TransactionHistory(v-if="isPageOpened('transactionHistory')")
      MyOrders(v-if="isPageOpened('myOrders')")
      VerificationPage(v-if="isPageOpened('verification')")
      VerificationAdmin(v-if="isPageOpened('verificationAdmin')")
      AccountInformation(v-if="isPageOpened('accountInformation')")
      SecuritySettings(v-if="isPageOpened('securitySettings')")
      SecurityLog(v-if="isPageOpened('securityLog')")
      FAQ(v-if="isPageOpened('faq')")
      NotificationHistory(v-if="isPageOpened('notificationHistory')")
  //- Modals
  InDemo(v-if="isModalOpened('inDemo')")
  Reset(v-else-if="isModalOpened('reset')")
  NewPassword(v-else-if="isModalOpened('newPassword')")
  SignUp(v-else-if="isModalOpened('signUp')")
  SignIn(v-else-if="isModalOpened('signIn')")
  CryptoDeposit(v-else-if="isModalOpened('cryptoDeposit')")
  CryptoWithdraw(v-else-if="isModalOpened('cryptoWithdraw')")
  Status(v-else-if="isModalOpened('status')")
  Fiat(v-else-if="isModalOpened('fiat')")
  TFAModal(v-else-if="isModalOpened('tfaModal')")
</template>

<script>
import i18n from 'i18n';
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
import {notification, getSignalRNotification} from 'services/notification';
import * as Trade from 'services/api/trade';
import {showWelcome} from 'config';
import {scrollbar} from 'directives';
import TheHeader from './TheHeader';
import PairInfo from './PairInfo';
import TheFooter from './TheFooter';
import Sidebar from './Sidebar';
import Toolbar from './Toolbar';
import Grid from './grid/Grid';
import PropertyMap from './PropertyMap';
import TransactionHistory from './pages/Tables/TransactionHistory';
import MyOrders from './pages/Tables/MyOrders';
import NotificationHistory from './pages/Tables/NotificationHistory';
import VerificationPage from './pages/Verification/VerificationPage';
import VerificationAdmin from './pages/VerificationAdmin';
import AccountInformation from './pages/AccountInformation';
import SecuritySettings from './pages/SecuritySettings';
import SecurityLog from './pages/SecurityLog';
import FAQ from './pages/FAQ';
import InDemo from './modals/InDemo';
import Reset from './modals/Reset';
import NewPassword from './modals/NewPassword';
import SignUp from './modals/SignUp';
import SignIn from './modals/SignIn';
import CryptoDeposit from './modals/CryptoDeposit';
import CryptoWithdraw from './modals/CryptoWithdraw';
import Status from './modals/Status';
import Fiat from './modals/Fiat';
import TFAModal from './modals/TFAModal';

export default {
  computed: {
    ...mapState('misc', {
      showSidebar: 'showSidebar',
      currentPage: 'currentPage',
    }),
    ...mapState('trade', {
      pair: 'pair',
    }),
    ...mapState('membership', {
      token: 'token',
    }),
    ...mapGetters('misc', {
      isMobile: 'isMobile',
    }),
    ...mapGetters('membership', {
      isLoggedIn: 'isLoggedIn',
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
      setSidebar: 'setSidebar',
    }),
    ...mapMutations('modal', {
      openModal: 'open',
    }),
    ...mapMutations('stats', {
      setStats: 'setStats',
    }),
    ...mapMutations('trade', {
      setPair: 'setPair',
      setDesktopData: 'setDesktopData',
      setOHLC: 'setOHLC',
      addActiveOrder: 'addActiveOrder',
      setCancelActiveOrder: 'setCancelActiveOrder',
      setFilledActiveOrder: 'setFilledActiveOrder',
      addNewPrices: 'addNewPrices',
    }),
    ...mapActions('membership', {
      dropUser: 'dropUser',
    }),
    ...mapActions('localization', [
      'setLang',
    ]),
    ...mapActions('user', {
      getTokens: 'getTokens',
    }),
    ...mapActions('trade', {
      getTraderWallet: 'getTraderWallet',
      getTradeHistory: 'getTradeHistory',
      getOrderBook: 'getOrderBook',
    }),
    updateOverflow() {
      document.querySelector('#app').style.overflow = (this.showSidebar && this.isMobile) ? 'hidden' : null;
    },
    hubSubscribe() {
      // add signalR events here
      this.$hub.on('newNotification', (data) => {
        notification({
          text: i18n.t(getSignalRNotification(data.notificationType), i18n.locale, data.arguments),
          type: 'success',
        });
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
      this.setSidebar(false);
      this.updateOverflow();
    },
    modalOpenedDesktop() {
      this.modalChangeStyleforBody();
    },
    isLoggedIn(isTrue) {
      if (!isTrue) {
        this.openModal({name: 'signIn'});
        notification({
          text: 'Log Out',
        });
      }
    },
  },
  created() {
    this.setLang();
    this.updateScreenType();
    this.hubSubscribe();

    this.$hub.start().then(() => {
      // this.$hub.invoke('newNotification', 'newMessage');
      // if (this.isLoggedIn) {
      //   this.$hub.setToken(this.token);
      // }
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
    Trade.getDesktop({
      limit: 23,
      pair: this.pair,
    }).then((res) => {
      this.setDesktopData(res.data.result);
      this.setPair(res.data.result.pair);
      this.setOHLC(res.data.result);
      this.setStats(res.data.result);
    });
    this.getTradeHistory({
      page: 1,
      limit: 20,
      pair: 'BTC_ATL',
    });
  },
  directives: {
    scrollbar,
  },
  components: {
    TheFooter,
    Sidebar,
    TheHeader,
    PairInfo,
    Toolbar,
    Grid,
    PropertyMap,
    InDemo,
    Reset,
    NewPassword,
    SignUp,
    SignIn,
    CryptoDeposit,
    CryptoWithdraw,
    TransactionHistory,
    MyOrders,
    NotificationHistory,
    VerificationPage,
    VerificationAdmin,
    AccountInformation,
    SecuritySettings,
    SecurityLog,
    FAQ,
    Status,
    Fiat,
    TFAModal,
  },
};
</script>

<style lang='scss'>
@import '~noty/lib/noty';
@import '~normalize.css/normalize';
@import '~sass/defaults';
@import '~sass/fonts';
@import '~sass/global';
@import '~sass/overrides';
@import '~variables';
@import '~sass/bootstrap/flex';
@import '~sass/bootstrap/media';
@import '~perfect-scrollbar/dist/css/perfect-scrollbar';
@import '~bootstrap/scss/utilities/sizing';

.main {
  min-height: 100%;
  overflow: hidden;
  overflow-x: hidden;
  overflow-y: hidden;
  &__body {
    display: flex;
    // min-width: 1250px;
    min-height: 100vh;
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
    transition: left $sidebar_speed linear;
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
    position: relative;
    width: calc(100% - #{$toolbar_width});
    min-height: 100vh;
    margin-left: auto;
    transition: width $sidebar_speed linear;
    &--withSidebar {
      width: calc(100% - #{$leftSide_width});
    }
  }
  &--withSidebar {
    overflow: hidden;
  }
  &__shadow {
    &--bottom {
      position: fixed;
      width: 100%;
      bottom: 0;
      height: 300px;
      background: $background__shadow__gradient__to__top;
    }
  }
}

@include media-breakpoint-down(md) {
  .main {
    &__body {
      min-width: 100%;
      flex-direction: column;
    }
    &__content {
      padding-top: 48px;
      padding-bottom: 50px;
      &:before {
        height: 150px;
      }
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
    &__shadow {
      &--top {
        position: fixed;
        width: 100%;
        top: 50px;
        height: 50px;
        background: $background__shadow__gradient__to__bottom;
      }
      &--bottom {
        position: fixed;
        width: 100%;
        bottom: 50px;
        height: 50px;
        background: $background__shadow__gradient__to__top;
      }
    }
  }
}
</style>
