<template lang='pug'>
table.book
  tbody.book__body
    tr.book__row(v-for="(order, index) in orderBook")
      td.book__cell(:class="`book__cell--${(ask) ? 'ask' : 'bid'}`") {{order.price}}
      td.book__cell {{order.amount.toFixed(4)}}
      td.book__cell {{(order.price * order.amount).toFixed(4)}}
</template>

<script>
import {mapState, mapActions} from 'vuex';

export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapState('trade', {
      book: (state) => state.book,
    }),
    orderBook() {
      const items = this.ask ? this.book.asks : this.book.bids;
      return items; // .slice(0, this.limit);
    },
  },
  methods: {
    ...mapActions('trade', [
      'getOrderBook',
    ]),
  },
  watch: {
    orderBook() {
      this.getOrderBook({limit: 20});
    },
  },
  created() {
    this.getOrderBook({limit: 20});
  },
  props: {
    ask: {
      type: Boolean,
      default: false,
      required: false,
    },
    limit: {
      type: Number,
      default: 20,
      required: false,
    },
  },
};
</script>

<style lang="scss">
@import "~variables";

.book {
  width: 100%;
  &__cell {
    width: 33.333%;
    &--ask {
      color: $color_red;
    }
    &--bid {
      color: $color_green;
    }
  }
}

</style>
