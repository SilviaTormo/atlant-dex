<template lang="pug">
.page
  PageHeader(:title="title")
  .page__body
    .page__sidebar(v-if="sidebar")
      PageSidebar
    .page__content
      slot
</template>

<script>
import PageHeader from './PageHeader';
import PageSidebar from './PageSidebar';

export default {
  props: {
    title: {
      type: String,
      default: '',
      required: false,
    },
    sidebar: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  components: {
    PageHeader,
    PageSidebar,
  },
};
</script>

<style lang="scss">
.page {
  &__body {
    display: flex;
  }
  &__content {
    width: 100%;
    padding: 36px;
  }
}
</style>
