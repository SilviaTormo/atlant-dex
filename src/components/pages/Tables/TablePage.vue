<template lang="pug">
.tablePage
  TableHeader
  .tablePage__body
    .tablePage__content
      slot
      EmptyPlaceholder(v-if="data.length == 0")
      Pagination(v-show="pageCount > 1", :page="page", :pageCount="pageCount", :pageAction="changeActivePage")
      .tablePage__panel(:class="{'tablePage__panel--active': isShowPanelInMobileVersion, 'tablePage__panelScrollbarOpened' : showSidebar}")
        .tablePage__panelActions.panel__checkbox
          Checkbox.tHistory__checkbox(color="yellow", :value="isAllChecked" @change="toggleCheckboxes")
        .tablePage__panelActions Repeat
        .tablePage__panelActions Undo
        .tablePage__panelActions Delete
        .tablePage__panelActions Export
</template>

<script>
import {mapState} from 'vuex';
import Checkbox from 'components/Checkbox';
import Icon from '../../Icon';
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
    isAllChecked() {
      return this.checkedArray.length === this.data.length;
    },
    isShowPanelInMobileVersion() {
      return Boolean(this.checkedArray.length);
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
@import "~variables";
@import "~sass/bootstrap/media";

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
    color: #ffffff;
    font-family: Roboto;
    font-size: 12px;
    font-weight: 700;
  }
  &__panelScrollbarOpened {
    transition: left .15s;
    left: 335px;
  }
}

@include media-breakpoint-down(md) {
  .tablePage {
    padding-bottom: 60px;
    &__body {
      flex-direction: column;
    }
    &__content {
      padding: 10px;
    }
    &__panel {
      bottom: -$panelHeight;
      &--active {
        transition: bottom .5s;
        bottom: 0px;
      }
    }
    &__panelActions {
      margin-right: 16px;
    }
  }
}
</style>
