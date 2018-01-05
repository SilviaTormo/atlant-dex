<template lang="pug">
Page(title="Transaction history")
  .tHistory
    table.tHistory__table
      thead
        tr.tHistory__header
          th
          th ID
          th Time
          th Amount
          th Description
          th Status
      tbody
        tr(v-for="(item, index) in data")
          td
            input(type="checkbox" :id="item.id" :value="item.id" v-model="checkedArray" :key="item.id").tHistory__checkbox
          td {{item.id}}
          td.tHistory__date {{item.date}}
          td {{item.amount}} USD
          td.tHistory__description
            Icon(id='qr' :class="{'tHistory__icon--visible': item.crypto}").tHistory__icon
            | {{item.description}}
          td {{item.status}}
    .panel(:class="{'panel--active': isCheckedArray}")
      input.panel__actions.panel__checkbox(type="checkbox" @click="switchAllCheckboxes" :checked="isAllChecked")
      .panel__actions Repeat
      .panel__actions Undo
      .panel__actions Delete
      .panel__actions Export
</template>

<script>
import Icon from '../Icon';
import Page from './Page';

export default {
  data() {
    return {
      checkboxCount: 0,
      data: [],
      checkedArray: [],
    };
  },
  computed: {
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
    setTimeout(() => {
      this.data = [
        {
          id: 484,
          date: '01.08.2017 21:15',
          amount: -15.00,
          description: 'Transfer to belpoker',
          status: 'Completed',
        },
        {
          id: 485,
          date: '01.08.2017 21:14',
          amount: 562.00,
          description: '0xA457D7b0b1d8AC284C0cEE02aE7dFFC38A33aCF8',
          crypto: true,
          status: 'Pending',
        },
        {
          id: 486,
          date: '01.08.2017 21:14',
          amount: -5.00,
          crypto: true,
          description: '0xA457D7b0b1d8AC284C0cEE02aE7dFFC38A33aCF8',
          status: 'Error',
        },
      ];
      this.$nextTick(() => {
        this.checkboxCount = document.getElementsByClassName('tHistory__checkbox').length;
      });
    }, 1000);
  },
  components: {
    Page,
    Icon,
  },
};
</script>


<style lang="scss">
.tHistory {
  width: 100%;
  &__table {
    width: 100%;
    border-collapse: collapse;
  }

  &__header {
    text-align: left;
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
}
.panel {
  position: absolute;
  display: flex;
  align-items: center;
  padding-left: 35px;
  height: 58px;
  left: 0;
  right: 0;
  bottom: -58px;
  overflow: hidden;
  background-image: repeating-linear-gradient(
    135deg,
    #103c55,
    #103c55 25px,
    #03324c 0,
    #03324c 60px
  );
  transition: bottom .5s;
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
}
</style>
