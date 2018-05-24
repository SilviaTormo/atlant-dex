<template lang="pug">
.verificationFiles
  .verificationFiles__item
    VerificationPageFormGroup(
      label="ID scan:",
      label-for="null",
    )
      VerificationPageFilesInput(
        :image-src="idImage",
        v-model="verification.passportScan",
        :validation="getFieldValidationStatus('passportScan')"
      )
  .verificationFiles__item
    VerificationPageFormGroup(
    label="Proof of address:",
    label-for="null",
    )
      VerificationPageFilesInput(
      :image-src="passportImage",
      v-model="verification.proofOfResidenceScan",
      :validation="getFieldValidationStatus('proofOfResidenceScan')",
      )
  .verificationFiles__item
    VerificationPageFormGroup(
      label="Selfie holding ID card & signed «ATLANT» paper:",
      label-for="null",
    )
      VerificationPageFilesInput(
        :image-src="selfieImage",
        v-model="verification.selfie",
        :validation="getFieldValidationStatus('selfie')",
      )
</template>

<script>
import {mapState} from 'vuex';
import idImage from 'assets/images/example-id.png';
import passportImage from 'assets/images/example-passport.png';
import selfieImage from 'assets/images/example-selfie.png';
import VerificationPageFormGroup from 'components/VerificationPageFormGroup';
import VerificationPageFilesInput from 'components/VerificationPageFilesInput';

export default {
  name: 'VerificationFiles',
  data() {
    return {
      idImage,
      passportImage,
      selfieImage,
    };
  },
  computed: {
    ...mapState('verify', [
      'verification',
    ]),
  },
  methods: {
    getFieldValidationStatus(name) {
      const $v = this.validations[name] ? this.validations : this.validations.verification;
      if ($v[name].$error) return 'error';
      return $v[name].$invalid ? 'invalid' : 'valid';
    },
  },
  props: {
    validations: Object,
  },
  components: {
    VerificationPageFormGroup,
    VerificationPageFilesInput,
  },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.verificationFiles {
  align-items: center;
  padding: 10px 0;
  &__item {
    position: relative;
    padding-top: 15px;
  }

  /deep/ .VerificationPageFormGroup__labelText {
    width: 150px;
  }
}
</style>
