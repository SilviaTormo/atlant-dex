<template lang='pug'>
.sidebar
  TheHeader(v-if="isMobile")
  .sidebar__item.sidebar__item--logo
    Icon.sidebar__logo(id="logo")
    span.sidebar__demo DEMO
  .sidebar__item.sidebar__item--header Wallets
  .sidebar__item(v-for="(account, index) in accounts")
    CryptoAddress(
      :isActive="account.isActive",
      :address="account.address", :id="index",
      :key="account.address",
      @click.native='setActive(account)'
    )
  .sidebar__item
    .sidebar__buttons
      BButton(color="yellow" rounded @click="newAddress") Create new
      b or
      BButton(color="malachite" rounded outline @click="openImport()") Import
  .sidebar__item.sidebar__item--copyright Copyright &#169; Atlant, 2017
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';
import Icon from './Icon';
import BButton from './BButton';
import TheHeader from './TheHeader';
import CryptoAddress from './CryptoAddress';

export default {
  data() {
    return {
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
    ...mapGetters('misc', {
      isMobile: 'isMobile',
    }),
  },
  methods: {
    ...mapMutations('modal', {
      openModal: 'open',
    }),
    openImport() {
      this.openModal('importKey');
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
  },
  components: {
    CryptoAddress,
    Icon,
    BButton,
    TheHeader,
  },
};

</script>

<style lang="scss">
@import "~variables";
@import '~sass/bootstrap/media';

.sidebar {
  width: $sidebar_width;
  z-index: -1;
  &__item {
    padding: 26px;
    border-bottom: 1px solid #032537;
    font-size: 12px;
    &--logo {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      font-weight: bold;
      color: red;
    }
    &--header {
      font-weight: 700;
    }
    &--copyright {
      font-size: 8px;
    }
  }
  &__demo {
    margin-top: 5px;
  }
  &__logo {
    width: 164px;
    height: 16px;
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
    width: 100%;
    z-index: 1;
  }
}
</style>
