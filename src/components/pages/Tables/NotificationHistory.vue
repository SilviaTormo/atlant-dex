<template lang="pug">
TablePage(
  title="NOTIFICATION_HISTORY",
  :data="data",
  :pageCount='setPagesCount',
  :page="setPageNum",
  :changeActivePage="() => false",
  :checkedArray.sync='checkedArray',
  :getDelete="true",
  :getExport="true",
)
  .notificationHistory.table
    table.table__body
      thead
        tr
          th
          th Time & Date
          th Type
          th Description
      tbody
        tr(v-for="(item, index) in data")
          td
            Checkbox(color="yellow", :value="isChecked(item.id)" @change="setCheckedArray(item.id)")
          td {{item.date}}
          td(:class="{'notificationHistory__redText' : item.type === 'Warning' || item.type === 'Error'}") {{item.type}}
          td {{item.description}}
</template>

<script>
import Checkbox from 'components/Checkbox';
import Icon from '../../Icon';
import TablePage from './TablePage';

export default {
  data() {
    return {
      checkedArray: [],
      data: [
          {
              id: 1,
              date: '01.08.2017 21:15',
              type: 'Error',
              description: 'Order #1241512 partially filled: sold 1 ETH for 1,011 USD',
          },
          {
              id: 2,
              date: '01.08.2017 21:14',
              type: 'Info',
              description: 'Order #1241512 filled: sold 0.5 BTC for 5,309 USD',
          },
          {
              id: 3,
              date: '04.07.2017 14:5',
              type: 'Warning',
              description: 'ALERT Margin Call: deposit funds to increase margin level',
          },
      ],
    };
  },
  computed: {
    allDataLength() {
        return 70;
    },
    offset() {
        return 23;
    },
    itemsOnPage() {
        return 10;
    },
    setPagesCount() {
      return Math.ceil(this.allDataLength / this.itemsOnPage);
    },
    setPageNum() {
      return Math.ceil((this.offset) / this.itemsOnPage) + 1;
    },
  },
  methods: {
    isChecked(id) {
      return Boolean(this.checkedArray.indexOf(id) != -1);
    },
    setCheckedArray(id) {
      this.isChecked(id) ? this.checkedArray = this.checkedArray.filter((item) => item != id) : this.checkedArray.push(id);
    },
  },
  components: {
    TablePage,
    Icon,
    Checkbox,
  },
};
</script>


<style lang="scss" scoped>
@import "~variables";
.notificationHistory {
    &__redText {
      color: $color_red;
    }
}
</style>
