<template lang="pug">
form.verificationForm
  VerificationFormGroup(
    label="Foo Name:",
    validatable,
    valid,
  )
    VerificationInput.verificationForm__input
  VerificationFormGroup(
    label="Last Name:",
    validatable,
  )
    VerificationInput.verificationForm__input(
    )
  VerificationFormGroup(
    label="Country:",
    validatable,
  )
    VerificationSelect.verificationForm__input(
      :options="['Foo', 'Bar']",
    )
  VerificationFormGroup(
    label="City:"
    validatable,
  )
    VerificationSelect.verificationForm__input(
      :options="['Foo', 'Bar', 'FooBar']",
    )
  VerificationFormGroup(
    label="Street Address:"
    validatable,
  )
    VerificationInput.verificationForm__input(
    )
  VerificationFormGroup(
    label="Postcode:"
    validatable,
  )
    VerificationInput.verificationForm__input(
    )
  VerificationFormGroup(
    label="Phone Number:"
    validatable,
  )
    VerificationInput.verificationForm__input(
    )
  VerificationFormGroup(
    label="Date of Birth:"
    validatable,
  )
    VerificationSelect.verificationForm__input.verificationForm__input--small(
      placeholder="Day",
      :options="['Foo', 'Bar']",
    )
    VerificationSelect.verificationForm__input.verificationForm__input--small(
      placeholder="Month",
      :options="['Foo', 'Bar']",
    )
    VerificationSelect.verificationForm__input.verificationForm__input--small(
      placeholder="Year",
      :options="['Foo', 'Bar']",
    )
  VerificationFormGroup(
    label="ID or Passport #:"
    validatable,
  )
    VerificationInput.verificationForm__input(
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
