<template lang='pug'>
.inputField
  label.inputField__label(v-if="label") {{label}}
  input.inputField__text(:name="name")
  .inputField__details Details
</template>

<script>
import Icon from './Icon';

export default {
  model: {
    prop: 'cModel',
    event: 'change',
  },
  methods: {
  },
  mounted() {

  },
  props: {
    name: {
      type: [String, Number],
      default: '',
      required: true,
    },
    label: {
      type: [String, Number],
      default: '',
      required: false,
    },
    validation: {
      type: Function,
      required: false,
    },
  },
  components: {
    Icon,
  },
};

</script>

<style lang='scss' scoped>
@import "~variables";
.inputField {
  width: 100%;
  display: flex;
  flex-direction: column;
  &__label {
    font-size: 14px;
    font-weight: bold;
  }
  &__text {
    border: none;
    background-color: transparent;
    padding: 0;
    line-height: 34px;
    font-size: 24px;
  }
  &__details{
    width: 100%;
    position: relative;
    font-size: 14px;
    overflow: hidden;
    font-family: monospace;
    padding-top: 5px;
    &::before{
      line-height: 0.3em;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 0;
      content: "—————————————————————————————————————————————————————————————————————";
    }
  }
}
</style>
