<template lang="pug">
div.flagSwitch(@click.stop="toggleList()")
  div.flagSwitch__text(v-if="type == 'currency'") {{getCountryCurrency(currentFlag)}}
  img.flagSwitch__flag(:src="flagPath(currentFlag)")
  Icon.flagSwitch__triangle(id="triangle2")
  Tooltip.flagSwitch__tooltip(v-show="isOpened", :bottom="isMobile", :middle="true", v-scrollbar="")
    ul.flagSwitch__list
      li.flagSwitch__item(v-for="flag in flags" @click="setFlag(flag)")
        div.flagSwitch__container
          img.flagSwitch__flag(:src="flagPath(flag)")
          div.flagSwitch__label {{(type == 'currency') ? getCountryCurrency(flag) : getCountryName(flag)}}
</template>

<script>
import Tooltip from 'components/Tooltip';
import Icon from 'components/Icon';
import {scrollbar} from 'directives';
import {mapGetters} from 'vuex';
import {countryNames, countryCurrencies, getCountryName, getCountryCurrency} from 'services/countries';

export default {
  data() {
    return {
      isOpened: false,
      currentFlag: '',
      flags: [],
    };
  },
  model: {
    event: 'change',
  },
  computed: {
    ...mapGetters('misc', {
      isMobile: 'isMobile',
    }),
  },
  methods: {
    setFlag(flag) {
      this.currentFlag = flag;
      this.$emit('change', flag);
    },
    toggleList(event) {
      this.isOpened = !this.isOpened;
      const outClick = (e) => {
        if (e.target.classList[0] !== 'flagSwitch') {
          this.isOpened = false;
        }
        document.removeEventListener('click', outClick);
      };
      document.removeEventListener('click', outClick);
      document.addEventListener('click', outClick);
    },
    getCountryName(code) {
      return getCountryName(code);
    },
    getCountryCurrency(code) {
      return getCountryCurrency(code);
    },
    flagPath(flag = this.currentFlag) {
      return require('assets/images/flags/flag_' + flag + '.png');
    },
  },
  watch: {
    value() {
      this.currentFlag = this.value;
    },
  },
  created() {
    this.currentFlag = this.value;
    this.flags = (this.type == 'currency') ? Object.keys(countryCurrencies) : Object.keys(countryNames);
  },
  props: {
    value: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: false,
      default: 'country',
    },
  },
  directives: {
    scrollbar,
  },
  components: {
    Tooltip,
    Icon,
  },
};
</script>

<style lang='scss'>
@import '~variables';
.flagSwitch {
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  fill: #fff;
  &__tooltip {
    left: -38px;
    top: calc(100% + 14px);
    min-width: 160px;
    padding: 0;
    z-index: 1;
    max-height: 200px;
  }
  &__item {
    color: #aaaaaa;
    font-size: 14px;
    font-weight: 700;
    &:hover {
      color: #000;
    }
    &:not(:last-of-type) {
      &::after {
        content: '';
        display: block;
        width: 90%;
        height: 1px;
        margin-left: auto;
        margin-right: auto;
        background-color: #d1d9da
      }
    }
  }
  &__container {
    display: flex;
    align-items: center;
    padding: 5px 10px;
  }
  &__label {
    color: inherit;
    text-transform: none;
    margin-left: 5px;
  }
  &__flag {
    // margin-right: 9px;
    height: 24px;
    width: 24px;
  }
  &__text {
    text-transform: uppercase;
    color: #fff;
    margin-right: 10px;
  }
  &__triangle {
    width: 8px;
    height: 5px;
    fill: #fff;
    position: absolute;
    right: 0;
    pointer-events: none;
  }
}
</style>
