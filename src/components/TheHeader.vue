<template lang="pug">
header.header
  .header__profileTitle(v-if="isMobile && isProfileOpened") {{openProfilePage}}
  .header__main(v-else)
    Pair
    .header__stats(v-if="!isMobile")
      PairInfo
    .header__userbar
      Logout
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex';
import {profileSections} from '@/config';
import Icon from './Icon';
import PairInfo from './PairInfo';
import BButton from './BButton';
import Pair from './Pair';
import Logout from './Logout';
import Price from './Price';
import Balance from './Balance';

export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapState('page', {
      pageName: 'name',
    }),
    ...mapGetters('misc', {
      isMobile: 'isMobile',
    }),
    ...mapGetters('page', {
      isProfileOpened: 'isProfileOpened',
    }),
    openProfilePage() {
      return profileSections.find((item) => item.name == this.pageName).label;
    },
  },
  methods: {
    ...mapActions('user', {
      getEthBalance: 'getEthBalance',
    }),
  },
  components: {
    Icon,
    BButton,
    Pair,
    PairInfo,
    Price,
    Logout,
    Balance,
  },
};
</script>

<style lang="scss">
@import "~variables";
@import '~@/sass/bootstrap/media';

.header {
  padding: 12px 28px;
  width: 100%;
  color: #fff;
  background-color: $color_blue;
  &__main {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__userbar {
    display: flex;
  }
  &__profileTitle {
    width: 100%;
    line-height: 25px;
    text-align: center;
    font-size: 16px;
    font-weight: 900;
    text-transform: uppercase;
  }
}

@include media-breakpoint-down(md) {
  .header {
    position: fixed;
    background: $color_blue;
    left: 35px;
    top: 0;
    padding-right: 40px;
    border-bottom: 1px solid $color_tangaroa;
    z-index: 2;
  }
}
</style>
