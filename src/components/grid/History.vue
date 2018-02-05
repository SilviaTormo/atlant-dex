<template lang='pug'>
table.history
  tbody.history__body
    tr.history__row(v-for='(trade, index) in lastTrades', :class="`actions__orders--${(trade[3]) ? 'sell' : 'buy'}`", :key="trade[1] + trade[0]")
      td.history__cell(:class="`history__cell--${(trade[3]) ? 'sell' : 'buy'}`") {{trade[0]}}
      td.history__cell {{trade[1].toFixed(4)}}
      td.history__cell {{(trade[0]*trade[1]).toFixed(4)}}
</template>

<script>
import {mapState} from 'vuex';

export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapState('trade', {
      lastTrades: (state) => state.trades,
    }),
  },
};
</script>

<style lang="scss">
@import "~variables";
@import '~sass/bootstrap/media';

.history {
  width: 100%;
  &__cell {
    width: 33.333%;
    &--buy {
      color: $color_green;
    }
    &--sell {
      color: $color_red;
    }
  }
}

@include media-breakpoint-down(md) {
  .history {
    &__cell {
      text-align: center;
    }
  }
}
</style>
