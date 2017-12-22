<template lang="pug">
.page
  PageHeader(:title="title")
  .page__content
    slot
</template>

<script>
import PageHeader from './PageHeader';

export default {
  props: {
    title: {
      type: String,
      default: '',
      required: false,
    },
  },
  components: {
    PageHeader,
  },
};
</script>

<style lang="scss">
.page {
  &__content {
    padding: 36px;
  }
}
</style>
