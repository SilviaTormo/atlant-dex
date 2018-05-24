<template lang="pug">
.tablePage
  TableHeader
  .tablePage__body
    .tablePage__content
      slot
      EmptyPlaceholder(v-if="data.length == 0", :content="getTableContent")
      Pagination(v-show="pageCount > 1", :page="page", :pageCount="pageCount", :pageAction="changeActivePage")
      .tablePage__panel(:class="{'tablePage__panel--active': isShowPanelInMobileVersion, 'tablePage__panelScrollbarOpened' : showSidebar}")
        .tablePage__panelActions.panel__checkbox
          Checkbox.tHistory__checkbox(color="yellow", :value="isAllChecked" @change="toggleCheckboxes")
        .tablePage__panelActions(v-if="getRepeat") Repeat
        .tablePage__panelActions(v-if="getCancel") Cancel
        .tablePage__panelActions(v-if="getDelete") Delete
        .tablePage__panelActions(v-if="getExport") Export
</template>

<script>
import {mapState} from 'vuex';
import Checkbox from '@/components/Checkbox';
import Icon from '@/components/Icon';
import Pagination from '../Pagination';
import TableHeader from './TableHeader';
import EmptyPlaceholder from './EmptyPlaceholder';

export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapState('misc', {
      showSidebar: 'showSidebar',
    }),
    ...mapState('page', {
      content: 'name',
    }),
    isAllChecked() {
      return this.checkedArray.length === this.data.length;
    },
    isShowPanelInMobileVersion() {
      return Boolean(this.checkedArray.length);
    },
    getTableContent() {
      switch (this.content) {
        case 'myOrders': return 'orders';
        case 'transactionHistory': return 'transactions';
      };
    },
  },
  methods: {
    switchAllCheckboxes(val) {
      this.$emit('update:checkedArray', val ? this.data.map((item) => item.id) : []);
    },
    toggleCheckboxes() {
      this.isAllChecked ? this.switchAllCheckboxes(false) : this.switchAllCheckboxes(true);
    },
  },
  props: {
    title: {
      type: String,
      default: '',
      required: false,
    },
    sidebar: {
      type: Boolean,
      default: false,
      required: false,
    },
    data: {
      type: Array,
      required: true,
    },
    checkedArray: {
      type: Array,
      required: true,
    },
    page: {
      type: [Number, String],
      required: false,
    },
    pageCount: {
      type: [Number, String],
      required: false,
    },
    changeActivePage: {
      type: Function,
      required: false,
    },
    getRepeat: {
      type: [Function, Boolean],
      default: false,
      required: false,
    },
    getUndo: {
      type: [Function, Boolean],
      default: false,
      required: false,
    },
    getCancel: {
      type: [Function, Boolean],
      default: false,
      required: false,
    },
    getDelete: {
      type: [Function, Boolean],
      default: false,
      required: false,
    },
    getExport: {
      type: [Function, Boolean],
      default: false,
      required: false,
    },
  },
  components: {
    TableHeader,
    EmptyPlaceholder,
    Checkbox,
    Icon,
    Pagination,
  },
};
</script>

<style lang="scss">
@import 'variables';

$panelHeight: 58px;
.tablePage {
  position: relative;
  &__body {
    height: 100%;
    display: flex;
  }
  &__content {
    width: 100%;
    padding: 36px;
    border-top: 1px solid $color_tangaroa;
  }
  &__panel {
    z-index: 1.6;
    position: fixed;
    display: flex;
    align-items: center;
    padding-left: 41px;
    height: $panelHeight;
    left: 55px;
    right: 0;
    bottom: 0;
    overflow: hidden;
    background-image: repeating-linear-gradient(
      135deg,
      #103c55,
      #103c55 25px,
      #03324c 0,
      #03324c 60px
    );
    transition: bottom .5s, left .15s;

  }
  &__panelActions {
    cursor: pointer;
    margin-right: 40px;
    color: $color_white;
    font-family: Roboto;
    font-size: 12px;
    font-weight: 700;
  }
  &__panelScrollbarOpened {
    transition: left .15s;
    left: 335px;
  }
}
</style>
