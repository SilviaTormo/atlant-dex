<template lang="pug">
TablePage(title="My orders", :data="data")
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
          td.myOrders__checkboxContainer
            Checkbox.myOrders__checkbox(:key="item.id" v-model="item.checked")
          td {{item.id}}
          td {{item.timestamp}}
          td {{item.type}}
          td.myOrders__action(:class="'myOrders__action--' + item.action.toLowerCase()") {{item.action}}
          td {{item.pair}}
          td {{item.amount}}
          td {{item.price}} USD
          td {{item.total}} USD
</template>

<script>
import Checkbox from 'components/Checkbox';
import Icon from '../../Icon';
import TablePage from './TablePage';

export default {
  data() {
    return {
      data: [],
    };
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
        checked: false,
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
        checked: false,
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
        checked: false,
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
        checked: false,
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
        checked: false,
      },
    ];
  },
  components: {
    TablePage,
    Icon,
    Checkbox,
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
