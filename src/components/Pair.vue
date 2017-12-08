<template lang="pug">
.pair
  Icon.pair__icon(id="deposit")
  .pair__currency ETH
  Icon.pair__exchange(id="exchange")
  Icon.pair__icon(id="deposit")
  Dropdown.pair__dropdown(:options="currencies" v-model="selected")
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import Icon from './Icon';
import Dropdown from './Dropdown';

export default {
  data() {
    return {
      selected: '',
      currencies: [
        'ATL',
        'ATLE',
        'ATLF',
        'ATLG',
      ],
    };
  },
  computed: {
    ...mapGetters('trade', {
      baseCurrency: 'baseCurrency',
      quoteCurrency: 'quoteCurrency',
    }),
  },
  methods: {
    ...mapActions('trade', {
      changeQuoteCurrency: 'changeQuoteCurrency',
    }),
  },
  watch: {
    selected() {
      this.changeQuoteCurrency(this.selected);
    },
  },
  created() {
    this.selected = this.quoteCurrency;
  },
  components: {
    Icon,
    Dropdown,
  },
};
</script>

<style lang="scss">
.pair {
  display: flex;
  align-items: center;
  &__icon {
    $size: 25px;
    fill: #fff;
    width: $size;
    height: $size;
    margin-right: 10px;
  }
  &__dropdown {
    min-width: 64px;
    max-width: 64px
  }
  &__currency {
    font-weight: bold;
    font-size: 16px;
  }
  &__exchange {
    $size: 15px;
    height: $size;
    width: $size;
    transform: rotate(90deg);
    margin: 0 10px;
    fill: #e9bd24;
  }
}
</style>
