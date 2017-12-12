<template lang="pug">
.alerts
  .alerts__item.alerts__item--header
    .alerts__headerLine
      .alerts__header Alerts:
      Dropdown.alerts__headerDropdown(:options="criteria" v-model="selected")
  .alerts__item
    AlertItem(currency='btc', level="12%", dropped)
  .alerts__item
    AlertItem(currency='zec', level="$364.75")
</template>

<script>
import Icon from './Icon';
import Dropdown from './Dropdown';
import AlertItem from './AlertItem';

export default {
  data() {
    return {
      selected: '',
      selectedCur: 'btc',
      percChng: 2.73,
      criteria: [
        'Price target',
        'Volume target',
      ],
    };
  },
  computed: {
  },
  methods: {
    openCur(cur) {
      this.selectedCur = cur;
    },
  },
  components: {
    Icon,
    Dropdown,
    AlertItem,
  },
};

</script>

<style lang='scss'>
@import '~variables';
@import '~sass/bootstrap/media';

.alerts {
  &__icon {
    $size: 14px;
    height: $size;
    width: $size;
    fill: #fff;
    &:hover{
      pointer: cursor;
    }
  }
  &__item {
    padding: 32px 18px 32px 25px;
    border-bottom: 1px solid #032537;
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
  &__headerDropdown {
    width: 90px;
    font-size: 12px;
  }
}
</style>
