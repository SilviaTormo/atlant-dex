<template lang='pug'>
.inputField
  label.inputField__label(v-if="label") {{label}}
  input.inputField__text(:placeholder="placeholder", @change="change")
  .inputField__details
</template>

<script>
import {mapState, mapMutations} from 'vuex';
import Icon from './Icon';

export default {
  model: {
    event: 'change',
  },
  computed: {
    ...mapState('misc', {
      textValues: (state) => state.values,
    }),
  },
  methods: {
    ...mapMutations('misc', {
      setInput: 'setInput',
    }),
    change(e) {
      this.$emit('change', e.target.value);
    },
  },
  props: {
    label: {
      type: [String, Number],
      default: '',
      required: false,
    },
    placeholder: {
      type: [String],
      default: '',
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
    font-size: 14px;
    &::placeholder {
      text-align: center;
    }
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
