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
          tr(v-for="(item, index) in data")
            td {{item.ipAddress}} ({{item.country}})
            td {{getLogTime(item.dateTime)}}
            td {{item.description}}
</template>

<script>
import * as User from 'services/api/user';
import {DateTime} from 'luxon';
import Page from './Page';

export default {
  data() {
    return {
      data: [],
    };
  },
  methods: {
    getLogTime(isoTime) {
      return DateTime.fromISO(isoTime).toFormat('dd.LL.yyyy HH:mm');
    },
  },
  created() {
    User.getSecurityLog({
      page: 1,
      limit: 100,
    }).then((response) => {
      this.data = response.data.logs;
    });
  },
  components: {
    Page,
  },
};
</script>

<style lang="css">
.securityLog {
  max-width: 500px;
}
</style>
