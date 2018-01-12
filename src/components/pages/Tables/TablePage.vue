<template lang="pug">
.page
  TableHeader
  .page__body
    .page__content
      slot
</template>

<script>
import TableHeader from './TableHeader';

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
    TableHeader,
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
    padding-bottom: 60px;
    &__body {
      flex-direction: column;
    }
  }
}
</style>
