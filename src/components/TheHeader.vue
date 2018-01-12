<template lang="pug">
header.header
  Pair
  .header__stats(v-if="!isMobile")
    Stat(label="Last", :value="466.35")
    Stat(label="High", :value="474.71")
    Stat(label="Low", :value="461.02")
    Stat(label="Volume", value="$1247880.00")
  .header__userbar
    Logout
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import Icon from './Icon';
import Stat from './Stat';
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
    ...mapGetters('misc', {
      isMobile: 'isMobile',
    }),
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
    Stat,
    Price,
    Logout,
    Balance,
  },
};
</script>

<style lang="scss">
@import "~variables";
@import '~sass/bootstrap/media';

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 28px;
  width: 100%;
  color: #fff;
  background-color: $color_blue;
  &__group {
    display: flex;
    align-items: center;
  }
  &__block {
    display: flex;
    align-items: center;
    &--pair {
      margin-right: 18px;
    }
  }
  &__userbar {
    display: flex;
  }
  &__stats {
    display: flex;
    & > *:not(last-of-type) {
      margin-right: 24px;
    }
  }
  &__balance {
    font-weight: 700;
    text-transform: uppercase;
    margin-right: 22px;
  }
  &__bvalues {
    display: flex;
    align-items: center;
  }
  &__separator {
    margin: 0 11px;
  }
  &__transfer {
    margin-left: 26px;
  }
  &__info {
    $size: 16px;
    height: $size;
    width: $size;
    fill: #fff;
    &:hover {
      cursor: pointer;
    }
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
