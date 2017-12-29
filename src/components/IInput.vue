<template lang='pug'>
.inputField
  input.inputField__input(:placeholder="placeholder", @change="change", :type="type" required)
  .inputField__line
  label.inputField__label(v-if="label") {{label}}
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
    type: {
      type: String,
      default: 'text',
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
  position: relative;
  margin-bottom: 45px;
  &__label {
    color: #ffffff;
    font-size: 18px;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 5px;
    top: 10px;
    transition: 0.2s ease all;
  }

  &__input {
    font-size: 18px;
    padding: 10px 10px 10px 5px;
    display: block;
    width: 100%;
    border: none;
    border-bottom: 1px solid #ffffff;
    background: none;
  }

  &__line {
    position: relative;
    display: block;
    &:after,
    &:before {
      position: absolute;
      content: '';
      height: 2px;
      width: 0;
      bottom: 0;
      background: #ffffff;
      transition: 0.2s ease all;
    }
    &:before {
      left: 50%;
    }
    &:after {
      right: 50%;
    }
  }
  //Active
  &__input:focus ~ &__line:after,
  &__input:focus ~ &__line:before {
    width: 50%;
  }

  &__input:focus ~ &__label,
  &__input:valid ~ &__label {
    top: -20px;
    font-size: 14px;
    color: #ffffff;
}
}
</style>
