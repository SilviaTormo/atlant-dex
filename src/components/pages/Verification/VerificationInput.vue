<template lang="pug">
input.verificationInput(
  type="text",
  :placeholder="placeholder",
)
</template>

<script>
export default {
  name: 'VerificationInput',
  props: {
    placeholder: {
      default: '-',
      type: String,
    },
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
