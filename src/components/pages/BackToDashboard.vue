<template lang="pug">
.backToDashboard(@click="close()")
  Icon.backToDashboard__arrow(id="arrow_right")
  .backToDashboard__back Back to dashboard
</template>

<script>
import {mapMutations} from 'vuex';
import Icon from '../Icon';

export default {
  methods: {
    ...mapMutations('page', {
      close: 'close',
    }),
  },
  components: {
    Icon,
  },
};
</script>

<style lang="scss">
@import '~variables';

.backToDashboard {
  cursor: pointer;
  display: flex;
  align-items: center;
  &__arrow {
    width: 32px;
    height: 7px;
    fill: $color_yellow;
  }
  &__back {
    margin-left: 24px;
    font-weight: 700;
    text-transform: uppercase;
    color: $color_yellow;
  }
}
</style>
