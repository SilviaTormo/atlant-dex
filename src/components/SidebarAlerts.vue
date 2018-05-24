<template lang="pug">
.alerts
  .alerts__item.alerts__item--header
    .alerts__headerLine
      .alerts__header Alerts:
      Dropdown.alerts__headerDropdown(
        :options="criteria",
        v-model="selected",
        no-border,
        no-padding,
        preselect-first,
      )
  .alerts__item
    SidebarAlertsItem(currency='btc', level="12%", dropped)
  .alerts__item
    SidebarAlertsItem(currency='zec', level="$364.75")
  .alerts__addAllerts(:class="(showSidebar) ? '' : 'alerts__addAllerts--hidden'")
    Icon(id="alert").alerts__addAllertsIcon
    | ADD NEW ALERT
</template>

<script>
import {mapState} from 'vuex';
import Icon from './Icon';
import Dropdown from './Dropdown';
import SidebarAlertsItem from './SidebarAlertsItem';

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
    Dropdown,
    SidebarAlertsItem,
  },
};

</script>

<style lang='scss' scoped>
@import 'variables';

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
    z-index: 1;
  }
  &__addAllertsIcon {
    fill: #E9BD24;
    margin-right: 13px;
  }
}
</style>
