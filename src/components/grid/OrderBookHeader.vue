<template lang='pug'>
.bookHeader
    Icon.bookHeader__icon(id="arrow", v-if='!ask', :class="{'bookHeader__icon--neg': change >= 0}")
    .bookHeader__title(v-if='ask') 24h Range: {{low.toFixed(4)}} - {{high.toFixed(4)}}
    .bookHeader__title(v-else) {{last.toFixed(4)}}
</template>

<script>
import {mapState} from 'vuex';
import Icon from '../Icon';

export default {
  computed: {
    ...mapState('trade', {
      last: (state) => state.pairInfo.last,
      high: (state) => state.pairInfo.high,
      low: (state) => state.pairInfo.low,
      change: (state) => state.pairInfo.change,
    }),
  },
  props: {
    ask: {
      type: Boolean,
      default: false,
      required: false,
    },
    price: {
      type: Number,
      default: 0,
      required: false,
    },
  },
  components: {
    Icon,
  },
};
</script>

<style lang="scss">
@import "~variables";
.bookHeader {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 0;
  background-color: $color_daintree;
  &__title {
    color: #fff;
    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;
    white-space: nowrap;
  }
  &__icon {
    width: 11px;
    height: 9px;
    margin-right: 13px;
    fill: $color_green;
    &--neg {
      fill: $color_red;
      transform: rotate(180deg);
    }
  }
}
</style>
