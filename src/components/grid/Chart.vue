<template lang='pug'>
.chart
  .chart__header
    .chart__buttons
      .chart__buttonTxt(v-for="period in periods", :class="{'chart__buttonTxt--active' : isCurrentPeriod(period)}", @click="setChartPeriod(period)") {{period}}
    .chart__technical
      .chart__buttonTxt(v-for="tech in technicalIndicators", :class="[techClass(tech.name), colorClass(tech.name)]", @click="toggleIndicator(tech.name)") {{tech.name}}
    .chart__buttons
      Icon.chart__buttonIcon(:id="type + 'Chart'" v-for="type in types", :key="type", :class="{'chart__buttonIcon--active' : isCurrentChart(type)}", @click="setChartType(type)")
  .chart__body#chart
</template>

<script>
import echarts from 'echarts';
import {simpleMovingAverageArray} from 'binary-indicators/lib/simpleMovingAverage';
import {exponentialMovingAverageArray} from 'binary-indicators/lib/exponentialMovingAverage';
// import {macdArray} from 'binary-indicators/lib/macd';
import {DateTime} from 'luxon';
import {mapState, mapGetters, mapActions} from 'vuex';
import {ticksToMilliseconds} from 'services/misc';
import {periods} from 'config';
import Icon from '../Icon';

export default {
  data() {
    return {
      chart: null,
      maxRenderedCandles: 0,
      periods: Object.keys(periods),
      types: [
        'line',
        'candlestick',
      ],
      technicalIndicators: {
        'MA': {
          name: 'MA',
          enabled: false,
          color: '#42B6F6',
        },
        'EMA': {
          name: 'EMA',
          enabled: false,
          color: 'orange',
        },
        // 'MACD': {
        //   name: 'MACD',
        //   enabled: false,
        //   color: 'pink',
        // },
      },
      currentChart: 'candlestick',
    };
  },
  computed: {
    ...mapState('trade', {
      startTicks: (state) => state.chart.data.startTicks,
      candleTicks: (state) => state.chart.data.candleTicks,
      candleSize: (state) => state.chart.data.candleSize,
      rawCandles: (state) => state.chart.data.candles,
    }),
    ...mapGetters('trade', {
      isCurrentPeriod: 'isCurrentPeriod',
    }),
    priceSeries() {
      if (this.rawCandles) {
        if (this.currentChart == 'candlestick') {
          return this.rawCandles.map((item) => [
            item[0], // open
            item[3], // close
            item[2], // low
            item[1], // high
          ]);
        } else {
          return this.rawCandles.map((item) => item[3]);
        }
      }
    },
    timeSeries(index) {
      return this.rawCandles.map((item, i) => {
        const msec = ticksToMilliseconds(this.startTicks + (this.candleTicks * i));
        const date = new Date(msec).toISOString();
        return DateTime.fromISO(date).toLocaleString({
          hour: '2-digit',
          minute: '2-digit',
        });
      });
    },
    volumeSeries() {
      return this.rawCandles.map((item) => {
        return item[4];
      });
    },
  },
  methods: {
    ...mapActions('trade', {
      loadChart: 'loadChart',
      changeChartPeriod: 'changeChartPeriod',
    }),
    setChartPeriod(period) {
      this.changeChartPeriod(period).then(() => {
        this.$hub.proxy.invoke('setCandleSize', this.candleSize);
        this.createChart();
      });
    },
    isCurrentChart(chart) {
      return this.currentChart === chart;
    },
    setChartType(type) {
      this.currentChart = type;
      this.chart.setOption({
        series: [
          {
            type: this.currentChart,
            data: this.priceSeries,
            barMinWidth: 6,
            itemStyle: {
              normal: {
                color: '#e55541',
                color0: '#00ce7d',
                borderColor: '#e55541',
                borderColor0: '#00ce7d',
              },
            },
          },
        ],
      });
    },
    createChart() {
      this.chart = echarts.init(document.querySelector('#chart'), '', {
        width: 'auto',
      });
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
          },
        },
        animation: false,
        grid: [
          {
            show: false,
            left: 64,
            right: 16,
            bottom: 32,
            top: 64,
            width: 'auto',
            height: 'auto',
            containLabel: false,
          },
          {
            show: false,
            left: 64,
            right: 16,
            bottom: 32,
            top: 64,
            width: 'auto',
            height: 'auto',
            containLabel: false,
          },
        ],
        xAxis: [
          {
            type: 'category',
            data: this.timeSeries,
            scale: true,
            axisLine: {
              lineStyle: {
                color: '#376691',
              },
            },
          },
          {
            gridIndex: 1,
            type: 'category',
            data: this.volumeSeries,
            silent: true,
            scale: true,
            axisLabel: {
              show: false,
            },
          },
        ],
        yAxis: [
          {
            scale: true,
            splitArea: {
              show: false,
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#194362',
                width: 2,
              },
            },
            axisLine: {
              lineStyle: {
                color: '#376691',
              },
            },
          },
          {
            scale: true,
            silent: true,
            gridIndex: 1,
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
          },
        ],
        dataZoom: [
          {
            type: 'inside',
            xAxisIndex: [0, 1],
            start: 85,
            end: 100,
            throttle: 25,
          },
          {
            type: 'inside',
            xAxisIndex: [0, 1],
            start: 85,
            end: 100,
            throttle: 25,
          },
        ],
        series: [
          {
            name: 'Price',
            type: this.currentChart,
            barMinWidth: 6,
            data: this.priceSeries,
            itemStyle: {
              normal: {
                color: '#e55541',
                color0: '#00ce7d',
                borderColor: '#e55541',
                borderColor0: '#00ce7d',
              },
            },
          },
          {
            name: 'MA',
            type: 'line',
            data: this.technical('MA'),
            itemStyle: {
              normal: {
                color: this.technicalIndicators['MA'].color,
                opacity: this.technicalIndicators['MA'].enabled,
              },
            },
            lineStyle: {
              normal: {
                color: this.technicalIndicators['MA'].color,
                opacity: this.technicalIndicators['MA'].enabled,
              },
            },
            zlevel: 1,
          },
          {
            name: 'EMA',
            type: 'line',
            data: this.technical('EMA'),
            itemStyle: {
              normal: {
                color: this.technicalIndicators['EMA'].color,
                opacity: this.technicalIndicators['EMA'].enabled,
              },
            },
            lineStyle: {
              normal: {
                color: this.technicalIndicators['EMA'].color,
                opacity: this.technicalIndicators['EMA'].enabled,
              },
            },
            zlevel: 1,
          },
          // {
          //   name: 'MACD',
          //   type: 'line',
          //   data: this.technical('MACD'),
          //   itemStyle: {
          //     normal: {
          //       color: this.technicalIndicators['MACD'].color,
          //       opacity: this.technicalIndicators['MACD'].enabled,
          //     },
          //   },
          //   lineStyle: {
          //     normal: {
          //       color: this.technicalIndicators['MACD'].color,
          //       opacity: this.technicalIndicators['MACD'].enabled,
          //     },
          //   },
          //   zlevel: 1,
          // },
          {
            name: 'Volume',
            type: 'bar',
            xAxisIndex: 1,
            yAxisIndex: 1,
            barMinWidth: 6,
            data: this.volumeSeries,
            itemStyle: {
              normal: {
                color: '#376691',
                opacity: 0.3,
              },
            },
          },
        ],
      });
    },
    technical(indicator) {
      const data = this.rawCandles.map((item) => item[3]);
      if (indicator == 'MA') {
        return Array(9).fill(0).concat(simpleMovingAverageArray(data, {periods: 10, pipSize: 6}));
      } else if (indicator == 'EMA') {
        return Array(9).fill(0).concat(exponentialMovingAverageArray(data, {periods: 10, pipSize: 6}));
      }
    },
    techClass(indicator) {
      return (this.technicalIndicators[indicator].enabled) ? 'chart__buttonTxt--activeBox' : '';
    },
    colorClass(indicator) {
      return (this.technicalIndicators[indicator].enabled) ? ('chart__buttonTxt--' + indicator) : '';
    },
    toggleIndicator(indicator) {
      this.technicalIndicators[indicator].enabled = !this.technicalIndicators[indicator].enabled;
      this.createChart();
    },
  },
  watch: {
    rawCandles() {
      this.technical('EMA');
      this.createChart();
    },
  },
  created() {
    this.loadChart().then(() => {
      this.createChart();
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
    // & > div {
    //   width: 100% !important;
    //   & > canvas {
    //     width: 100% !important;
    //   }
    // }
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
    padding: 0 5px;
    margin-right: 3px;
    &--active {
      color: $color_summersky;
    }
    &--activeBox {
      border-radius: 2px;
      color: #02334d;
      font-weight: bold;
    }
    &--MA {
      background-color: $color_summersky;
    }
    &--EMA {
      background-color: orange;
    }
    &--MACD {
      background-color: pink;
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
  &__technical{
    display: flex;
    align-items: center;
  }
  &__checkbox{
    margin-right: 5px;
  }
}
</style>
