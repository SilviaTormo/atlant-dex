<template lang="pug">
.status
  Icon.status__icon(v-bind:id="(isSuccess == 'true') ? 'statusSucceed' : 'statusFailed'")
  slot
</template>

<script>
import Icon from 'components/Icon';

export default {
  props: {
    isSuccess: {
      type: [Boolean, String],
      required: false,
    },
  },
  components: {
    Icon,
  },
};
</script>

<style lang="scss">
@import "~variables";
.status {
    &__icon {
        width: 150px;
        height: 150px;
        margin: 90px auto;
    }
}
</style>
