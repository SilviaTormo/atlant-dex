<template lang='pug'>
table.history
  tbody.history__body
    tr.history__row(v-for='(trade, index) in lastTrades')
      td.history__cell(:class="`history__cell--${(trade.side) ? 'sell' : 'buy'}`") {{trade.price}}
      td.history__cell {{trade.amount.toFixed(4)}}
      td.history__cell {{(trade.price * trade.amount).toFixed(4)}}
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex';

export default {
  computed: {
    ...mapState('trade', {
      pair: 'pair',
    }),
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
  watch: {
    pair() {
      this.getApiRequest();
    },
  },
  created() {
    this.getApiRequest();
  },
};
</script>

<style lang="scss">
@import 'variables';

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
</style>
