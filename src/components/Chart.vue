<template lang='pug'>
.chart
  .chart__header
    .chart__buttons
      .chart__buttonTxt(v-for="period in periods", :class="{'chart__buttonTxt--active' : isCurrentPeriod(period)}", @click="setChartPeriod(period)") {{period}}
    .chart__buttons
      Icon.chart__buttonIcon(:id="type" v-for="type in types", :class="{'chart__buttonIcon--active' : isCurrentChart(type)}", @click="setChartType(type)")
  .chart__body#chart
</template>

<script>
import Highstock from 'highcharts/highstock';
import {mapState, mapGetters, mapActions} from 'vuex';
import {ticksToMilliseconds} from 'services/misc';
import {periods} from 'config';
import Icon from './Icon';

export default {
  data() {
    return {
      chart: null,
      maxRenderedCandles: 0,
      periods: Object.keys(periods),
      types: [
        'lineChart',
        'candleChart',
      ],
      currentChart: 'candleChart',
    };
  },
  computed: {
    ...mapState('trade', {
      startTicks: (state) => state.chart.data.startTicks,
      candleTicks: (state) => state.chart.data.candleTicks,
      candleSize: (state) => state.chart.data.candleSize,
      allCandles: (state) => state.chart.data.candles,
    }),
    ...mapGetters('trade', {
      isCurrentPeriod: 'isCurrentPeriod',
    }),
    candles() {
      if (this.allCandles) {
        return this.allCandles.slice(-this.maxRenderedCandles);
      }
    },
  },
  methods: {
    ...mapActions('trade', {
      loadChart: 'loadChart',
      changeChartPeriod: 'changeChartPeriod',
    }),
    setChartPeriod(pediod) {
      this.changeChartPeriod(pediod).then(() => {
        this.limitCandles();
        this.$hub.proxy.invoke('setCandleSize', this.candleSize);
      });
    },
    isCurrentChart(chart) {
      return this.currentChart === chart;
    },
    setChartType(chart) {
      this.currentChart = chart;
      if (this.currentChart=='candleChart') {
        this.chart.update({
          series: [{
              type: 'candlestick',
              data: this.getCandlestickSeries(),
            },
            {
              data: this.getVolumeSeries(),
            },
          ],
        }, true, true);
      } else {
        this.chart.update({
          series: [{
              type: 'line',
              data: this.getPriceSeries(),
            },
            {
              data: this.getVolumeSeries(),
            },
          ],
        }, true, true);
      }
    },

    getCandleTime(index) {
      return ticksToMilliseconds(this.startTicks + (this.candleTicks * index));
    },
    getSeries(index) {
      return this.candles.map((item, i) => {
        return [
          this.getCandleTime(i),
          item[index],
        ];
      });
    },
    getPriceSeries() {
      return this.getSeries(0);
    },
    getVolumeSeries() {
      return this.getSeries(4);
    },
    getCandlestickSeries() {
      return this.candles.map((item, i) => {
        return [
          this.getCandleTime(i),
          item[0], item[1], item[2], item[3],
        ];
      });
    },
    createChart() {
      const prices = this.getCandlestickSeries();
      const volumes = this.getVolumeSeries();
      this.chart = Highstock.stockChart('chart', {
        chart: {
          renderTo: 'chart',
          spacing: [50, 5, 10, 10],
          backgroundColor: 'none',
          reflow: false,
          style: {
            fontFamily: 'Roboto',
            fontSize: '12px',
          },
        },
        credits: {
          enabled: false,
        },
        navigator: {
          enabled: false,
        },
        rangeSelector: {
          enabled: false,
        },
        scrollbar: {
          enabled: false,
        },
        title: '',
        tooltip: {
          crosshairs: {
            color: 'green',
            dashStyle: 'solid',
          },
          shared: true,
        },
        xAxis: {
          type: 'datetime',
          dateTimeLabelFormats: {
            day: '%d %b %Y',
          },
          lineColor: '#2b5072',
          labels: {
            align: 'center',
            y: 30,
            style: {
              color: '#376691',
              fontSize: '12px',
            },
          },
        },
        yAxis: [{
            allowDecimals: true,
            opposite: true,
            title: {
              text: '',
            },
            labels: {
              align: 'left',
              x: 10,
              y: 0,
              style: {
                color: '#376691',
                fontSize: '12px',
              },
            },
            lineWidth: 0,
            gridLineWidth: 0,
            top: '70%',
            height: '30%',
          },
          {
            allowDecimals: true,
            opposite: true,
            title: {
              text: '',
            },
            labels: {
              align: 'left',
              x: 10,
              y: 0,
              style: {
                color: '#376691',
                fontSize: '12px',
              },
            },
            offset: 0,
            gridLineWidth: 1,
            gridLineColor: '#2b5072',
            height: '75%',
          },
        ],
        legend: {
          enabled: false,
        },
        series: [{
            name: 'Price',
            data: prices,
            type: 'candlestick',
            upColor: '#00ce7d',
            upLineColor: '#00ce7d',
            color: '#e55541',
            lineColor: '#e55541',
            lineWidth: 2,
            yAxis: 1,
            zIndex: 2,
            pointPadding: 0.05,
          },
          {
            name: 'Volume',
            data: volumes,
            type: 'column',
            color: '#055580',
            yAxis: 0,
            zIndex: 1,
            pointPadding: 0.05,
          }],
      });
    },
    limitCandles() {
      this.maxRenderedCandles = this.allCandles.length;
    },
  },
  watch: {
    candles() {
      this.$nextTick().then(() => {
        (this.chart === null) ? this.createChart(): this.chart.update({
          series: [{
              data: this.getCandlestickSeries(),
            },
            {
              data: this.getVolumeSeries(),
            },
          ],
        }, true, true);
      });
    },
  },
  created() {
    this.loadChart().then(() => {
      this.limitCandles();
    });
  },
  components: {
    Icon,
  },
};

</script>

<style lang='scss'>
@import "~variables";
.chart {
  $buttonColor: desaturate(lighten($color_summersky, 6), 68);
  position: relative;
  width: 100%;
  height: 100%;
  &__body {
    width: 100%;
    height: 100%;
  }
  &__header {
    $padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: $padding;
    padding-right: $padding;
    padding-left: $padding;
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 1;
  }
  &__buttons {
    display: flex;
    align-items: center;
  }
  &__buttonTxt {
    color: $buttonColor;
    cursor: pointer;
    font-size: 14px;
    text-transform: uppercase;
    &:not(:last-of-type) {
      margin-right: 10px;
    }
    &--active {
      color: $color_summersky;
    }
  }
  &__buttonIcon {
    $size: 15px;
    width: $size;
    height: $size;
    cursor: pointer;
    fill: $buttonColor;
    &:not(:last-of-type) {
      margin-right: 10px;
    }
    &--active {
      fill: $color_summersky;
    }
  }
}
</style>
