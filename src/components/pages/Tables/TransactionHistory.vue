<template lang="pug">
TablePage(
  title="Transaction history",
  :data="data",
  :pageCount='setPagesCount',
  :page="setPageNum",
  :changeActivePage="setOffsetForTransactionHistory"
  :checkedArray.sync="checkedArray",
)
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
            Checkbox.tHistory__checkbox(:value="isChecked(item.id)", @change="setCheckedArray(item.id)", color="yellow")
          td {{item.id}}
          td.tHistory__date {{item.date}}
          td.tHistory__amount(:class="'tHistory__amount--' + (item.type == 'in' ? 'positive' : 'negative')") {{item.amount}} {{item.currency}}
          td.tHistory__description
            Icon(id='icon-qr', :class="{'tHistory__icon--visible': item.crypto}").tHistory__icon
            | {{item.description}}
          td.tHistory__status(:class="'tHistory__status--' + status[item.status].toLowerCase()") {{status[item.status]}}
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex';
import Checkbox from 'components/Checkbox';
import Icon from '../../Icon';
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
    };
  },
  computed: {
    ...mapState('trade', {
      total: (state) => state.accountTransactionHistory.total,
      data: (state) => state.accountTransactionHistory.items,
      offset: (state) => state.accountTransactionHistory.offset,
      itemsOnPage: 'limit',
    }),
    setPagesCount() {
      return Math.ceil(this.total / this.itemsOnPage);
    },
    setPageNum() {
      return Math.ceil((this.offset) / this.itemsOnPage) + 1;
    },
  }, methods: {
    ...mapMutations('trade', {
      setOffsetForTransactionHistory: 'setOffsetForTransactionHistory',
    }),
    ...mapActions('trade', {
      getAccountTransactionHistory: 'getAccountTransactionHistory',
    }),
    isChecked(id) {
      return this.checkedArray.indexOf(id) > -1;
    },
    setCheckedArray(id) {
      this.isChecked(id) ? this.checkedArray = this.checkedArray.filter((item) => item != id) : this.checkedArray.push(id);
    },
  },
  watch: {
    setPageNum() {
      this.getAccountTransactionHistory();
    },
    setPagesCount() {
      this.getAccountTransactionHistory;
    },
  },
  created() {
    this.getAccountTransactionHistory();
  },
  components: {
    TablePage,
    Icon,
    Checkbox,
  },
};
</script>


<style lang="scss" scoped>

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
      &:before {
        content: "+ ",
      }
    }
    &--negative {
      color: #f33a3a;
      &:before {
        content: "- ",
      }
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
    min-width: 32px;
    position: relative;
  }
  &__checkbox {
    position: absolute;
    top: 20px;
  }
}
</style>
