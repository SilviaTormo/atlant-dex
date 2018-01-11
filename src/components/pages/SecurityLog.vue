<template lang="pug">
Page(title="Security log", :sidebar="true")
  .securityLog
    .title TWO-FACTOR AUTHENTICATION
    .table__container
      table.table
        thead
          tr.table__header
            th IP address
            th Date
            th Type
        tbody
          tr(v-for="(item, index) in data").table__row
            td.table__cell {{ item.ip }}
            td.table__cell {{ item.date }}
            td.table__cell {{ item.type }}
</template>

<script>
import Page from './Page';

export default {
  data() {
    return {
      data: [
        {
          ip: '46.8.48.99',
          date: '18.12.2017 5:52',
          type: 'System login',
        },
        {
          ip: '90.154.64.234',
          date: '17.12.2017 22:38',
          type: 'System login',
        },
        {
          ip: '46.8.48.99',
          date: '17.12.2017 1:33',
          type: 'System login',
        },
        {
          ip: '46.8.48.99',
          date: '16.12.2017 22:37',
          type: 'System login',
        },
        {
          ip: '90.154.64.234',
          date: '16.12.2017 15:52',
          type: 'System login',
        },
        {
          ip: '90.154.64.234',
          date: '16.12.2017 15:52',
          type: 'System login',
        },
        {
          ip: '90.154.64.234',
          date: '12.12.2017 23:39',
          type: 'System login',
        },
      ],
    };
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
