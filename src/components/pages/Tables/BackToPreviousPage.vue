<template lang="pug">
.backTo(@click="openPage")
  Icon.backTo__arrow(id="arrow_right")
  .backTo__back Back to {{getPreviousPage}}
</template>

<script>
import {mapState, mapMutations} from 'vuex';
import Icon from '../../Icon';

export default {
  computed: {
    ...mapState('page', [
      'previusPageForTables',
    ]),
    getPreviousPage() {
      switch (this.previusPageForTables) {
        case 'transactionHistory': return 'Transaction History';
        case 'myOrders': return 'My Orders';
        case 'verification': return 'Verification';
        case 'verification': return 'Verification';
        case 'verificationAdmin': return 'Verification Admin';
        case 'accountInformation': return 'Account Information';
        case 'securitySettings': return 'Security Settings';
        case 'securityLog': return 'Security Log';
        case 'faq': return 'FAQ';
        case 'notificationHistory': return 'Notification History';
        default: return 'Dashboard';
      }
    },
  },
  methods: {
    ...mapMutations('page', {
      open: 'open',
    }),
    openPage() {
      this.open({
        name: this.previusPageForTables,
      });
    },
  },
  components: {
    Icon,
  },
};
</script>

<style lang="scss">
@import '~variables';

.backTo {
  cursor: pointer;
  display: flex;
  align-items: center;
  &__arrow {
    width: 32px;
    height: 7px;
    fill: $color_yellow;
  }
  &__back {
    margin-left: 24px;
    font-weight: 700;
    text-transform: uppercase;
    color: $color_yellow;
  }
}
</style>
