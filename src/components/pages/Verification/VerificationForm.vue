<template lang="pug">
form.verificationForm
  VerificationFormGroup(
    label="First Name:",
    :validation="getFieldValidationStatus('firstName')"
  )
    VerificationInput.verificationForm__input(v-model="verification.firstName")
  VerificationFormGroup(
    label="Last Name:",
    :validation="getFieldValidationStatus('lastName')"
  )
    VerificationInput.verificationForm__input(v-model="verification.lastName")
  VerificationFormGroup(
    label="Country:",
    :validation="getFieldValidationStatus('country')",
    label-for="null",
  )
    VerificationSelect.verificationForm__input(
      :options="countryData",
      label="name",
      v-model="verification.country",
    )
  VerificationFormGroup(
    label="City:",
    :validation="getFieldValidationStatus('city')"
    label-for="null",
  )
    VerificationSelect.verificationForm__input(
      :options="['Foo', 'Bar', 'FooBar']",
      v-model="verification.city",
    )
  VerificationFormGroup(
    label="Street Address:",
    :validation="getFieldValidationStatus('address')"
  )
    VerificationInput.verificationForm__input(v-model="verification.address")
  VerificationFormGroup(
    label="Postcode:",
    :validation="getFieldValidationStatus('postCode')"
  )
    VerificationInput.verificationForm__input(v-model="verification.postCode")
  VerificationFormGroup(
    label="Phone Number:",
    :validation="getFieldValidationStatus('phoneNumber')"
  )
    VerificationInput.verificationForm__input(
      v-model="verification.phoneNumber",
      :helper="phoneCode"
    )
  VerificationFormGroup(
    label="Date of Birth:",
    :validation="getFieldValidationStatus('birthday')"
    label-for="null",
  )
    VerificationSelect.verificationForm__input.verificationForm__input--small(
      placeholder="Day",
      :options="birthdayDays",
      v-model="verification.day",
    )
    VerificationSelect.verificationForm__input.verificationForm__input--small(
      placeholder="Month",
      :options="birthdayMonths",
      v-model="verification.month",
    )
    VerificationSelect.verificationForm__input.verificationForm__input--small(
      placeholder="Year",
      :options="birthdayYears",
      v-model="verification.year"
    )
  VerificationFormGroup(
    label="ID or Passport #:",
    :validation="getFieldValidationStatus('passportId')"
  )
    VerificationInput.verificationForm__input(v-model="verification.passportId")
</template>

<script>
import {mapState} from 'vuex';
import {countryData} from 'services/countries';
import {birthdayDays, birthdayYears, birthdayMonths} from 'services/birthday';
import VerificationFormGroup from './VerificationFormGroup';
import VerificationInput from './VerificationInput';
import VerificationSelect from './VerificationSelect';

export default {
  name: 'VerificationForm',
  data() {
    return {
      countryData,
      birthdayDays,
      birthdayYears,
      birthdayMonths,
    };
  },
  computed: {
      ...mapState('verify', [
          'verification',
      ]),
      phoneCode() {
        let country = countryData[this.verification.country];
        return (country && country.code) ? country.code : null;
      },
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
    VerificationSelect,
    VerificationFormGroup,
    VerificationInput,
  },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .verificationForm {
    & &__input {
      width: 174px;
      &--small {
        width: 84px;
      }
    }
    &__input--small {
      & + & {
        margin-left: 25px;
      }
    }
    /deep/ .verificationFormGroup__labelText {
      width: 121px;
    }
  }
</style>
