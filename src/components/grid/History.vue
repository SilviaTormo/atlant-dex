<template lang='pug'>
table.history
  tbody.history__body
    tr.history__row(v-for='(trade, index) in lastTrades')
      td.history__cell(:class="`history__cell--${(trade[3]) ? 'sell' : 'buy'}`") {{trade.price}}
      td.history__cell {{trade.amount.toFixed(4)}}
      td.history__cell {{(trade.price * trade.amount).toFixed(4)}}
</template>

<script>
import {mapGetters, mapActions} from 'vuex';

export default {
  computed: {
    ...mapGetters('trade', {
      lastTrades: 'getLastTrades',
    }),
  },
  methods: {
    ...mapActions('trade', {
      getTradeHistory: 'getTradeHistory',
    }),
    getApiRequest() {
      this.getTradeHistory();
    },
  },
  created() {
    this.getApiRequest();
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
