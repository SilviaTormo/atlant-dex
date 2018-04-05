<template lang="pug">
.changePassword
  .changePassword__item(v-if="password.step == 0")
    .changePassword__param Current Password:
    .link.changePassword__value(@click="password.step = 1") Change
  .changePassword__item(v-if="password.step == 1")
    .changePassword__param Old password:
    input.input.changePassword__value(v-model="password.old" type="password")
    .changePassword__param New password:
    input.input.changePassword__value(v-model="password.new" type="password")
    .changePassword__param Repeat password:
    .changePassword__value.changePassword__desktopRow
      input.input(v-model="password.repeat" type="password")
      .link.changePassword__action(@click="requestPasswordChange") Confirm
      .link.changePassword__action(@click="cancelPasswordChange") Cancel
    .changePassword__hiddenError(v-show="isShowPasswordError") At least 8 symbols including #[br] 1 number and 1 capital letter.
  .changePassword__item(v-if="password.step == 2")
    TFA(:onConfirm="confirmPasswordChange", :onCancel="cancelPasswordChange", :onResend="requestPasswordChange")
</template>

<script>
import * as Membership from 'services/api/membership';
import TFA from 'components/modals/TFA';

export default {
  data() {
    return {
      password: {
        step: 0,
        old: '',
        new: '',
        repeat: '',
      },
      isShowPasswordError: false,
    };
  },
  computed: {
    parsePassword() {
      let regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
      console.log('regex.test(this.password)', regex.test(this.password));
      console.log('this.password', this.password.old);

      return regex.test(this.password.old);
    },
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
      if (!this.parsePassword) {
        this.isShowPasswordError = true;
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
  watch: {
    password: {
     handler(val) {
       this.isShowPasswordError = false;
     },
     deep: true,
    },
  },
  components: {
    TFA,
  },
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
  }
}
</style>
