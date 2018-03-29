<template lang="pug">
.verificationFiles
  .verificationFiles__item
    VerificationFormGroup(
      label="ID scan:",
    )
      VerificationFileInput(
        :image-src="idImage"
      )
  .verificationFiles__item
    VerificationFormGroup(
      label="Selfie holding ID card & signed «Coin.gi» paper:",
    )
      VerificationFileInput(
        :image-src="passportImage"
      )
  .verificationFiles__item
    VerificationFormGroup(
      label="Proof of address:",
    )
      VerificationFileInput(
        :image-src="selfieImage"
      )
</template>

<script>
import idImage from 'assets/images/example-id.png';
import passportImage from 'assets/images/example-passport.png';
import selfieImage from 'assets/images/example-selfie.png';
import VerificationFormGroup from './VerificationFormGroup';
import VerificationFileInput from './VerificationFileInput';

export default {
  name: 'VerificationFiles',
  data() {
    return {
      idImage,
      passportImage,
      selfieImage,
    };
  },
  components: {
    VerificationFormGroup,
    VerificationFileInput,
  },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.verificationFiles {
  align-items: center;
  padding: 10px 0;
  /*&__row {*/
    /*display: flex;*/
    /*flex-direction: row;*/
    /*&--examples {*/
      /*padding-bottom: 30px;*/
    /*}*/
  /*}*/
  &__item {
    position: relative;
    padding-top: 15px;
  }

  /deep/ .verificationFormGroup__labelText {
    width: 150px;
  }
}
</style>
