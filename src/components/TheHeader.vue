<template lang="pug">
header.header
  .header__main
    Pair
    .header__stats
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

export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapState('page', {
      pageName: 'name',
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
  },
};
</script>

<style lang="scss">
@import "~variables";

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
</style>
