<template lang="pug">
.status
  Icon.status__icon(:id="(isSuccess) ? 'statusSucceed' : 'statusFailed'")
  slot
</template>

<script>

export default {
  props: {
    isSuccess: {
      type: [Boolean, String],
      default: true,
      required: false,
    },
  },
};
</script>

<style lang="scss">
@import 'variables';
.status {
  &__icon {
    width: 150px;
    height: 150px;
    margin: 90px auto;
  }
}
</style>
