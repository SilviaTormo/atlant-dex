<template lang="pug">
div.verificationInput(
  :class="{'verificationInput--focused': isFocused}"
)
  span.verificationInput__helper(v-if="helper") {{helper}}
  input.verificationInput__input(
    type="text",
    :placeholder="placeholder",
    :value="value",
    @input="onInput",
    @focus="isFocused = true",
    @blur="isFocused = false",
  )
</template>

<script>
export default {
  name: 'VerificationInput',
  data() {
    return {
      isFocused: false,
    };
  },
  methods: {
    onInput(e) {
      this.$emit('input', e.target.value);
    },
  },
  props: {
    placeholder: {
      default: '-',
      type: String,
    },
    value: String,
    helper: String,
  },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~variables";
  .verificationInput {
    background-color: transparent;
    border: $input-border;
    padding: $input-padding;
    transition: $input-transition;
    min-height: $input-height;
    line-height: 16px;
    display: flex;
    flex-direction: row;

    &:hover,
    &:focus,
    &--focused {
      border-color: $input-border-color-highlight;
    }

    &__helper {
      color: $input-placeholder-color;
      padding-right: 7px;
    }

    &__input {
      background-color: transparent;
      border:none;
      height: 100%;
      padding: 0;
      border-radius: 0;
      min-width: 50px;

      &::placeholder {
        color: $input-placeholder-color;
      }
    }
  }
</style>
