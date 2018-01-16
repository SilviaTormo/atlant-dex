<template lang='pug'>
.sidebar
  .sidebar__shadowBottom(:class="(showSidebar) ? '' : 'sidebar__shadowBottom--hidden'")
  .sidebar__item.sidebar__item--logo(@click="getOpenPage('generalsettings')")
    Icon.sidebar__logo(id="logo")
    Icon.sidebar__logo2(id="logo2")
  Portfolio(v-if="section == 'wallet'")
  Quotes(v-if="section == 'quotes'")
  Alerts(v-if="section == 'alert'")
  //- .sidebar__item(v-for="(account, index) in accounts")
  //-   CryptoAddress(
  //-     :isActive="account.isActive",
  //-     :address="account.address", :id="index",
  //-     :key="account.address",
  //-     @click.native='setActive(account)'
  //-   )
  //- .sidebar__item
  //-   .sidebar__buttons
  //-     BButton(color="yellow" rounded @click="openSignUp") Create new
  //-     b or
  //-     BButton(color="malachite" rounded outline @click="openSignIn") Import
  //- .sidebar__item.sidebar__item--copyright Copyright &#169; Atlant, 2017
</template>

<script>
import {importAddress} from 'services/api/contract-api';
import {mapMutations, mapState, mapGetters} from 'vuex';
import Icon from './Icon';
import Portfolio from './Portfolio';
import Alerts from './Alerts';
import Quotes from './Quotes';

export default {
  data() {
    return {
      selected: '',
      selectedCur: 'btc',
      percChng: 2.73,
      accounts: [
        {
          address: 'demowallet',
          isActive: true,
        },
        // {
        //   address: '14rMGBspAtEv4oNdbKsKYAT7tbSgUstzBt',
        //   isActive: true,
        // },
        // {
        //   address: '14rMGBspAtEv4oNdbKsKYAT7tbSgUstzBu',
        //   isActive: false,
        // },
        // {
        //   address: '14rMGBspAtEv4oNdbKsKYAT7tbSgUstzBv',
        //   isActive: false,
        // },
      ],
    };
  },
  computed: {
    ...mapState('misc', {
      showSidebar: 'showSidebar',
      section: 'section',
    }),
    ...mapGetters('misc', {
      toggleSidebar: 'toggleSidebar',
      isMobile: 'isMobile',
      sidebarTitle: 'sidebarTitle',
    }),
  },
  methods: {
    ...mapMutations('page', {
      openPage: 'open',
    }),
    getOpenPage() {
      this.openPage({
        name: '',
      });
    },
    setActive(account) {
      for (let i = 0; i < this.accounts.length; i++) {
        this.accounts[i].isActive = false;
      }
      account.isActive = true;
    },
    importAddr() {
      importAddress('010D4423A7A24AE95DBC7F39DF1A2F8B046AAF444DEF560D6020516886D4D337');
    },
    openCur(cur) {
      this.selectedCur = cur;
    },
  },
  components: {
    Icon,
    Portfolio,
    Alerts,
    Quotes,
  },
};

</script>

<style lang="scss">
@import "~variables";
@import '~sass/bootstrap/media';

.sidebar {
  min-height: 100%;
  background-image: linear-gradient(to top, #01253A 0%, #03354F 100%);
  position: relative;
  &:not(:first-child) {
    position: relative;
  }
  &__shadowBottom {
    position: fixed;
    z-index: 0;
    bottom: 0;
    width: 328px;
    height: 307px;
    background: $background__shadow__gradient__to__top;left: 0;
    left: 0;
    transition: left .1s linear;
    &--hidden {
      left: -328px;
      transition: left .1s linear;
    }
  }
  &__icon {
    $size: 14px;
    height: $size;
    width: $size;
    fill: #fff;
    &:hover{
      pointer: cursor;
    }
  }
  &__item {
    padding: 32px 18px 32px 25px;
    border-bottom: 1px solid #032537;
    font-size: 12px;
    position: relative;
    &--logo {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      font-weight: bold;
      color: red;
      cursor: pointer;
    }
    &--header {
      font-weight: 700;
    }
    &--copyright {
      font-size: 8px;
    }
  }
  &__headerLine {
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-transform: uppercase;
    &:first-of-type {
      margin-bottom: 21px;
      align-items: flex-end;
    }
  }
  &__balance {
    color: #31edd7;
    font-size: 22px;
    font-weight: 500;
  }
  &__headerDropdown {
    width: 50px;
    font-size: 12px;
  }
  &__change {
    display: flex;
    align-items: center;
  }
  &__chngIcon {
    width: 11px;
    height: 9px;
    margin-right: 3px;
    fill: $color_green;
    &--neg {
      fill: $color_red;
      transform: rotate(180deg);
    }
  }
  &__changeAmt {
    font-size: 14px;
    color: $color_green;
    &--neg {
      color: $color_red;
    }
  }
  &__headerText {
    font-size: 10px;
    text-transform: lowercase;
    font-weight: 400;
  }
  &__demo {
    margin-top: 5px;
  }
  &__logo {
    width: 121px;
    height: 15px;
    fill: #fff;
  }
  &__logo2 {
    width: 60px;
    height: 11px;
    fill: #fff;
  }
  &__buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 75%;
    margin-left: auto;
    margin-right: auto;
  }
}
@include media-breakpoint-down(md) {
  .sidebar {
    &__shadowBottom {
      width: 100%;
      &--hidden {
        left: -100%;
      }
    }
  }
}
</style>
