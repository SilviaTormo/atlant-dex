<template lang="pug">
  .verificationUploadExamples
    .verificationUploadExamples__img(
      :style="{backgroundImage: `url('${idImage}')`}"
    )
    .verificationUploadExamples__img(
      :style="{backgroundImage: `url('${passportImage}')`}"
    )
    .verificationUploadExamples__img(
      :style="{backgroundImage: `url('${selfieImage}')`}"
    )
</template>

<script>
import idImage from 'assets/images/example-id.png';
import passportImage from 'assets/images/example-passport.png';
import selfieImage from 'assets/images/example-selfie.png';

export default {
  name: 'VerificationUploadExamples',
  data() {
      return {
        idImage,
        passportImage,
        selfieImage,
      };
  },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .verificationUploadExamples {
    display: flex;
    flex-direction: row;

    &__img {
      width: 122px;
      height: 174px;
      background: no-repeat center/contain;
    }
  }
</style>
