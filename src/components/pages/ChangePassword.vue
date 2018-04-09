<template lang="pug">
.changePassword
  .changePassword__item(v-if="password.step == 0")
    .changePassword__param Current Password:
    .link.changePassword__value(@click="password.step = 1") Change
  .changePassword__item(v-if="password.step == 1")
    .changePassword__param Old password:
    input.input.changePassword__value(v-model="password.old", :type="inputType")
    .changePassword__param New password:
    input.input.changePassword__value(v-model="password.new", :type="inputType")
    .changePassword__param Repeat password:
    .changePassword__value.changePassword__desktopRow
      input.input(v-model="password.repeat", :type="inputType")
      .changePassword__hiddenError.changePassword__hiddenError--mobile(v-show="validationErrorText") {{validationErrorText}}
      .link.changePassword__action(@click="requestPasswordChange") Confirm
      .link.changePassword__action(@click="cancelPasswordChange") Cancel
    .changePassword__hiddenError.changePassword__hiddenError--desktop(v-if="validationErrorText") {{validationErrorText}}
    Checkbox(v-model="isShowPassword")
      .changePassword__checkboxText Show passwords
  .changePassword__item(v-if="password.step == 2")
    TFA(:onConfirm="confirmPasswordChange", :onCancel="cancelPasswordChange", :onResend="requestPasswordChange")
</template>

<script>
import {required, sameAs, minLength} from 'vuelidate/lib/validators';
import * as Membership from 'services/api/membership';
import TFA from 'components/modals/TFA';
import Checkbox from 'components/Checkbox';

export default {
  data() {
    return {
      password: {
        step: 0,
        old: '',
        new: '',
        repeat: '',
      },
      isShowPassword: false,
    };
  },
  computed: {
    parsePassword() {
      let regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
      return regex.test(this.password.old);
    },
    validationErrorText() {
      if (this.$v.$error) {
        if (this.$v.password.new.$error) {
          return this.$t('passwordValidation.tooShort', {minLength: this.$v.password.new.$params.minLength.min});
        } else if (this.$v.password.repeat.$error) {
          return this.$t('passwordValidation.notMatch');
        }
      }
      return '';
    },
    inputType() {
      return this.isShowPassword ? 'text' : 'password';
    }
  },
  methods: {
    clearInputs() {
      this.password.old = '';
      this.password.new = '';
      this.password.repeat = '';
    },
    setStep(step) {
      this.password.step = step;
    },
    confirmPasswordChange(code) {
      Membership.confirmPasswordChange({
        code,
        oldpassword: this.password.old,
        newpassword: this.password.new,
      }).then(() => {
        this.clearInputs();
        this.setStep(0);
      });
    },
    requestPasswordChange() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return false;
      };
      Membership.requestPasswordChange({
        oldpassword: this.password.old,
        newpassword: this.password.new,
      }).then(() => {
        this.setStep(2);
      });
    },
    cancelPasswordChange() {
      this.clearInputs();
      this.setStep(0);
    },
  },
  components: {
    TFA,
    Checkbox,
  },
  validations: {
    password: {
      new: {
        required,
        minLength: minLength(8)
      },
      repeat: {
        sameAsPassword: sameAs('new')
      }
    }
  }
};
</script>


<style lang="scss">
@import "~sass/bootstrap/media";

.changePassword {
  &__desktopRow {
    display: flex;
    align-items: center;
  }
  &__param {
    font-weight: 700;
  }
  &__value {
    font-weight: 400;
    margin: 10px 0 10px;
  }
  &__action {
    margin: 0 5px 0 19px;
  }
  &__hiddenError {
    color: #f33a3a;
    width: 181px;

    &--mobile {
      display: none;
    }
  }
  &__checkboxText {
    font-size: 12px;
    font-weight: 400;
    line-height: 19px;
    margin-left: 10px;
    padding-top: 5px;
  }
}

@include media-breakpoint-down(md) {
  .changePassword {
    &__desktopRow {
      flex-direction: column;
      align-items: flex-start;
    }
    &__action {
      margin-left: 0;
      margin-top: 17px;
    }
     &__hiddenError {
      color: #f33a3a;
      width: 181px;

      &--mobile {
        display: block;
        margin-top: 10px;
      }
      &--desktop {
        display: none;
      }
    }
  }
}
</style>
