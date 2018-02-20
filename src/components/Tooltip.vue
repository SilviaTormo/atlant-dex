<template lang="pug">
.tooltip(:class="{'tooltip--bottom': bottom, 'tooltip--middle': middle}")
  slot
</template>

<script>
export default {
  props: {
    bottom: {
      type: Boolean,
      required: false,
      default: false,
    },
    middle: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>

<style lang="scss">
  @import "~variables";
  .tooltip {
    $arrow_left: 18px;
    $arrow_width: 11px;
    $arrow_height: 12px;
    position: absolute;
    // min-width: 256px;
    // padding: 20px 20px 13px 20px;
    overflow: hidden;
    background-color: #fff;
    box-shadow: 0px 0px 15px 0px rgba(40, 75, 105, 0.15);
    &::after
    {
      content: '';
      position: absolute;
      border-style: solid;
      border-width: 0 $arrow_width $arrow_height;
      border-color: #FFFFFF transparent;
      display: block;
      width: 0;
      z-index: 1;
      top: -$arrow_height;
      left: $arrow_left;
    }
    &::before
    {
      content: '';
      position: absolute;
      border-style: solid;
      border-width: 0 $arrow_width $arrow_height;
      border-color: transparent;
      display: block;
      width: 0;
      z-index: 0;
      top: -($arrow_height + 1);
      left: $arrow_left;
    }
    &--bottom {
      top: initial !important;
      bottom: calc(100% + 32px);
      &::after, &::before {
        top: 100%;
        transform: rotate(180deg);
      }
    }
    &--middle {
      &::after, &::before {
        left: calc(50% - ((#{$arrow_width} + #{$arrow_height}) / 2));
      }
    }
  }
</style>
