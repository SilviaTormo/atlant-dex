<template lang="pug">
input.verificationInput(
  type="text",
  :placeholder="placeholder",
  :value="value",
  @input="onInput",
)
</template>

<script>
export default {
  name: 'VerificationInput',
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
  },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~sass/variables";
  .verificationInput {
    background-color: transparent;
    border-radius: 0;
    border: $input-border;
    padding: $input-padding;
    transition: $input-transition;
    width: 100%;
    min-height: $input-height;

    &::placeholder {
      color: $input-placeholder-color;
    }

    &:hover,
    &:focus {
      border-color: $input-border-color-highlight;
    }
  }
</style>
