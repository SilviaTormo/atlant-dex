<template lang="pug">
.page
  PageHeader(:title="title")
  .page__body
    .page__sidebar(v-if="sidebar")
      PageSidebar
    .page__content
      .page__title {{title2}}
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
    title2: {
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
  min-height: 100%;
  position: relative;
  &__body {
    height: 100%;
    display: flex;
  }
  &__content {
    width: 100%;
    padding: 36px;
    border-top: 1px solid $color_tangaroa;
  }
  &__title {
    font-size: 16px;
    font-weight: 700;
    line-height: 25px;
    text-transform: uppercase;
    margin-bottom: 41px;
  }
}

@include media-breakpoint-down(md) {
  .page {
    padding: 0;
    &__body {
      flex-direction: column;
    }
    &__content {
      // display: flex;
      // flex-direction: column;
      // align-items: center;
    }
    &__title {
      display: none;
    }
  }
}
</style>
