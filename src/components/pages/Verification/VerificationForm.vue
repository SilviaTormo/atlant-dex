<template lang="pug">
form.verification-form
  verification-form-group(
    label="Foo Name:",
    validatable,
    valid,
  )
    verification-input.verification-form__input
  verification-form-group(
    label="Last Name:",
    validatable,
  )
    verification-input.verification-form__input(
    )
  verification-form-group(
    label="Country:",
    validatable,
  )
    verification-select.verification-form__input(
    :options="['Foo', 'Bar']",
    )
  verification-form-group(
    label="City:"
    validatable,
  )
    verification-select.verification-form__input(
    :options="['Foo', 'Bar', 'FooBar']",
    )
  verification-form-group(
    label="Street Address:"
    validatable,
  )
    verification-input.verification-form__input(
    )
  verification-form-group(
    label="Postcode:"
    validatable,
  )
    verification-input.verification-form__input(
    )
  verification-form-group(
    label="Phone Number:"
    validatable,
  )
    verification-input.verification-form__input(
    )
  verification-form-group(
    label="Date of Birth:"
    validatable,
  )
    verification-select.verification-form__input.verification-form__input--small(
    placeholder="Day"
    )
    verification-select.verification-form__input.verification-form__input--small(
    placeholder="Month"
    )
    verification-select.verification-form__input.verification-form__input--small(
    placeholder="Year"
    )
  verification-form-group(
    label="ID or Passport #:"
    validatable,
  )
    verification-input.verification-form__input(
    )
</template>

<script>
import VerificationFormGroup from './VerificationFormGroup';
import VerificationInput from './VerificationInput';
import VerificationSelect from './VerificationSelect';

export default {
  name: 'VerificationDropdown',
  components: {
    VerificationSelect,
    VerificationFormGroup,
    VerificationInput,
  },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .verification-form {
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
    /deep/ .verification-form-group__label-text {
      width: 121px;
    }
  }
</style>
