<template lang="pug">
TablePage(
  title="Transaction history",
  :data="data",
  :pageCount='setPagesCount',
  :page="page",
  :changeActivePage="changeActivePage"
  :checkedArray.sync="checkedArray",
  :getRepeat="true",
  :getCancel="true",
  :getExport="true",
)
  .tHistory.table
    table.table__body
      thead
        tr
          th
          th ID
          th.table__sortable(:class="{'table__sortable--active': sortBy==='datetime'}" @click="sortTransactions('datetime')") Time
          th Amount
          th.tHistory__header--description Description
          th.table__sortable(:class="{'table__sortable--active': sortBy==='status'}" @click="sortTransactions('status')") Type Status
      tbody
        tr(v-for="(item, index) in data")
          td.tHistory__checkboxContainer
            Checkbox.tHistory__checkbox(:value="isChecked(item.id)", @change="setCheckedArray(item.id)", color="yellow")
          td {{item.id}}
          td.tHistory__date {{setDate(item.creationDate)}}
          td.tHistory__amount(:class="'tHistory__amount--' + (item.amount > 0 ? 'positive' : 'negative')") {{item.amount}} {{item.currency}}
          td.tHistory__description {{item.description}}
          td.tHistory__status(:class="'tHistory__status--' + status[item.status].toLowerCase()") {{status[item.status]}}
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import {DateTime} from 'luxon';
import Checkbox from '@/components/Checkbox';
import TablePage from './TablePage';

export default {
  data() {
    return {
      checkedArray: [],
      status: [
        'Pending',
        'Processing',
        'Completed',
        'Cancelled',
        'Declined',
        'Authorizing',
        'Wallet',
      ],
      page: 1,
      limit: 10,
      sortBy: 'datetime',
      asc: false,
    };
  },
  computed: {
    ...mapGetters('user', {
      data: 'getAccountTransactions',
      totalItems: 'getAccountTransactionItems',
    }),
    setPagesCount() {
      return Math.ceil(this.totalItems / this.limit);
    },
  },
  methods: {
    ...mapActions('user', {
      getAccountTransactionHistory: 'getAccountTransactionHistory',
    }),
    setDate(isoTime) {
      return DateTime.fromISO(isoTime).toFormat('dd.LL.yyyy HH:mm');
    },
    isChecked(id) {
      return this.checkedArray.indexOf(id) > -1;
    },
    setCheckedArray(id) {
      this.isChecked(id) ? this.checkedArray = this.checkedArray.filter((item) => item != id) : this.checkedArray.push(id);
    },
    getUserTransactions() {
      this.getAccountTransactionHistory({
        page: this.page,
        limit: this.limit,
        sortBy: this.sortBy,
        ascending: this.asc,
      });
    },
    sortTransactions(column) {
      if (this.sortBy === column) {
        this.asc = !this.asc;
      } else {
        this.sortBy = column;
        this.asc = false;
      };
      this.getUserTransactions();
    },
    changeActivePage(num) {
      this.page = num;
      this.getUserTransactions();
    },
  },
  created() {
    this.getUserTransactions();
  },
  components: {
    TablePage,
    Checkbox,
  },
};
</script>


<style lang="scss" scoped>
@import 'variables';
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
      color: $color_malachite;
      &:before {
        content: "+ ",
      }
    }
    &--negative {
      color: $color_red;
    }
  }
  &__icon {
    display: inline-block;
    vertical-align: middle;
    margin-right: 14px;
    width: 12px;
    height: 12px;
    fill: $color_white;
    visibility: hidden;
    &--visible {
      visibility: visible;
    }
  }
  &__status {
    color: $color_grey;
    &--completed {
      color: $color_green;
    }
    &--error {
      color: $color_red;
    }
  }
  &__checkboxContainer {
    width: 50px;
    min-width: 32px;
    position: relative;
  }
  &__checkbox {
    position: absolute;
    top: 20px;
  }
}
</style>
