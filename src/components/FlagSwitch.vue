<template lang="pug">
CommonSelect.flagSwitch(
  :options="flags",
  no-border,
  no-padding,
  :value="value",
  @input="setFlag"
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
      div.flagSwitch__optionText {{getOptionText(props.option)}}
      img.flagSwitch__optionImage(:src="flagPath(props.option)")
</template>

<script>
import Icon from 'components/Icon';
import CommonSelect from 'components/CommonSelect';
import {countryData, countryCurrencies, getCountryName, getCountryCurrency} from 'services/countries';

export default {
  computed: {
    isCurrency() {
      return this.type === 'currency';
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
    flagPath(flag = this.currentFlag) {
      return require('assets/images/flags/flag_' + flag + '.png');
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
    CommonSelect,
  },
};
</script>

<style lang='scss' scoped>
@import '~variables';
.flagSwitch {
  width: 80px;
  &__option {
    align-items: center;
    display: flex;
    flex-direction: row;
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
