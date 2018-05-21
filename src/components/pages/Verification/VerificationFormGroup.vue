<template lang="pug">
.verificationFormGroup
  label.verificationFormGroup__label(:for="labelFor")
    .verificationFormGroup__labelText {{label}}
    .verificationFormGroup__input
      slot
      Icon.verificationFormGroup__icon(
        v-if="validation",
        :id="iconName",
        :class="`verificationFormGroup__icon--${validation}`"
  )
</template>

<script>
import Icon from '@/components/Icon';

export default {
  name: 'VerificationFormGroup',
  computed: {
    iconName() {
      if (this.validation === 'valid') {
        return 'circle-checked';
      }
      return 'circle-thick';
    },
  },
  props: {
    label: String,
    validation: [Boolean, String],
    labelFor: String,
  },
  components: {
    Icon,
  },
};
</script>

<style lang="scss">
  @import "~variables";
  .verificationFormGroup {
    align-items: center;
    display: flex;
    flex-direction: row;
    padding-bottom: 20px;

    &__label {
      display: flex;
      align-items: center;
    }
    &__labelText {
      display: inline-block;
      padding-right: 15px;
      width: 121px;
    }
    &__input {
      display: flex;
      align-items: center;
    }
    &__icon {
      fill: $input-border-color;
      width: 13px;
      height: 13px;
      margin-left: 30px;
      &--error {
        fill: $input-error-color;
      }
      &--valid {
        stroke: none;
        fill: $input-valid-color;
      }
    }
  }
</style>
