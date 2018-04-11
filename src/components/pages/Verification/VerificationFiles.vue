<template lang="pug">
.verificationFiles
  .verificationFiles__item
    VerificationFormGroup(
      label="ID scan:",
      label-for="null",
    )
      VerificationFileInput(
        :image-src="idImage",
        v-model="verification.passportScan",
        :validation="getFieldValidationStatus('passportScan')"
      )
  .verificationFiles__item
    VerificationFormGroup(
    label="Proof of address:",
    label-for="null",
    )
      VerificationFileInput(
      :image-src="passportImage",
      v-model="verification.proofOfResidenceScan",
      :validation="getFieldValidationStatus('proofOfResidenceScan')",
      )
  .verificationFiles__item
    VerificationFormGroup(
      label="Selfie holding ID card & signed «Coin.gi» paper:",
      label-for="null",
    )
      VerificationFileInput(
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
    VerificationFormGroup,
    VerificationFileInput,
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

  /deep/ .verificationFormGroup__labelText {
    width: 150px;
  }
}
</style>
