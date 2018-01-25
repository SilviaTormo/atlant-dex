<template lang="pug">
.tablePage
  TableHeader
  .tablePage__body
    .tablePage__content
      slot
      EmptyPlaceholder(v-if="data.length == 0")
      PanelForTable(
        :isAllChecked="isAllChecked",
        :isCheckedArray="isCheckedArray",
        :toggleCheckboxes="toggleCheckboxes",
        :showSidebar="showSidebar")
</template>

<script>
import {mapState} from 'vuex';
import PanelForTable from 'components/pages/PanelForTable';
import TableHeader from './TableHeader';
import EmptyPlaceholder from './EmptyPlaceholder';

export default {
  computed: {
    ...mapState('misc', {
      showSidebar: 'showSidebar',
    }),
    checkboxCount() {
      return this.data.length;
    },
    checkedCount() {
      return this.data.filter((item) => item.checked).length;
    },
    isCheckedArray() {
      return Boolean(this.checkedCount);
    },
    isAllChecked() {
      return this.checkboxCount === this.checkedCount;
    },
  },
  methods: {
    switchAllCheckboxes(val) {
      for (let i of this.data) {
        i.checked = val;
      }
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
  },
  components: {
    TableHeader,
    PanelForTable,
    EmptyPlaceholder,
  },
};
</script>

<style lang="scss">
@import "~variables";
@import "~sass/bootstrap/media";
.tablePage {
  overflow-ч: auto;
  height: 100%;
  &__body {
    height: 100%;
    display: flex;
  }
  &__content {
    width: 100%;
    padding: 36px;
    border-top: 1px solid $color_tangaroa;
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
  }
}
</style>
