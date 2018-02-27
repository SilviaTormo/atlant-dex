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
  .changePassword__item(v-if="password.step == 2")
    TFA(:onConfirm="confirmPasswordChange", :onCancel="cancelPasswordChange", :onResend="requestPasswordChange", :method="settings.twoFactorAuthenticationMethod")
</template>

<script>
import * as Membership from 'services/api/membership';
import {mapState} from 'vuex';
import TFA from 'components/modals/TFA';
import {serverNotification} from 'services/notification';

export default {
  data() {
    return {
      password: {
        step: 0,
        old: '',
        new: '',
        repeat: '',
      },
    };
  },
  computed: {
    ...mapState('user', {
      settings: 'settings',
    }),
  },
  methods: {
    confirmPasswordChange(code) {
      Membership.confirmPasswordChange({
        code,
        oldpassword: this.password.old,
        newpassword: this.password.new,
      }).then(() => {
        this.password.step = 0;
      }).catch((err) => {
        serverNotification(err);
      });
    },
    requestPasswordChange() {
      Membership.requestPasswordChange({
        oldpassword: this.password.old,
        newpassword: this.password.new,
      }).then(() => {
        this.password.step = 2;
      }).catch((err) => {
        serverNotification(err);
      });
    },
    cancelPasswordChange() {
      this.password.step = 0;
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
