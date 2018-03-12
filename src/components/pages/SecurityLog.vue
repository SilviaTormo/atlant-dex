<template lang="pug">
Page(title="Security log", title2="Authorization sheet", :sidebar="true")
  .securityLog
    .table
      table.table__body
        thead
          tr
            th IP address
            th Date
            th Type
        tbody
          tr(v-for="(item, index) in data.logs")
            td {{item.ipAddress}} ({{item.country}})
            td {{getLogTime(item.dateTime)}}
            td {{item.description}}
    Pagination(v-show="pageCount > 1", :page="page", :pageCount="pageCount", :pageAction="changeActivePage")
</template>

<script>
import * as User from 'services/api/user';
import {DateTime} from 'luxon';
import Page from './Page';
import Pagination from './Pagination';

export default {
  data() {
    return {
      data: {
        logs: [],
        totalItems: 0,
      },
      limit: 12,
      page: 1,
    };
  },
  computed: {
    pageCount() {
      return Math.ceil(this.data.totalItems / this.limit);
    },
  },
  methods: {
    getLogTime(isoTime) {
      return DateTime.fromISO(isoTime).toFormat('dd.LL.yyyy HH:mm');
    },
    changeActivePage(num) {
      this.page = num;
      this.getSecurityLog();
    },
    getSecurityLog() {
      User.getSecurityLog({
        page: this.page,
        limit: this.limit,
      }).then((response) => {
        this.data = response.data;
      });
    },
  },
  created() {
    this.getSecurityLog();
  },
  components: {
    Page,
    Pagination,
  },
};
</script>

<style lang="css">
.securityLog {
  max-width: 500px;
}
</style>
