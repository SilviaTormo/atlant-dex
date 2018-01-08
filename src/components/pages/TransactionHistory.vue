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
          th.tHistory__header--description Description
          th Status
      tbody.tHistory__tableBody
        tr(v-for="(item, index) in data").tHistory__tableLine
          td.tHistory__tableCell
            .tHistory__checkbox
              input(type="checkbox" :id="item.id" :value="item.id" v-model="checkedArray" :key="item.id").checkboxCustom
              label(:for="item.id")
          td.tHistory__tableCell {{item.id}}
          td.tHistory__tableCell.tHistory__date {{item.date}}
          td.tHistory__tableCell.tHistory__amount(:class="'tHistory__amount--' + (item.amount >= 0 ? 'positive' : 'negative')") {{item.amount}} USD
          td.tHistory__tableCell.tHistory__description
            Icon(id='icon-qr' :class="{'tHistory__icon--visible': item.crypto}").tHistory__icon
            | {{item.description}}
          td.tHistory__tableCell.tHistory__status(:class="'tHistory__status--' + item.status.toLowerCase()") {{item.status}}
    .panel(:class="{'panel--active': isCheckedArray}")
      .panel__actions.panel__checkbox
        input(type="checkbox" id="globalCheckbox" @click="switchAllCheckboxes" :checked="isAllChecked").checkboxCustom
        label(for="globalCheckbox")
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
  $tableHeight: 62px;
  // width: 100%;
  overflow: auto;
  &__table {
    width: 100%;
    border-collapse: collapse;
  }

  &__header {
    height: $tableHeight;
    border-bottom: 1px solid #032537;
    text-align: left;
    color: #a1a1a1;
    font-size: 12px;
    font-weight: 700;
    &--description {
      padding-left: 26px;
    }
  }

  &__tableLine {
    position: relative;
    height: $tableHeight;
    border-bottom: 1px solid #023b59;
  }

  &__tableCell {
    padding: 0 5px;
    white-space: nowrap;
  }

  &__description {
    min-width: 320px;
  }

  &__checkbox {
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
}
.panel {
  $panelHeight: 58px;
  position: absolute;
  display: flex;
  align-items: center;
  padding-left: 35px;
  height: $panelHeight;
  left: 0;
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
