<template lang="pug">
.tableHeader
  BackToPreviousPage.tableHeader__backTo
  // BackToDashboard.tableHeader__backTo
  .tableHeader__container(v-show="isTradeTables")
    .tableHeader__title(@click="getOpenPage('transactionHistory')", :class="(isThisPage('transactionHistory')) ? 'tableHeader__title--active' : ''") Transaction History
    .tableHeader__title(@click="getOpenPage('myOrders')", :class="(isThisPage('myOrders')) ? 'tableHeader__title--active' : ''") My Orders
      Dropdown.tableHeader__dropdown(
        v-if="isThisPage('myOrders')",
        :options="sortTypes",
        v-model="sortTypeForMyOrders",
        no-border,
        no-paddding,
        preselect-first,
      )
  .tableHeader__container(v-show="isNotifications")
    .tableHeader__title(:class="(isThisPage('notificationHistory')) ? 'tableHeader__title--active' : ''") Notification History
</template>

<script>
import {mapState, mapMutations} from 'vuex';
import Dropdown from '../../Dropdown';
import BackToDashboard from '../BackToDashboard';
import BackToPreviousPage from './BackToPreviousPage';

export default {
  data() {
    return {
      sortTypeForMyOrders: '',
      sortTypes: [
        'All Orders',
        'Open',
        'Partially filled',
        'Filled',
        'Cancelled',
      ],
    };
  },
  computed: {
    ...mapState('page', {
      name: 'name',
    }),
    typeOfNewStatus() {
      switch (this.sortTypeForMyOrders) {
        case 'Open': return 0;
        case 'Partially filled': return 1;
        case 'Filled': return 2;
        case 'Cancelled': return 3;
        default: return '';
      };
    },
    isTradeTables() {
      return this.name === 'transactionHistory' || this.name === 'myOrders';
    },
    isNotifications() {
      return this.name === 'notificationHistory';
    },
  },
  methods: {
    ...mapMutations('page', {
      openPage: 'open',
    }),
    ...mapMutations('trade', {
      setOrderFilter: 'setOrderFilter',
    }),
    getOpenPage(pageName) {
      this.openPage({
        name: pageName,
      });
    },
    isThisPage(pageName) {
      return pageName == this.name;
    },
  },
  watch: {
    sortTypeForMyOrders() {
      this.setOrderFilter(this.typeOfNewStatus);
    },
  },
  props: {
    title: {
      type: String,
      default: '',
      required: false,
    },
  },
  components: {
    BackToDashboard,
    BackToPreviousPage,
    Dropdown,
  },
};
</script>

<style lang="scss" scoped>
@import 'variables';

.tableHeader {
  display: flex;
  padding: 0 36px;
  min-height: 73px;
  border-top: 1px solid $color_tangaroa;
  &__backTo {
    padding-right: 43px;
  }
  &__container {
    display: flex;
  }
  &__title {
    display: flex;
    align-items: center;
    font-weight: 700;
    text-transform: uppercase;
    padding: 0 43px;
    vertical-align: baseline;
    white-space: nowrap;
    &--active {
      color: $color_turquoise--light;
      font-size: 16px;
      font-weight: 700;
      border-left: 1px solid $color_tangaroa;
      border-right: 1px solid $color_tangaroa;
      border-bottom: 1px solid $color_blue;
      margin-bottom: -1px;
      z-index: 1;
    }
  }
  &__dropdown {
    color: $color_white;
    margin-left: 10px;
    font-size: 12px;
    font-weight: 700;
    min-width: 120px;
    text-transform: none;
  }
}
</style>
