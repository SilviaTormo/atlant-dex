<template lang="pug">
.tableHeader
  BackToDashboard
  .tableHeader__title(v-if="!isMobile" @click="getOpenPage('transactionHistory')") Transaction History
  .tableHeader__title(v-if="!isMobile" @click="getOpenPage('myOrders')") My Orders
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';
import BackToDashboard from '../BackToDashboard';

export default {
  computed: {
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
  },
};
</script>

<style lang="scss">
@import '~variables';
@import "~sass/bootstrap/media";

.tableHeader {
  display: flex;
  align-items: center;
  padding: 36px;
  border-top: 1px solid $color_tangaroa;
  &__title {
    font-weight: 700;
    text-transform: uppercase;
    margin-left: 52px;
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
