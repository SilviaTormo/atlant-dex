<template lang="pug">
  .verificationUploadExamples(:class="{'verificationUploadExamples--open': examplesShow}")
    .verificationUploadExamples__container
      .verificationUploadExamples__img(
        :style="{backgroundImage: `url('${idImage}')`}"
      )
      .verificationUploadExamples__separator or
      .verificationUploadExamples__img(
        :style="{backgroundImage: `url('${passportImage}')`}"
      )
      .verificationUploadExamples__separator.verificationUploadExamples__separator--plus +
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
  props: {
    examplesShow: Boolean,
  },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~sass/variables";
  .verificationUploadExamples {
    max-height: 0;
    transition: max-height 1s ease;
    overflow: hidden;
    &--open {
      max-height: 250px;
    }

    &__container {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding-bottom: 30px;;
    }

    &__img {
      width: 122px;
      height: 174px;
      background: no-repeat center/contain;
      filter: drop-shadow(0 25px 3px rgba(0, 0, 0, 0.15));
    }
    &__separator {
      color: $input-placeholder-color;
      padding: 0 20px;
      font-weight: bold;
      &--plus {
        font-size: 25px;
      }
    }
  }
</style>
