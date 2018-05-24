<template lang="pug">
header.header
  .header__main
    TheHeaderPair
    .header__stats
      TheHeaderPairInfo
    .header__userbar
      TheHeaderLogout
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex';
import {profileSections} from '@/config';
import Icon from './Icon';
import BButton from './BButton';
import TheHeaderPair from './TheHeaderPair';
import TheHeaderPairInfo from './TheHeaderPairInfo';
import TheHeaderLogout from './TheHeaderLogout';

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
    TheHeaderPair,
    TheHeaderPairInfo,
    TheHeaderLogout,
  },
};
</script>

<style lang="scss">
@import 'variables';

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
