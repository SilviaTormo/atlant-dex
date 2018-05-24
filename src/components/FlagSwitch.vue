<template lang="pug">
Dropdown.flagSwitch(
  :class="{'flagSwitch--phone': isPhone}",
  :options="flags",
  no-border,
  no-padding,
  :value="value",
  @input="setFlag",
  v-bind="$attrs",
)
  template(
    slot="option",
    slot-scope="props",
  )
    .flagSwitch__option
      img.flagSwitch__optionImage(:src="flagPath(props.option)")
      div.flagSwitch__optionText {{getOptionText(props.option)}}
  template(
    slot="singleLabel",
    slot-scope="props",
  )
    .flagSwitch__option
      div.flagSwitch__optionText.flagSwitch__optionText--singleLabel {{getSingleLabelText(props.option)}}
      img.flagSwitch__optionImage(:src="flagPath(props.option)")
</template>

<script>
import Icon from '@/components/Icon';
import Dropdown from '@/components/Dropdown';
import {
  countryData,
  countryCurrencies,
  getCountryName,
  getCountryCurrency,
  getCountryCode,
} from '@/services/countries';

export default {
  computed: {
    isCurrency() {
      return this.type === 'currency';
    },
    isPhone() {
      return this.type === 'phone';
    },
    flags() {
      return this.isCurrency ? Object.keys(countryCurrencies) : Object.keys(countryData);
    },
  },
  methods: {
    setFlag(flag) {
      this.$emit('input', flag);
    },
    getOptionText(option) {
      return this.isCurrency ? getCountryCurrency(option) : getCountryName(option);
    },
    getSingleLabelText(option) {
      if (this.isCurrency) {
        return getCountryCurrency(option);
      } else if (this.isPhone) {
        return getCountryCode(option);
      } else {
        return getCountryName(option);
      }
    },
    flagPath(flag = this.currentFlag) {
      return require('@/assets/images/flags/flag_' + flag + '.png');
    },
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
  components: {
    Icon,
    Dropdown,
  },
};
</script>

<style lang='scss' scoped>
@import 'variables';
.flagSwitch {
  width: 80px;

  &--phone & {
    &__optionText--singleLabel {
      min-width: 33px;
      text-align: left;
    }
  }
  &__option {
    align-items: center;
    display: flex;
    flex-direction: row;
    width: 165px;
    width: max-content;
  }
  &__optionImage {
    height: 24px;
    width: 24px;
  }

  &__optionImage + &__optionText,
  &__optionText + &__optionImage {
    margin-left: 5px;
  }
}
</style>
