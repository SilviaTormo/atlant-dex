<template lang="pug">
TablePage(title="My orders")
  .myOrders.table
    table.table__body
      thead
        tr
          th
          th ID
          th Timestamp
          th Type
          th Action
          th Pair
          th Amount
          th Price
          th Total
      tbody
        tr(v-for="(item, index) in data")
          td
            .myOrders__checkbox
              input(type="checkbox" :id="item.id" :value="item.id" v-model="checkedArray" :key="item.id").checkboxTable
              label(:for="item.id")
          td {{item.id}}
          td {{item.timestamp}}
          td {{item.type}}
          td.myOrders__action(:class="'myOrders__action--' + item.action.toLowerCase()") {{item.action}}
          td {{item.pair}}
          td {{item.amount}}
          td {{item.price}} USD
          td {{item.total}} USD
    .panel(:class="{'panel--active': isCheckedArray, 'panel__scrollbarOpened' : showSidebar}")
      .panel__actions.panel__checkbox
        input(type="checkbox" id="globalCheckbox" @click="switchAllCheckboxes" :checked="isAllChecked").checkboxTable
        label(for="globalCheckbox")
      .panel__actions Repeat
      .panel__actions Undo
      .panel__actions Delete
      .panel__actions Export
</template>

<script>
import {mapState} from 'vuex';
import Icon from '../../Icon';
import TablePage from './TablePage';

export default {
  data() {
    return {
      checkboxCount: 0,
      data: [],
      checkedArray: [],
    };
  },
  computed: {
    ...mapState('misc', {
      showSidebar: 'showSidebar',
    }),
    isCheckedArray() {
      return Boolean(this.checkedArray.length);
    },
    checkedCount() {
      return this.checkedArray.length;
    },
    isAllChecked() {
      return this.checkboxCount === this.checkedCount;
    },
  },
  methods: {
    switchAllCheckboxes() {
      this.checkedArray = !this.isAllChecked ? this.data.map((item) => item.id) : [];
    },
  },
  created() {
    this.data = [
      {
        id: 48436400,
        timestamp: '01.08.2017 21:15',
        type: 'Market',
        action: 'Sell',
        pair: 'BTC/USD',
        amount: '0.0150 BTC',
        price: 1500.00,
        total: 22.50,
      },
      {
        id: 38622643,
        timestamp: '31.07.2017 16:21',
        type: 'Limit',
        action: 'Buy',
        pair: 'ETH/USD',
        amount: '1.0000 ETH',
        price: 199.59,
        total: 199.59,
      },
      {
        id: 35195753,
        timestamp: '24.07.2017 4:13',
        type: 'Limit',
        action: 'Buy',
        pair: 'EMC/USD',
        amount: '5.0000 EMC',
        price: 0.60,
        total: 3.00,
      },
      {
        id: 31229014,
        timestamp: '18.07.2017 2:01',
        type: 'Limit',
        action: 'Sell',
        pair: 'BTC/USD',
        amount: '0.0150 BTC',
        price: 1500.00,
        total: 22.50,
      },
      {
        id: 24311784,
        timestamp: '22.06.2017 16:31',
        type: 'Market',
        action: 'Buy',
        pair: 'BTC/USD',
        amount: '0.0150 BTC',
        price: 1500.00,
        total: 22.50,
      },
    ];
    this.$nextTick(() => {
      this.checkboxCount = document.getElementsByClassName('myOrders__checkbox').length;
    });
  },
  components: {
    TablePage,
    Icon,
  },
};
</script>


<style lang="scss" scoped>
@import '~sass/bootstrap/media';
.myOrders {
  &__action {
    &--buy{
      color: #7ed321;
    }
    &--sell {
      color: #f33a3a;
    }
  }
}
.panel {
  $panelHeight: 58px;
  z-index: 1.6;
  position: fixed;
  display: flex;
  align-items: center;
  padding-left: 41px;
  height: $panelHeight;
  left: 55px;
  right: 0;
  bottom: -$panelHeight;
  overflow: hidden;
  background-image: repeating-linear-gradient(
    135deg,
    #103c55,
    #103c55 25px,
    #03324c 0,
    #03324c 60px
  );
  transition: bottom .5s, left .15s;
  &--active {
    transition: bottom .5s;
    bottom: 0px;
  }
  &__actions {
    cursor: pointer;
    margin-right: 40px;
    color: #ffffff;
    font-family: Roboto;
    font-size: 12px;
    font-weight: 700;
  }
  &__scrollbarOpened {
    transition: left .15s;
    left: 335px;
  }
}
</style>
