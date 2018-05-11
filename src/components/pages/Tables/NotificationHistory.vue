<template lang="pug">
TablePage(
  title="NOTIFICATION_HISTORY",
  :data="data",
  :pageCount='setPagesCount',
  :page="page",
  :changeActivePage="changeActivePage",
  :checkedArray.sync='checkedArray',
  :getDelete="true",
)
  .notificationHistory.table
    table.table__body
      thead
        tr
          th
          th.table__sortable(:class="{'table__sortable--active': sortBy==='datetime'}" @click="sortNotifications('datetime')") Time & Date
          th.table__sortable(:class="{'table__sortable--active': sortBy==='level'}" @click="sortNotifications('level')") Type
          th Description
      tbody
        tr(v-for="(item, index) in data")
          td
            Checkbox(color="yellow", :value="isChecked(item.id)" @change="setCheckedArray(item.id)")
          td {{formatTime(item.dateTime)}}
          td.notificationHistory__capital(:class="{'notificationHistory__redText' : getNotificationType(item.level) === 'Warning' || getNotificationType(item.level) === 'Error'}") {{getNotificationType(item.level)}}
          td {{$t('notifications.' + getStatus(item), item.arguments)}}
</template>

<script>
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
import {DateTime} from 'luxon';
import {notificationType, getSignalRNotification} from '@/services/notification';
import Checkbox from '@/components/Checkbox';
import Icon from '@/components/Icon';
import TablePage from './TablePage';

export default {
  data() {
    return {
      checkedArray: [],
      page: 1,
      sortBy: 'datetime',
      asc: false,
    };
  },
  computed: {
    ...mapState('user', {
      notificationsCounter: 'notificationsCounter',
    }),
    ...mapGetters('user', {
      data: 'getNotifications',
      totalItems: 'getNotificationItems',
      itemsOnPage: 'getNotificationsOnPage',
    }),
    setPagesCount() {
      return Math.ceil(this.totalItems / this.itemsOnPage);
    },
  },
  methods: {
    ...mapMutations('user', {
      setNotificationsCounter: 'setNotificationsCounter',
    }),
    ...mapActions('user', [
      'getNotificationHistory',
    ]),
    isChecked(id) {
      return Boolean(this.checkedArray.indexOf(id) != -1);
    },
    setCheckedArray(id) {
      this.isChecked(id) ? this.checkedArray = this.checkedArray.filter((item) => item != id) : this.checkedArray.push(id);
    },
    formatTime(isoTime) {
      return DateTime.fromISO(isoTime).toFormat('dd.LL.yyyy HH:mm');
    },
    getNotificationType(level) {
      return notificationType(level);
    },
    getStatus(notification) {
      return getSignalRNotification(notification.type);
    },
    getNotifications() {
      this.getNotificationHistory({
        page: this.page,
        sortBy: this.sortBy,
        ascending: this.asc,
      });
    },
    sortNotifications(column) {
      if (this.sortBy === column) {
        this.asc = !this.asc;
      } else {
        this.sortBy = column;
        this.asc = false;
      };
      this.getNotifications();
    },
    changeActivePage(num) {
      this.page = num;
      this.getNotifications();
    },
  },
  watch: {
    notificationsCounter() {
      if (this.notificationsCounter > 0) {
        this.setNotificationsCounter(0);
        this.getNotifications();
      }
    },
  },
  created() {
    this.setNotificationsCounter(0);
    this.getNotifications();
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
    &__capital {
      text-transform: capitalize;
    }
}
</style>
