<template lang="pug">
.alerts
  .alerts__item.alerts__item--header
    .alerts__headerLine
      .alerts__header Alerts:
      CommonSelect.alerts__headerDropdown(
        :options="criteria",
        v-model="selected",
        no-border,
        no-padding,
        preselect-first,
      )
  .alerts__item
    AlertItem(currency='btc', level="12%", dropped)
  .alerts__item
    AlertItem(currency='zec', level="$364.75")
  .alerts__addAllerts(:class="(showSidebar) ? '' : 'alerts__addAllerts--hidden'")
    Icon(id="alert").alerts__addAllertsIcon
    | ADD NEW ALERT
</template>

<script>
import {mapState} from 'vuex';
import Icon from './Icon';
import CommonSelect from './CommonSelect';
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
    ...mapState('misc', {
      showSidebar: 'showSidebar',
    }),
  },
  methods: {
    openCur(cur) {
      this.selectedCur = cur;
    },
  },
  components: {
    Icon,
    CommonSelect,
    AlertItem,
  },
};

</script>

<style lang='scss' scoped>
@import '~variables';
@import '~sass/bootstrap/media';

.alerts {
  position: relative;
  &:after {
    display: block;
    content: '';
    height: 1px;
    border-top: 1px solid #00334C;
  }
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
    border-top: 1px solid #00334C;
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
    width: 100px;
    font-size: 12px;
    text-transform: none;
  }
  &__addAllerts {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    width: 280px;
    height: 52px;
    bottom: 0;
    font-size: 14px;
    font-weight: 700;
    background: repeating-linear-gradient(135deg,#103c55,#103c55 25px,#03324c 0,#03324c 60px);
  }
  &__addAllertsIcon {
    fill: #E9BD24;
    margin-right: 13px;
  }
}
@include media-breakpoint-down(md) {
  .alerts {
    &__addAllerts {
      width: calc(100% - 55px);
      left: 0;
      transition: left .1s linear;
      &--hidden {
        transition: left .1s linear;
        left: -100%;

      }
    }
  }
}
</style>
