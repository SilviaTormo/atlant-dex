<template lang="pug">
.pairInfo
  .pairInfo__arrowContainer(v-if="isMobile", :class="(this.visible) ? 'pairInfo__arrowContainer--visible' : ''", @click="visible = (visible ? false : true)")
    .pairInfo__circle
    .pairInfo__arrow
  .pairInfo__bg(v-if="isMobile", :class="(this.visible) ? 'pairInfo__bg--visible' : ''", @click="visible = (visible ? false : true)")
  .pairInfo__content(:class="(this.visible) ? 'pairInfo__content--visible' : ''")
    .pairInfo__title(v-if="isMobile", @click="visible = (visible ? false : true)", :class="(this.visible) ? 'pairInfo__title--visible' : ''") CURRENT PAIR INFO
    .pairInfo__container
      .pairInfo__label Last:
      .pairInfo__block
        .pairInfo__value.pairInfo__value--last {{getFixed(stat.last)}}
        Icon.pairInfo__triangle(id="triangle")
    .pairInfo__localContainer
      .pairInfo__container
        .pairInfo__label High:
        .pairInfo__block
          .pairInfo__value {{getFixed(stat.high)}}
          Icon.pairInfo__triangle(id="triangle", :class="(stat.highPersent  < 0) ? 'pairInfo__triangle--negative' : ''")
          .pairInfo__percent(:class="(stat.highPersent < 0) ? 'pairInfo__percent--negative' : ''") %{{getFixed((stat.highPersent < 0) ? -stat.highPersent : stat.highPersent)}}
      .pairInfo__line(v-if="isMobile")
      .pairInfo__container
        .pairInfo__label Low:
        .pairInfo__block
          .pairInfo__value {{getFixed(stat.low)}}
          Icon.pairInfo__triangle(id="triangle", :class="(stat.lowPercent  < 0) ? 'pairInfo__triangle--negative' : ''")
          .pairInfo__percent(:class="(stat.lowPercent < 0) ? 'pairInfo__percent--negative' : ''") %{{getFixed((stat.lowPercent < 0) ? -stat.lowPercent : stat.lowPercent)}}
    .pairInfo__container
      .pairInfo__label Volume:
      .pairInfo__volume ${{addSpacesForNumbers(getFixed(stat.volume))}}
</template>

<script>
import {mapGetters} from 'vuex';
import Icon from './Icon';

export default {
  data() {
    return {
      stat: {
        last: 466.35,
        high: 474.71,
        highPersent: 4.60,
        low: 461.02,
        lowPercent: -1.73,
        volume: 1247880.00,
      },
      visible: false,
    };
  },
  computed: {
    ...mapGetters('misc', {
      isMobile: 'isMobile',
    }),
  },
  methods: {
    getFixed(number) {
      return number.toFixed(2);
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
@import '~sass/bootstrap/media';
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

@include media-breakpoint-down(md) {
  .pairInfo {
    &__content {
      background-image: repeating-linear-gradient(
        135deg,
        #103c55,
        #103c55 25px,
        #03324c 0,
        #03324c 60px
      );
      padding: 24px 0;
      align-items: center;
      flex-direction: column;
      position: fixed;
      left: 55px;
      right: 0;
      bottom: -260px;
      transition: bottom .5s;
      &--visible {
        transition: bottom .5s;
        bottom: 0px;
      }
    }
    &__arrowContainer {
      position: fixed;
      bottom: 0px;
      left: calc(50vw + 8px);
      z-index: 2;
      transform: rotate(180deg);
      transition: all 0.5s;
      &--visible {
        transform: rotate(0deg);
        transition: all 0.5s;
        bottom: 340px;
      }
    }
    &__circle {
      border-radius: 50%;
      width: 32px;
      height: 32px;
      background: #ffffff;
      position: relative;
    }
    &__arrow {
      position: absolute;
      border-left: 2px solid #03354f;
      border-bottom: 2px solid #03354f;
      width: 10px;
      height: 10px;
      top: calc(50% - 7.5px);
      left: calc(50% - 5px);
      transform: rotate(-45deg);
    }
    &__bg {
      z-index: 1;
      position: fixed;
      top: 100%;
      left: 0;
      right: 0;
      bottom: 0;
      background: #000000;
      opacity: 0;
      transition: opacity 0.9s;
      &--visible {
        transition: opacity 0.9s;
        top: 0;
        opacity: 0.8;
      }
    }
    &__title{
      font-size: 14px;
      font-weight: 900;
      text-transform: uppercase;
      margin-bottom: 34px;
      color: #ffc600;
      transition: color .5s;
      &--visible {
        transition: color .5s;
        color: #ffffff;
      }
    }
    &__container {
      flex-direction: column;
      align-items: center;
      margin: 15px 0;
    }
    &__localContainer {
      flex-direction: row;
      justify-content: space-around;
      align-items: flex-end;
    }
    &__label {
      margin-bottom: 12px;
    }
    &__line {
      width: 1px;
      height: 24px;
      background: #ffffff;
      margin-bottom: 13px;
    }
  }
}
</style>
