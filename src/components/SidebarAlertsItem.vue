<template lang='pug'>
.alert
  .alert__main
    .alert__currency
      Icon.alert__currencyIcon(:id="'cur_'+ currency")
      .alert__currencyName {{currency}}
    Icon.alert__icon.alert__icon--alert(id="alert-inactive")
    .alert__date 11.10 / 21:37
  .alert__textContainer
    .alert__text Target price for #[span.alert__textCurrency {{fullCurrencyName()}}] {{targetText}} #[span.alert__textTarget {{level}}] ...
    Icon.alert__removeIcon(id="remove")
</template>

<script>
import {getCryptoName} from '@/services/misc';
import Icon from './Icon';

export default {
  data() {
    return {
    };
  },
  computed: {
    targetText() {
      return (this.dropped) ? 'has dropped to/below' : 'has reached the value of';
    },
  },
  methods: {
    fullCurrencyName() {
      const name = this.currency.toUpperCase();
      return getCryptoName(name);
    },
  },
  props: {
    currency: {
      type: String,
      required: true,
    },
    dropped: {
      type: Boolean,
      default: false,
      required: false,
    },
    level: {
      type: [String, Number],
      required: true,
    },
  },
  components: {
    Icon,
  },
};

</script>

<style lang="scss">
@import 'variables';

.alert {
  &__main {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 17px;
  }
  &__currency{
    display: flex;
    align-items: center;
  }
  &__currencyIcon {
    $size: 25px;
    width: $size;
    height: $size;
    margin-right: 13px;
  }
  &__currencyName {
    font-size: 12px;
    font-weight: bold;
    margin-right: 5px;
    text-transform: uppercase;
  }
  &__icon{
    $size: 12px;
    width: $size;
    height: $size;
    &--alert {
      fill: #044669;
    }
  }
  &__date{
    font-size: 11px;
    color: #5b87a0;
  }
  &__textContainer{
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
  &__text{
    line-height: 19px;
  }
  &__textCurrency{
    color: #6ece1a;
    text-transform: capitalize;
    &:hover{
      cursor: pointer;
    }
  }
  &__textTarget {
    color: #febc09;
  }
  &__removeIcon {
    transform: rotate(45deg);
    $size: 14px;
    width: $size;
    height: $size;
    &:hover {
      cursor: pointer;
    }
    margin-top: 2px;
    margin-left: 32px;
  }
}
</style>
