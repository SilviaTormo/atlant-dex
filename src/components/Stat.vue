<template lang="pug">
.stat
  .stat__label {{label}}
  .stat__value {{value}}
</template>

<script>
// import {mapGetters, mapActions} from 'vuex';
import Icon from './Icon';

export default {
  props: {
    label: {
      type: String,
      default: '',
      required: true,
    },
    value: {
      type: [Number, String],
      default: 0,
      required: true,
    },
    change: {
      type: Number,
      default: 0,
      required: false,
    },
  },
  components: {
    Icon,
  },
};
</script>

<style lang="scss">
.stat {
  display: flex;
  align-items: flex-end;
  &__label {
    margin-right: 10px;
  }
  &__value {
    font-size: 18px;
    line-height: 100%;
  }
}
</style>
