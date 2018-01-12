<template lang="pug">
.tableHeader
  BackToDashboard.tableHeader__backToDashboard
  .tableHeader__title(v-if="!isMobile" @click="getOpenPage('transactionHistory')", :class="(isThisPage('transactionHistory')) ? 'tableHeader__title--active' : ''") Transaction History
  .tableHeader__title(v-if="!isMobile" @click="getOpenPage('myOrders')", :class="(isThisPage('myOrders')) ? 'tableHeader__title--active' : ''") My Orders
    Dropdown.tableHeader__dropdown(v-if="isThisPage('myOrders')", :options="sortTypes" v-model="sortType")
</template>

<script>
import {mapState, mapGetters, mapMutations} from 'vuex';
import BackToDashboard from '../BackToDashboard';
import Dropdown from '../../Dropdown';

export default {
  data() {
    return {
      sortType: '',
      sortTypes: [
        'FULLY MATCHED',
        'FULLY MATCHED',
        'FULLY MATCHED',
        'FULLY MATCHED',
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
  },
  methods: {
    ...mapMutations('page', {
      openPage: 'open',
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
    height: 52px;
    top: calc(100% - 52px);
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


  }
}
</style>
