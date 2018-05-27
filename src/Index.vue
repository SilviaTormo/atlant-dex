<template lang='pug'>
.main(:class="{'main--withSidebar': showSidebar}")
  .main__body(v-show="modalOpenedDesktop || !isModalOpened()", :class="{'main__body--modalOpened': modalOpenedDesktop}")
    .main__leftSide(:class="`main__leftSide--${(showSidebar) ? 'shown' : 'hidden'}`")
      Sidebar.main__sidebar(v-scrollbar="")
      Toolbar.main__toolbar
    .main__content(:class="{'main__content--withSidebar': showSidebar}")
      .main__shadows(v-show="isPageOpened()")
        .main__shadow--top
        .main__shadow--bottom
      TheHeader
      .main__tiles(v-if="!isPageOpened()")
        Grid
      //- Pages
      TransactionHistoryPage(v-if="isPageOpened('transactionHistory')")
      MyOrdersPage(v-if="isPageOpened('myOrders')")
      VerificationPage(v-if="isPageOpened('verification')")
      VerificationAdminPage(v-if="isPageOpened('verificationAdmin')")
      AccountInformation(v-if="isPageOpened('accountInformation')")
      SecuritySettingsPage(v-if="isPageOpened('securitySettings')")
      SecurityLogPage(v-if="isPageOpened('securityLog')")
      FAQ(v-if="isPageOpened('faq')")
      NotificationHistoryPage(v-if="isPageOpened('notificationHistory')")
  //- Modals
  ModalInDemo(v-if="isModalOpened('inDemo')")
  ModalReset(v-else-if="isModalOpened('reset')")
  ModalNewPassword(v-else-if="isModalOpened('newPassword')")
  ModalSignUp(v-else-if="isModalOpened('signUp')")
  ModalSignIn(v-else-if="isModalOpened('signIn')")
  ModalCryptoDeposit(v-else-if="isModalOpened('cryptoDeposit')")
  ModalCryptoWithdraw(v-else-if="isModalOpened('cryptoWithdraw')")
  ModalStatus(v-else-if="isModalOpened('status')")
  ModalFiat(v-else-if="isModalOpened('fiat')")
  ModalTFA(v-else-if="isModalOpened('tfaModal')")
  ModalTFAWarning(v-else-if="isModalOpened('tfaWarningModal')")
  ModalEventStatusCompleted(v-else-if="isModalOpened('eventStatusCompleted')")
  ModalEventStatusFailed(v-else-if="isModalOpened('eventStatusFailed')")
</template>

<script>
import i18n from '@/i18n';
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
import {notification, getSignalRNotification} from 'services/notification';
// import * as Trade from 'services/api/trade';
import {showWelcome} from '@/config';
import {scrollbar} from '@/directives';
import TheHeader from 'components/TheHeader';
import TheFooter from 'components/TheFooter';
import Sidebar from 'components/Sidebar';
import Toolbar from 'components/Toolbar';
import Grid from 'components/grid/Grid';
import TransactionHistoryPage from 'pages/TransactionHistoryPage';
import MyOrdersPage from 'pages/MyOrdersPage';
import NotificationHistoryPage from 'pages/NotificationHistoryPage';
import VerificationPage from 'pages/VerificationPage';
import VerificationAdminPage from 'pages/VerificationAdminPage';
import AccountInformation from 'pages/AccountInformationPage';
import SecuritySettingsPage from 'pages/SecuritySettingsPage';
import SecurityLogPage from 'pages/SecurityLogPage';
import ModalInDemo from 'components/ModalInDemo';
import ModalReset from 'components/ModalReset';
import ModalNewPassword from 'components/ModalNewPassword';
import ModalSignUp from 'components/ModalSignUp';
import ModalSignIn from 'components/ModalSignIn';
import ModalCryptoDeposit from 'components/ModalCryptoDeposit';
import ModalCryptoWithdraw from 'components/ModalCryptoWithdraw';
import ModalFiat from 'components/ModalFiat';
import ModalTFA from 'components/ModalTFA';
import ModalTFAWarning from 'components/ModalTFAWarning';
import ModalEventStatusCompleted from 'components/ModalEventStatusCompleted';
import ModalEventStatusFailed from 'components/ModalEventStatusFailed';
import Status from 'components/Status';

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
    ...mapState('user', {
      account: 'account',
      notificationsCounter: 'notificationsCounter',
    }),
    ...mapGetters('user', [
      'isTFAEnabled',
    ]),
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
      return this.isModalOpened();
    },
  },
  methods: {
    ...mapMutations('misc', {
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
      addNewPrices: 'addNewPrices',
      addNewTrade: 'addNewTrade',
    }),
    ...mapMutations('orders', {
      addActiveOrder: 'addActiveOrder',
      changeOrderStatus: 'changeOrderStatus',
    }),
    ...mapMutations('user', {
      setNotificationsCounter: 'setNotificationsCounter',
      changePortfolio: 'changePortfolio',
    }),
    ...mapActions('membership', {
      dropUser: 'dropUser',
    }),
    ...mapActions('localization', [
      'setLang',
    ]),
    ...mapActions('user', [
      'getTokens',
      'getProfileData',
      'getCurrencies',
    ]),
    ...mapActions('trade', {
      getTraderWallet: 'getTraderWallet',
    }),
    updateOverflow() {
      document.querySelector('#app').style.overflow = this.showSidebar ? 'hidden' : null;
    },
    hubSubscribe() {
      // add signalR events here
      this.$hub.on('newNotification', (data) => {
        if (getSignalRNotification(data.notificationType)) {
          notification({
            text: i18n.t(`notifications.${getSignalRNotification(data.notificationType)}`, i18n.locale, data.arguments),
            type: 'info',
          });
          if (data.notificationType < 7) {
            this.setNotificationsCounter(this.notificationsCounter + 1);
          }
        };
      });
      this.$hub.on('newOrder', (data) => {
        this.addActiveOrder(data);
      });
      this.$hub.on('orderChanged', (data) => {
        this.changeOrderStatus(data);
      });
      this.$hub.on('newTrade', (data) => {
        this.addNewTrade(data);
      });
      this.$hub.on('newBalance', (data) => {
        this.changePortfolio(data);
      });
      this.$hub.on('newTradeStatistic', (data) => {
      });
      this.$hub.on('orderBookChanged', (data) => {
      });
    },
    modalChangeStyleforBody() {
      document.querySelector('body').style.overflow = (this.isModalOpened()) ? 'hidden' : 'auto';
    },
  },
  watch: {
    pair() {
      this.$hub.invoke('setPair', this.pair);
    },
    token() {
      if (this.token) {
        this.$hub.invoke('authenticate', this.token);
      }
    },
    showSidebar() {
      this.updateOverflow();
    },
    modalOpenedDesktop() {
      this.modalChangeStyleforBody();
    },
    isLoggedIn(isTrue) {
      if (!isTrue) {
        this.openModal({name: 'signIn'});
        notification({
          text: 'Logged out',
        });
      } else {
        this.getProfileData().then((response) => {
          if (!this.isTFAEnabled) {
            this.openModal({name: 'tfaWarningModal'});
          }
          return response;
        });
      }
    },
  },
  created() {
    this.setLang();
    this.hubSubscribe();

    if (this.isLoggedIn) {
      this.getProfileData();
      this.getCurrencies();
    };

    this.$hub.start().then(() => {
      // this.$hub.invoke('newNotification', 'newMessage');
      // if (this.isLoggedIn) {
      //   this.$hub.setToken(this.token);
      // }
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
    Grid,
    TransactionHistoryPage,
    MyOrdersPage,
    NotificationHistoryPage,
    VerificationPage,
    VerificationAdminPage,
    AccountInformation,
    SecuritySettingsPage,
    SecurityLogPage,
    Status,
    ModalInDemo,
    ModalReset,
    ModalNewPassword,
    ModalSignUp,
    ModalSignIn,
    ModalCryptoDeposit,
    ModalCryptoWithdraw,
    ModalFiat,
    ModalTFA,
    ModalTFAWarning,
    ModalEventStatusCompleted,
    ModalEventStatusFailed,
  },
};
</script>

<style src="noty/lib/noty.css"></style>
<style lang='scss'>
@import 'perfect-scrollbar/dist/css/perfect-scrollbar';
@import 'styles/fonts';
@import 'styles/defaults';
@import 'styles/global';
@import 'styles/overrides';
@import 'variables';

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
    // height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
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
</style>
