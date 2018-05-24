<template lang='pug'>
label.checkbox
  input.checkbox__input(type="checkbox", @change="change", :checked="value")
  .checkbox__icon(:class="'checkbox__icon--' + ((color === 'green') ? 'green' : 'yellow')")
  .checkbox__text(v-if="label") {{label}}
  slot
</template>

<script>

export default {
  model: {
    event: 'change',
  },
  methods: {
    change(e) {
      this.$emit('change', e.target.checked);
    },
  },
  props: {
    value: {
      type: [String, Number, Boolean],
      default: '',
      required: false,
    },
    label: {
      type: [String, Number],
      default: '',
      required: false,
    },
    color: {
      type: [String],
      default: 'green',
    },
  },
};

</script>

<style lang='scss' scoped>
@import 'variables';
$ROOT: "checkbox";
.#{$ROOT} {
  display: flex;
  align-items: center;
  cursor: pointer;
  &__input {
    position: absolute;
    clip: rect(0 0 0 0);
    width: 1px;
    height: 1px;
    margin: -1px;
    &:checked {
      & + .#{$ROOT}__icon {
        &--green {
          border-color: $color_green;
          background-color: $color_green;
        }
        &--yellow {
          border-color: $color_yellow;
          background-color: $color_yellow;
        }
      }
    }
  }
  &__icon {
    $size: 17px;
    width: $size;
    height: $size;
    border-radius: 50%;
    border-style: solid;
    border-width: 2px;
    border-color: $color_yellow;
    flex-shrink: 0;
    transition: border-color .2s;
    transition: background-color .2s;
  }
  &__text {
    font-size: 12px;
    font-weight: bold;
    margin-left: 10px;
    color: inherit;
    text-transform: uppercase;
  }
}
</style>
