<template lang="pug">
.verification-select
  .verification-select__placeholder(v-if="!value") {{placeholder}}
  Icon.verification-select__triangle(id="triangle2")
  select.verification-select__select(
    :value="value",
    @change="onChange",
  )
    option.verification-select__option(
      v-for="(option, $index) in options",
      :key="$index",
      :value="option",
    ) {{option}}
</template>

<script>
import Icon from 'components/Icon';

export default {
  name: 'VerificationDropdown',
  methods: {
    onChange(e) {
      this.$emit('input', e.target.value);
    },
  },
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    placeholder: {
      type: String,
      default: '-',
    },
    options: Array,
  },
  components: {
    Icon,
  },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "~variables";
.verification-select {
  border: $input-border;
  position: relative;
  transition: $input-transition;
  width: 100%;

  &:hover,
  &:focus {
    border-color: $input-border-color-highlight;
  }

  &__select {
    align-items: center;
    appearance: none;
    background-color: transparent;
    border-radius: 0;
    color: $color_white;
    display: flex;
    font-weight: normal;
    min-height: $input-height;
    padding-right: 35px;
    padding: $input-padding;
    width: 100%;
  }
  &__triangle {
    position: absolute;
    fill: $color_white;
    right: 10px;
    width: 9px;
    height: 5px;
    top: 13px;
    z-index: -1;
  }

  &__placeholder {
    padding: $input-padding;
    position: absolute;
    color: $input-placeholder-color;
    top: 0;
    left: 0;
    line-height: 19px;
    font-size: 14px;
    z-index: -1;
  }
}
</style>
