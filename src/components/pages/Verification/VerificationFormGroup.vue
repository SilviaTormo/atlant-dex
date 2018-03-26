<template lang="pug">
.verification-form-group
  label.verification-form-group__label
    .verification-form-group__label-text {{label}}
    .verification-form-group__input
      slot
  Icon.verification-form-group__icon(
    v-if="validatable",
    :id="iconName",
    :class="iconClass"
  )
</template>

<script>
import Icon from 'components/Icon';

export default {
  name: 'VerificationFormGroup',
  computed: {
    iconName() {
      if (this.valid) {
        return 'circle-checked';
      }
      return 'circle-thick';
    },
    iconClass() {
      let className = 'verification-form-group__icon';
      if (this.valid) {
        className += '--success';
      }
      return className;
    },
  },
  props: {
    label: String,
    validatable: Boolean,
    valid: Boolean,
  },
  components: {
    Icon,
  },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~sass/variables";
  .verification-form-group {
    align-items: center;
    display: flex;
    flex-direction: row;
    padding-bottom: 20px;

    &__label {
      display: flex;
      align-items: center;
    }
    &__label-text {
      display: inline-block;
      padding-right: 15px;
    }
    &__input {
      display: flex;
      flex-direction: row;
    }
    &__icon {
      fill: $input-border-color;
      width: 13px;
      height: 13px;
      margin-left: 30px;
      &--success {
        stroke: none;
        fill: $input-success-color;
      }
    }
  }
</style>
