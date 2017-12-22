<template lang="pug">
.pageHeader
  BackToDashboard
  .pageHeader__title {{title}}
</template>

<script>
import BackToDashboard from './BackToDashboard';

export default {
  props: {
    title: {
      type: String,
      default: '',
      required: false,
    },
  },
  components: {
    BackToDashboard,
  },
};
</script>

<style lang="scss">
@import '~variables';

.pageHeader {
  display: flex;
  align-items: center;
  padding: 36px;
  border-top: 1px solid $color_tangaroa;
  border-bottom: 1px solid $color_tangaroa;
  &__title {
    font-weight: 700;
    text-transform: uppercase;
    margin-left: 52px;
  }
}
</style>
