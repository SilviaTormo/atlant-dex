<template lang="pug">
.pairInfo
  .pairInfo__content(:class="(this.visible) ? 'pairInfo__content--visible' : ''", @click="visible = (visible ? false : true)")
    .pairInfo__container
      .pairInfo__label Last:
      .pairInfo__block
        .pairInfo__value.pairInfo__value--last {{getFixed(last)}}
        Icon.pairInfo__triangle(id="triangle", :class="(change  < 0) ? 'pairInfo__triangle--negative' : ''")
        .pairInfo__percent(:class="(change < 0) ? 'pairInfo__percent--negative' : ''") %{{getFixed(((change < 0) ? -change : change), 2)}}
    .pairInfo__localContainer
      .pairInfo__container
        .pairInfo__label High:
        .pairInfo__block
          .pairInfo__value {{getFixed(high)}}
          Icon.pairInfo__triangle(id="triangle", :class="(highChange  < 0) ? 'pairInfo__triangle--negative' : ''")
          .pairInfo__percent(:class="(highChange < 0) ? 'pairInfo__percent--negative' : ''") %{{getFixed(((highChange < 0) ? -highChange : highChange), 2)}}
      .pairInfo__container
        .pairInfo__label Low:
        .pairInfo__block
          .pairInfo__value {{getFixed(low)}}
          Icon.pairInfo__triangle(id="triangle", :class="(lowChange  < 0) ? 'pairInfo__triangle--negative' : ''")
          .pairInfo__percent(:class="(lowChange < 0) ? 'pairInfo__percent--negative' : ''") %{{getFixed(((lowChange < 0) ? -lowChange : lowChange), 2)}}
    .pairInfo__container
      .pairInfo__label Volume:
      .pairInfo__volume ${{addSpacesForNumbers(getFixed(volume, 2))}}
</template>

<script>
import {mapState} from 'vuex';
import Icon from './Icon';

export default {
  data() {
    return {
      visible: false,
    };
  },
  computed: {
    ...mapState('trade', {
      last: (state) => state.pairInfo.last,
      high: (state) => state.pairInfo.high,
      highChange: (state) => state.pairInfo.highChange,
      low: (state) => state.pairInfo.low,
      lowChange: (state) => state.pairInfo.lowChange,
      volume: (state) => state.pairInfo.volume,
      change: (state) => state.pairInfo.change,
      bid: (state) => state.pairInfo.ask,
      ask: (state) => state.pairInfo.bid,
    }),
  },
  methods: {
    getFixed(number, fixTo = 4) {
      return number.toFixed(fixTo);
    },
    addSpacesForNumbers(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    },
  },
  components: {
    Icon,
  },
};
</script>

<style lang="scss" scoped>
@import "~variables";
.pairInfo {
  &__content {
    z-index: 2;
    display: flex;
    align-items: baseline;
    margin-top: -5px;
    white-space: nowrap;
  }
  &__container {
    display: flex;
    align-items: flex-end;
    margin: 0 13px;
  }
  &__localContainer {
    display: flex;
    width: 100%;
  }
  &__label {
    margin-right: 10px;
  }
  &__value {
    font-size: 18px;
    line-height: 100%;
    &--last {
      color: #31edd7;
    }
  }
  &__triangle {
    fill: #7ed321;
    transform: rotate(180deg);
    width: 7px;
    height: 6px;
    margin: 3px 7px;
    &--negative {
      fill: #f33a3a;
      transform: rotate(0deg);
    }
  }
  &__percent {
    font-size: 14px;
    line-height: 14px;
    font-weight: 700;
    color: #7ed321;
    &--negative {
      color: #f33a3a;
    }
  }
  &__block {
    display: flex;
    align-items: flex-end;
  }
}
</style>
