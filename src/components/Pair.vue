<template lang="pug">
.pair
  Icon.pair__icon(:id="('cur_' + baseCurrency).toLocaleLowerCase()")
  .pair__currency(v-text="baseCurrency")
  Icon.pair__exchange(id="exchange")
  Icon.pair__icon(:id="('cur_' + quoteCurrency).toLocaleLowerCase()")
  Dropdown.pair__dropdown(:options="pairs[baseCurrency]" v-model="selected")
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex';
import Icon from './Icon';
import Dropdown from './Dropdown';

export default {
  data() {
    return {
      selected: '',
    };
  },
  computed: {
    ...mapState('trade', {
      pairs: 'pairs',
    }),
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
    max-width: 64px;
    font-size: 16px;
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
