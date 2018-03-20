<template lang="pug">
.tableHeader
  BackToDashboard.tableHeader__backToDashboard
  .tableHeader__title(v-if="!isMobile" @click="getOpenPage('transactionHistory')", :class="(isThisPage('transactionHistory')) ? 'tableHeader__title--active' : ''") Transaction History
  .tableHeader__title(v-if="!isMobile" @click="getOpenPage('myOrders')", :class="(isThisPage('myOrders')) ? 'tableHeader__title--active' : ''") My Orders
    Dropdown.tableHeader__dropdown(v-if="isThisPage('myOrders')", :options="sortTypes" v-model="sortTypeForMyOrders")
</template>

<script>
import {mapState, mapGetters, mapMutations} from 'vuex';
import BackToDashboard from '../BackToDashboard';
import Dropdown from '../../Dropdown';

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
    ...mapGetters('misc', {
      isMobile: 'isMobile',
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
    Dropdown,
    BackToDashboard,
  },
};
</script>

<style lang="scss">
@import '~variables';
@import "~sass/bootstrap/media";

.tableHeader {
  display: flex;
  padding: 0 36px;
  min-height: 73px;
  border-top: 1px solid $color_tangaroa;
  &__backToDashboard {
    padding-right: 43px;
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
      color: #31edd7;
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
    margin-left: 24px;
    padding-right: 20px;
    color: #ffffff;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
  }
}

@include media-breakpoint-down(md) {
  .tableHeader {
    position: fixed;
    display: flex;
    justify-content: center;
    align-content: center;
    min-height: 52px;
    height: 52px;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0;
    padding-left: 30px;
    background: repeating-linear-gradient(
      135deg,
      #103c55,
      #103c55 25px,
      #03324c 0,
      #03324c 60px
    );
    z-index: 1.5;
    &__backToDashboard {
      padding-right: 0;
    }
  }
}
</style>
