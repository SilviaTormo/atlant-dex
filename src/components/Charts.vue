<template lang='pug'>
.charts
  .charts__item.charts__item--header
    .charts__headerLine
      .charts__header CHARTS:
      .charts__headerText 24 hr change
      Dropdown.charts__headerDropdown(:options="currencies" v-model="selected")
  .charts__item
    .charts__headerLine
      input.charts__search(type="text", placeholder="Search for currencies" v-model="search")
      Icon.charts__searchIcon(id="search")
  .charts__item(v-show="charts")
    .charts__headerLine
      .charts__header Coins:
      Icon.charts__icon(id="refresh")
    ChartsItem(v-for="chart in filteredCharts", :key="chart.currency",
    :currency="chart.currency.toLowerCase()", :price="chart.price", :priceChng="chart.change", :cap="chart.cap", :volume="chart.volume",
    :isActive="activeCur == chart.currency", @click.native="openChart(chart.currency)")
</template>

<script>
import {mapState, mapActions} from 'vuex';
import {getCryptoName} from 'services/misc';
import Icon from './Icon';
import Dropdown from './Dropdown';
import ChartsItem from './ChartsItem';

export default {
  data() {
    return {
      selected: '',
      search: '',
      activeCur: 'btc',
      // charts: [
      //   {
      //     currency: 'btc',
      //     price: '$11 388,60',
      //     priceChng: '-3.71',
      //     cap: '$44 192 919 519',
      //     volume: '$1 100 850 000',
      //   },
      //   {
      //     currency: 'eth',
      //     price: '$459,70',
      //     priceChng: '-4.10',
      //     cap: '$44 192 919 519',
      //     volume: '$1 100 850 000',
      //   },
      //   {
      //     currency: 'tether',
      //     price: '$459,70',
      //     priceChng: '-4.10',
      //     cap: '$44 192 919 519',
      //     volume: '$1 100 850 000',
      //   },
      // ],
      currencies: ['USD'],
      aviableCharts: ['BTC', 'ETH', 'LTC', 'ATL'],
    };
  },
  computed: {
    ...mapState('trade', {
      charts: 'chartsInfo',
    }),
    filteredCharts() {
      if (!this.search) return this.charts;
      return this.charts.filter(({currency}) => {
        const fullName = getCryptoName(currency.toUpperCase()) || '';
        const searchLowerCased = this.search.toLowerCase();
        return (
            currency.toLowerCase().includes(searchLowerCased)
            || fullName.toLowerCase().includes(searchLowerCased)
        );
      });
    },
    aviableChartsToQueryString() {
      let queryString = '';
      for (let i=0; i < this.aviableCharts.length; i++) {
        queryString += '&currencies=' + this.aviableCharts[i];
      };
      return queryString;
    },
  },
  methods: {
    ...mapActions('trade', [
      'getChartsInfo',
    ]),
    openChart(cur) {
      this.activeCur = cur;
    },
//    isSearched(cur) {
//      return cur.includes(this.search);
//    },
    getApiRequest() {
      this.getChartsInfo({
        period: '24h',
        currencies: this.aviableChartsToQueryString,
      });
    },
  },
  created() {
    this.getApiRequest();
  },
  components: {
    Icon,
    Dropdown,
    ChartsItem,
  },
};

</script>

<style lang="scss">
@import "~variables";
@import '~sass/bootstrap/media';

.charts {
  position: relative;
  &:after {
    display: block;
    content: '';
    height: 1px;
    border-top: 1px solid #00334C;
  }
  &__icon {
    $size: 14px;
    height: $size;
    width: $size;
    fill: #fff;
    &:active {
      animation: spin 0.5s 1 ease-in-out;
    }
    &:hover{
      cursor: pointer;
    }
  }
  &__item {
    padding: 32px 18px 32px 25px;
    border-bottom: 1px solid #032537;
    border-top: 1px solid #00334C;
    font-size: 12px;
    &--header {
      font-weight: 700;
    }
  }
  &__headerLine {
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-transform: uppercase;
  }
  &__search{
    border: none;
    padding: 0;
    height: 14px;
    width: 100%;
    background-color: transparent;
    color: #5b87a0;
    &::placeholder{
      color: #5b87a0;
    }
  }
  &__searchIcon {
    $size: 18px;
    height: $size;
    width: $size;
    fill: #ffffff;
    &:hover {
      cursor: pointer;
    }
  }
  &__headerDropdown {
    width: 50px;
    font-size: 12px;
  }
  &__headerText {
    font-size: 10px;
    text-transform: lowercase;
    font-weight: 400;
  }
}

@keyframes spin {
  0%  {-webkit-transform: rotate(0deg);}
  100% {-webkit-transform: rotate(-180deg);}
}
</style>
