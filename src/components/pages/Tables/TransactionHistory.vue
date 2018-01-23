<template lang="pug">
TablePage(title="Transaction history")
  .tHistory.table
    table.table__body
      thead
        tr
          th
          th ID
          th Time
          th Amount
          th.tHistory__header--description Description
          th Status
      tbody
        tr(v-for="(item, index) in data")
          td.tHistory__checkboxContainer
            Checkbox.tHistory__checkbox(:tableId="item.id", :key="item.id" v-model="item.checked")
          td {{item.id}}
          td.tHistory__date {{item.date}}
          td.tHistory__amount(:class="'tHistory__amount--' + (item.amount >= 0 ? 'positive' : 'negative')") {{item.amount}} USD
          td.tHistory__description
            Icon(id='icon-qr' :class="{'tHistory__icon--visible': item.crypto}").tHistory__icon
            | {{item.description}}
          td.tHistory__status(:class="'tHistory__status--' + item.status.toLowerCase()") {{item.status}}
    EmptyPlaceholder(v-if="data.length == 0")
    PanelForTable(
      :isAllChecked="isAllChecked",
      :isCheckedArray="isCheckedArray",
      :toggleCheckboxes="toggleCheckboxes",
      :showSidebar="showSidebar")
</template>

<script>
import {mapState} from 'vuex';
import Checkbox from 'components/Checkbox';
import PanelForTable from 'components/pages/PanelForTable';
import Icon from '../../Icon';
import TablePage from './TablePage';
import EmptyPlaceholder from './EmptyPlaceholder';

export default {
  data() {
    return {
      checkboxCount: 0,
      data: [],
    };
  },
  computed: {
    ...mapState('misc', {
      showSidebar: 'showSidebar',
    }),
    isCheckedArray() {
      return Boolean(this.checkedCount);
    },
    checkedCount() {
      return this.data.filter((item) => item.checked).length;
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
  created() {
    this.data = [
      {
        id: 484,
        date: '01.08.2017 21:15',
        amount: -15.00,
        description: 'Transfer to belpoker',
        status: 'Completed',
        checked: false,
      },
      {
        id: 485,
        date: '01.08.2017 21:14',
        amount: 562.00,
        description: '0xA457D7b0b1d8AC284C0cEE02aE7dFFC38A33aCF8',
        crypto: true,
        status: 'Pending',
        checked: false,
      },
      {
        id: 486,
        date: '01.08.2017 21:14',
        amount: -5.00,
        crypto: true,
        description: '0xA457D7b0b1d8AC284C0cEE02aE7dFFC38A33aCF8',
        status: 'Error',
        checked: false,
      },
    ];
    this.$nextTick(() => {
      this.checkboxCount = this.data.length;
    });
  },
  components: {
    TablePage,
    Icon,
    Checkbox,
    PanelForTable,
    EmptyPlaceholder,
  },
};
</script>


<style lang="scss" scoped>
@import '~sass/bootstrap/media';

.tHistory {
  &__header {
    &--description {
      padding-left: 26px;
    }
  }
  &__description {
    min-width: 320px;
  }
  &__amount {
    &--positive {
      color: #7ed321;
    }
    &--negative {
      color: #f33a3a;
    }
  }
  &__icon {
    display: inline-block;
    vertical-align: middle;
    margin-right: 14px;
    width: 12px;
    height: 12px;
    fill: white;
    visibility: hidden;
    &--visible {
      visibility: visible;
    }
  }
  &__status {
    color: #a1a1a1;
    &--completed {
      color: #7ed321;
    }
    &--error {
      color: #f33a3a;
    }
  }
  &__checkboxContainer {
    width: 50px;
    position: relative;
  }
  &__checkbox {
    position: absolute;
    top: 20px;
  }
}
</style>
