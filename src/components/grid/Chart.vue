<template lang='pug'>
.chart
  .chart__header
    .chart__buttons
      .chart__buttonTxt(v-for="period in periods", :class="{'chart__buttonTxt--active' : isCurrentPeriod(period)}", @click="setChartPeriod(period)") {{period}}
    .chart__technical
      .chart__buttonTxt(v-for="tech in technicalIndicators", :class="[techClass(tech.name), colorClass(tech.name)]", @click="toggleIndicator(tech.name)") {{tech.name}}
    .chart__buttons
      Icon.chart__buttonIcon(:id="type + 'Chart'" v-for="type in types", :key="type", :class="{'chart__buttonIcon--active' : isCurrentChart(type)}", @click="setChartType(type)")
  IEcharts(:option="chart", :loading="false", :resizable="true")#chart
</template>

<script>
import IEcharts from 'vue-echarts-v3/src/lite.js';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
// import 'echarts/lib/chart/pie';
// import 'echarts/lib/chart/scatter';
// import 'echarts/lib/chart/radar';
// import 'echarts/lib/chart/map';
// import 'echarts/lib/chart/treemap';
// import 'echarts/lib/chart/graph';
// import 'echarts/lib/chart/gauge';
// import 'echarts/lib/chart/funnel';
// import 'echarts/lib/chart/parallel';
// import 'echarts/lib/chart/sankey';
// import 'echarts/lib/chart/boxplot';
import 'echarts/lib/chart/candlestick';
// import 'echarts/lib/chart/effectScatter';
import 'echarts/lib/chart/lines';
// import 'echarts/lib/chart/heatmap';
// import 'echarts/lib/component/graphic';
// import 'echarts/lib/component/grid';
// import 'echarts/lib/component/legend';
import 'echarts/lib/component/tooltip';
// import 'echarts/lib/component/polar';
// import 'echarts/lib/component/geo';
// import 'echarts/lib/component/parallel';
// import 'echarts/lib/component/singleAxis';
// import 'echarts/lib/component/brush';
// import 'echarts/lib/component/title';
import 'echarts/lib/component/dataZoom';
// import 'echarts/lib/component/visualMap';
// import 'echarts/lib/component/markPoint';
// import 'echarts/lib/component/markLine';
// import 'echarts/lib/component/markArea';
// import 'echarts/lib/component/timeline';
// import 'echarts/lib/component/toolbox';
// import 'zrender/lib/vml/vml';
// import {simpleMovingAverageArray} from 'binary-indicators/lib/simpleMovingAverage';
// import {exponentialMovingAverageArray} from 'binary-indicators/lib/exponentialMovingAverage';
// import {macdArray} from 'binary-indicators/lib/macd';
import {DateTime} from 'luxon';
import {mapState, mapGetters, mapActions} from 'vuex';
import {periods} from 'config';
import Icon from '../Icon';

export default {
  data() {
    return {
      chart: {},
      maxRenderedCandles: 0,
      periods: Object.keys(periods),
      types: [
        'line',
        'candlestick',
      ],
      technicalIndicators: {
        'MA10': {
          name: 'MA10',
          enabled: false,
          color: '#42B6F6',
        },
        'EMA10': {
          name: 'EMA10',
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
      // startTicks: (state) => state.chart.data.startTicks,
      // candleTicks: (state) => state.chart.data.candleTicks,
      // candleSize: (state) => state.chart.data.candleSize,
      rawCandles: (state) => state.chart.data.candles,
    }),
    ...mapGetters('trade', [
      'isCurrentPeriod',
      'baseCurrency',
      'quoteCurrency',
      'candlePeriodInMs',
      'candlePeriod',
      'lastCandleOpenTime',
      'lastCandle',
    ]),
    priceSeries() {
      if (this.rawCandles) {
        if (this.currentChart == 'candlestick') {
          return this.rawCandles.map(
              ({open, close, low, high}) => [open, close, low, high]
          );
            // item[0], // open
            // item[3], // close
            // item[2], // low
            // item[1], // high
        } else {
          return this.rawCandles.map((item) => item.close);
        }
      }
    },
    timeSeries(index) {
      return this.rawCandles.map((item, i) => {
        const date = DateTime.fromISO(item.candleOpen);
        if (this.candlePeriodInMs <= 300000) {
          return date.toLocaleString({hour: '2-digit', minute: '2-digit'});
        } else {
          return date.toLocaleString();
        }
      });
    },
    volumeSeries() {
      return this.rawCandles.map(({volume}) => volume);
    },
    setStartDataZoomOfChart() {
      let containerWidth = document.getElementById('chart').clientWidth;
      let howManyCandlesInTheScreen = containerWidth / 10;
      let result = 100 - (howManyCandlesInTheScreen * 100 / this.timeSeries.length);
      return result;
    },
  },
  methods: {
    ...mapActions('trade', {
      loadChart: 'loadChart',
      changeChartPeriod: 'changeChartPeriod',
    }),
    ...mapActions('trade', [
      'addNewCandle',
      'addBundleEmptyCandles',
    ]),
    setChartPeriod(period) {
      this.changeChartPeriod(period).then(() => {
        // this.$hub.proxy.invoke('setCandleSize', this.candleSize);
        this.createChart();
      });
    },
    isCurrentChart(chart) {
      return this.currentChart === chart;
    },
    setChartType(type) {
      this.currentChart = type;
      this.chart = ({
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
      this.chart = {
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
            left: 0,
            right: 70,
            bottom: 32,
            top: 64,
            width: 'auto',
            height: 'auto',
            containLabel: false,
          },
          {
            show: false,
            left: 0,
            right: 70,
            bottom: 32,
            top: '70%',
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
            show: false,
            gridIndex: 1,
            type: 'category',
            data: this.volumeSeries,
            scale: false,
            boundaryGap: true, // don't touch this!
            axisTick: {show: false},
            splitLine: {show: false},
            axisLabel: {show: false},
            axisLine: {
              lineStyle: {
                color: '#376691',
              },
            },
          },
        ],
        yAxis: [
          {
            scale: true,
            position: 'right',
            offset: false,
            width: 100,
            splitArea: {
              show: false,
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#194362',
                width: 1,
              },
            },
            axisLabel: {
              show: true,
              color: '#376691',
              verticalAlign: 'middle',
            },
            axisLine: {
              show: false,
            },
          },
          {
            scale: false,
            gridIndex: 1,
            splitNumber: 5,
            axisLabel: {show: false},
            axisLine: {show: false},
            axisTick: {show: false},
            splitLine: {show: false},
          },
        ],
        dataZoom: [
          {
            type: 'inside',
            xAxisIndex: [0, 1],
            start: this.setStartDataZoomOfChart,
            end: 100,
            throttle: false,
          },
          {
            type: 'inside',
            xAxisIndex: [0, 1],
            start: this.setStartDataZoomOfChart,
            end: 100,
            throttle: false,
          },
        ],
        animation: false,
        series: [
          {
            name: 'Price',
            type: this.currentChart,
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
            name: 'MA10',
            type: 'line',
            data: this.calculateMA(10),
            itemStyle: {
              normal: {
                color: this.technicalIndicators['MA10'].color,
                opacity: this.technicalIndicators['MA10'].enabled,
              },
            },
            lineStyle: {
              normal: {
                color: this.technicalIndicators['MA10'].color,
                opacity: this.technicalIndicators['MA10'].enabled,
              },
            },
            zlevel: 1,
          },
          {
            name: 'EMA10',
            type: 'line',
            data: this.calculateEMA(10),
            itemStyle: {
              normal: {
                color: this.technicalIndicators['EMA10'].color,
                opacity: this.technicalIndicators['EMA10'].enabled,
              },
            },
            lineStyle: {
              normal: {
                color: this.technicalIndicators['EMA10'].color,
                opacity: this.technicalIndicators['EMA10'].enabled,
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
            data: this.volumeSeries,
            itemStyle: {
              normal: {
                color: '#376691',
                opacity: 0.3,
              },
            },
          },
        ],
      };
    },
    calculateMA(count = 10) {
      let result = [];

      for (let i = 0, len = this.rawCandles.length; i < len; i++) {
        if (i < count) {
            result.push('');
            continue;
        };
        let sum = 0;
        for (let j = 0; j < count; j++) {
            sum += this.rawCandles[i - j].high;
        };
        result.push(sum / count);
      }
      // console.table(result);
      return result;
    },
    calculateEMA(count = 10) {
      if (!this.rawCandles.length) return 0;
      let result = [];
      let k = 2/(count + 1);

      result = [this.rawCandles[0].high];
      for (let i = 1; i < this.rawCandles.length; i++) {
        result.push(this.rawCandles[i].high * k + result[i - 1] * (1 - k));
      };
      return result;
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
    onSendSignal({payload, metadata}) {
      // {x
      //   baseCurrency: 'BTC',
      //   candleOpen:'2018-04-03T11:38:03.4288665';
      //   close:0;
      //   high:0;
      //   low:0;
      //   open:0;
      //   period:'00:15:00';
      //   quoteCurrency:'ATL';
      //   volume:0;
      // }
      if (
          metadata
          && metadata.type === 'candle'
          && payload.baseCurrency === this.baseCurrency
          && payload.quoteCurrency === this.quoteCurrency
          && payload.period === this.candlePeriod
      ) {
        this.addNewCandle(payload);
        // this.setEmptyCandleHandler();
      }
    },
    getEmptyCandle(lastCandle = this.lastCandle) {
      const {close} = lastCandle;
      const lastCandleOpenTime = (lastCandle === this.lastCandle) ?
          this.lastCandleOpenTime
          : new Date(lastCandle.candleOpen).getTime();

      return Object.assign({}, lastCandle, {
        high: close,
        low: close,
        open: close,
        volume: 0,
        candleOpen: new Date(lastCandleOpenTime + this.candlePeriodInMs).toISOString(),
      });
    },
    addBundleOfEmptyCandles(candleNumber) {
      const newCandles = [];
      let baseCandle = this.lastCandle;
      for (let i = 0; i < candleNumber; i++) {
        baseCandle = this.getEmptyCandle(baseCandle);
        newCandles.push(baseCandle);
      }
      this.addBundleEmptyCandles(newCandles);
    },
    addEmptyCandle() {
      const emptyCandle = this.getEmptyCandle();
      this.addNewCandle(emptyCandle);
    },
    setEmptyCandleHandler() {
      clearTimeout(this._emptyCandleTimeoutId);
      const pastTime = new Date().getTime() - this.lastCandleOpenTime;
      const timeout = this.candlePeriodInMs - pastTime;
      // If timeout is negative, means there is at least one candle which need to be added immediately
      if (timeout < 0) {
        const numberOfEmptyCandles = Math.floor(pastTime / this.candlePeriodInMs);
        this.addBundleOfEmptyCandles(numberOfEmptyCandles);
      } else {
        this._emptyCandleTimeoutId = setTimeout(this.addEmptyCandle, timeout);
      }
    },
  },
  watch: {
    rawCandles() {
      this.calculateMA(10);
      this.calculateEMA(10);
      this.createChart();
      this.setEmptyCandleHandler();
    },
  },
  created() {
    this.loadChart().then(() => {
      this.createChart();
    });
    this.$hub.on('Send', this.onSendSignal);
  },
  components: {
    Icon,
    IEcharts,
  },
};

</script>

<style lang='scss'>
@import "~variables";
.chart {
  $buttonColor: desaturate(lighten($color_summersky, 6), 68);
  position: relative;
  height: 100%;
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
    &--MA10 {
      background-color: $color_summersky;
    }
    &--EMA10 {
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
