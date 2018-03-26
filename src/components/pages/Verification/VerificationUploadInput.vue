<template lang="pug">
  .verificationUploadInput
</template>

<script>
export default {
  name: 'VerificationUploadInput',
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~sass/variables";
  .verificationUploadInput {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 96px;
    width: 96px;
    border: 1px dashed $input-border-color;
    &:before {
      content: '+';
      font-size: 30px;
      font-weight: bold;
    }
  }
</style>
