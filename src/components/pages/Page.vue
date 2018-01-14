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
@import "~variables";
@import "~sass/bootstrap/media";
.page {
  height: 100%;
  &__body {
    height: 100%;
    display: flex;
  }
  &__content {
    width: 100%;
    padding: 36px;
    border-top: 1px solid $color_tangaroa;
  }
}

@include media-breakpoint-down(md) {
  .page {
    padding: 50px 0;
    &__body {
      flex-direction: column;
    }
    &__sidebar {
      display: none;
    }
  }
}
</style>
