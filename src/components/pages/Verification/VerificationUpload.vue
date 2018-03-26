<template lang="pug">
.verificationUpload
  .verificationUpload__row
    VerificationUploadExamples
  .verificationUpload__row
    .verificationUpload__item
      VerificationFormGroup(
        label="ID scan:",
      )
        VerificationUploadInput
      .verificationUpload__helpIcon
        Icon(id="help")
    .verificationUpload__item
      VerificationFormGroup(
        label="Selfie holding ID card & signed «Coin.gi» paper:",
      )
        VerificationUploadInput
      .verificationUpload__helpIcon
        Icon(id="help")
</template>

<script>
import Icon from 'components/Icon';
import VerificationUploadExamples from './VerificationUploadExamples';
import VerificationUploadInput from './VerificationUploadInput';
import VerificationFormGroup from './VerificationFormGroup';

export default {
  name: 'VerificationDropdown',
  components: {
    VerificationUploadInput,
    VerificationFormGroup,
    VerificationUploadExamples,
    Icon,
  },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.verificationUpload {
  align-items: center;
  &__row {
    display: flex;
    flex-direction: row;
  }
  &__item {
    max-width: 280px;
    position: relative;
    & + & {
      padding-left: 50px;
    }
  }
  &__helpIcon {
    fill: #ffc600;
    position: absolute;
    right: -25px;
    top: -15px;
  }
}
</style>
