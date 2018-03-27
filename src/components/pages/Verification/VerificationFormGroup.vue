<template lang="pug">
.verificationFormGroup
  label.verificationFormGroup__label
    .verificationFormGroup__labelText {{label}}
    .verificationFormGroup__input
      slot
  Icon.verificationFormGroup__icon(
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
      let className = 'verificationFormGroup__icon';
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
