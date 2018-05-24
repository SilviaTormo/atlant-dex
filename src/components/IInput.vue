<template lang='pug'>
.inputField
  input.inputField__input(:value="value", :placeholder="placeholder", @input="change", :type="type" required, :class="{'inputField__input--center' : center}")
  .inputField__line
  label.inputField__label(v-if="label") {{label}}
</template>

<script>
import {mapState, mapMutations} from 'vuex';

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
    value: {
      type: String,
      default: '',
      required: false,
    },
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
    center: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
};
</script>

<style lang='scss' scoped>
@import 'variables';
.inputField {
  position: relative;
  &__label {
    color: $color_white;
    white-space: nowrap;
    font-size: inherit;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 5px;
    top: 10px;
    transition: 0.2s ease all;
  }

  &__input {
    font-size: inherit;
    padding: 10px 10px 10px 5px;
    display: block;
    width: 100%;
    border: none;
    border-bottom: 1px solid $color_white;
    background: none;
    &--center {
      text-align: center;
    }
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
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
      background: $color_white;
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
    color: $color_white;
}
}
</style>
