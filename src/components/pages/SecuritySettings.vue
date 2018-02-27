<template lang="pug">
Page(title="Security settings", title2="Security settings" :sidebar="true")
  .securitySettings
    .securitySettings__title Main
    .securitySettings__item(v-if="password.step == 0")
      .securitySettings__param Current Password:
      .link.securitySettings__value(@click="password.step = 1") Change
    .securitySettings__item(v-if="password.step == 1")
      .securitySettings__param Old password:
      input.input.securitySettings__value.securitySettings__value--margins(v-model="password.old" type="password")
      .securitySettings__param New password:
      input.input.securitySettings__value.securitySettings__value--margins(v-model="password.new" type="password")
      .securitySettings__param Repeat password:
      .securitySettings__value.securitySettings__desktopRow.securitySettings__value--margins
        input.input(v-model="password.repeat" type="password")
        .securitySettings__action.securitySettings__action--mobileLeft(@click="requestPasswordChange") Confirm
        .securitySettings__action.securitySettings__action--mobileLeft(@click="cancelPasswordChange") Cancel
    .securitySettings__item(v-if="password.step == 2")
      TFA(:onConfirm="confirmPasswordChange", :onCancel="cancelPasswordChange", :onResend="requestPasswordChange")
    .securitySettings__desktopRow
      .securitySettings__item.securitySettings__item--column
        .securitySettings__param Current Email:
        .securitySettings__value.securitySettings__value--row {{email.value}} #[Icon.securitySettings__icon(v-if="email.verified" id="verified")]
          .securitySettings__action Change
      .securitySettings__item.securitySettings__item--column
        .securitySettings__param Additional Email:
        .securitySettings__value.securitySettings__value--row {{additionalEmail.value}} #[Icon.securitySettings__icon(v-if="email.verified" id="verified")]
          .securitySettings__action Change
    .securitySettings__title 2 factor authentication
    .securitySettings__tfa
      .securitySettings__tfaEnable(:class="{'securitySettings__tfaEnable--enabled' : settings.twoFactorAuthenticationMethod}" @click="tfaStep = 1;") {{settings.twoFactorAuthenticationMethod ? "Enabled" : "Enable"}}
      .securitySettings__tfaMethod(v-if="settings.twoFactorAuthenticationMethod") via {{settings.twoFactorAuthenticationMethod}}
      .securitySettings__tfaDisable(:class="{'securitySettings__tfaDisable--disabled' : !settings.twoFactorAuthenticationMethod}" @click="tfaStep = 0;") {{settings.twoFactorAuthenticationMethod ? "Disable" : "Disabled"}}
    .securitySettings__item
      .securitySettings__param I would like to use:
      .securitySettings__value.securitySettings__value--row.securitySettings__desktopRow
        Radio.securitySettings__tfaOption(name="tFAMethod", :value="2", v-model="tfaMethod", :checked="tfaMethod==2", @change="chooseTFAMethod()") #[.securitySettings__tfaOptionName Telegram]
        Radio.securitySettings__tfaOption(name="tFAMethod", :value="1", v-model="tfaMethod", :checked="tfaMethod==1", @change="chooseTFAMethod()") #[.securitySettings__tfaOptionName SMS]
        Radio.securitySettings__tfaOption(name="tFAMethod", :value="3", v-model="tfaMethod", :checked="tfaMethod==3", @change="chooseTFAMethod()") #[.securitySettings__tfaOptionName Google Auth]
    .securitySettings__item.securitySettings__desktopRow(v-if="tfaStep==1 && requiresNumber")
      .securitySettings__value My phone number
      .securitySettings__value.securitySettings__value--row
        FlagSwitch.securitySettings__dropdown(v-model="country")
        input.input.securitySettings__input(placeholder="965 296 36 36" v-model="number")
        .securitySettings__action(@click="tfaStep = 2") Save
    .securitySettings__item(v-if="tfaStep==2 && requiresNumber")
      TFA(:onConfirm="finish2FA", :onCancel="cancel2FA" text="Confirmation code has been sent to enable 2FA", :method="1")
    .securitySettings__item(v-if="tfaStep==1 && tfaMethod === 3")
      .securitySettings__value.securitySettings__desktopRow You don't have an authentication key #[.securitySettings__action.securitySettings__action--mobileLeft(@click="tfaStep=2") Create key]
      .securitySettings__param.securitySettings__param--margin ***
      .securitySettings__param Please install one of the following apps to generate key:
      .securitySettings__item.securitySettings__desktopRow
        .securitySettings__value.securitySettings__value--row.securitySettings__value--os
          Icon.securitySettings__osIcon(id="android")
          .securitySettings__action Android
        .securitySettings__value.securitySettings__value--row.securitySettings__value--os
          Icon.securitySettings__osIcon(id="ios")
          .securitySettings__action iOS
        .securitySettings__value.securitySettings__value--row.securitySettings__value--os
          Icon.securitySettings__osIcon(id="windows")
          .securitySettings__action Windows phone
      .securitySettings__instruction After installing the app add the key by scanning the QR code or entering it manually.
    .securitySettings__item(v-if="tfaStep==2 && tfaMethod === 3")
      TFA(:onConfirm="finish2FA", :onCancel="cancel2FA" text="Now scan QR-code below and enter the one-time password from Google Auth", :method="3")
    .securitySettings__title Other
    .securitySettings__item.securitySettings__desktopRow
      .securitySettings__row Terminate active sessions #[Icon.securitySettings__terminateIcon(id="terminate")]
      .securitySettings__action.securitySettings__action--mobileLeft Terminate
    BButton.accountInfo__button(color="malachite" rounded) Save
</template>

<script>
import * as Membership from 'services/api/membership';
import {mapState, mapActions} from 'vuex';
import Icon from 'components/Icon';
import BButton from 'components/BButton';
import Dropdown from 'components/Dropdown';
import Radio from 'components/Radio';
import FlagSwitch from 'components/FlagSwitch';
import TFA from 'components/modals/TFA';
import {serverNotification} from 'services/notification';
import Page from './Page';

export default {
  data() {
    return {
      email: {
        value: '****ize@atlant.io',
        verified: true,
      },
      additionalEmail: {
        value: '****ize@gmail.com',
        verified: false,
      },
      tfaMethod: 2,
      number: '',
      country: 'ru',
      password: {
        step: 0,
        old: '',
        new: '',
        repeat: '',
      },
      tfaStep: 0,
    };
  },
  computed: {
    ...mapState('user', {
      settings: 'settings',
    }),
    requiresNumber() {
      return this.tfaMethod < 3;
    },
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
    cancel2FA() {
      this.tfaStep = 0;
    },
    finish2FA() {
      this.tfaStep = 0;
    },
    ...mapActions('user', {
      getProfileData: 'getProfileData',
    }),
    chooseTFAMethod() {
      this.tfaStep = 1;
    },
  },
  created() {
    this.getProfileData();
  },
  components: {
    Page,
    Icon,
    BButton,
    Radio,
    Dropdown,
    FlagSwitch,
    TFA,
  },
};
</script>

<style lang="scss">
@import "~sass/bootstrap/media";

.securitySettings {
  max-width: 600px;
  &__title {
    font-size: 16px;
    font-weight: 700;
    line-height: 25px;
    text-transform: uppercase;
    margin-bottom: 40px;
  }
  &__desktopRow {
    display: flex;
    align-items: center;
  }
  &__row {
    display: flex;
  }
  &__item {
    font-size: 14px;
    line-height: 19px;
    margin-bottom: 43px;
    &--column {
      width: 50%;
    }
  }
  &__param {
    font-weight: 700;
    &--margin {
      margin-top: 38px;
    }
  }
  &__value {
    margin-top: 18px;
    font-weight: 400;
    &--row {
      display: flex;
      align-items: center;
    }
    &--os {
      &:not(:first-of-type) {
        margin-left: 45px;
      }
    }
    &--margins {
      margin: 10px 0 10px;
    }
  }
  &__action {
    color: #ffc600;
    text-decoration: underline;
    margin: 0 5px 0 19px;
    cursor: pointer;
    letter-spacing: normal;
  }
  &__icon{
    $size: 13px;
    height: $size;
    width: $size;
    margin-left: 14px;
  }
  &__tfa {
    display: flex;
    font-size: 14px;
    line-height: 19px;
    margin-bottom: 50px;
  }
  &__tfaEnable {
    font-weight: 400;
    color: #7ed420;
    text-decoration: underline;
    cursor: pointer;
    &--enabled {
      font-weight: 700;
      text-decoration: none;
      cursor: default;
    }
  }
  &__tfaMethod {
    margin-left: 5px;
    font-weight: 700;
    color: #044161;
    text-decoration: none;
  }
  &__tfaDisable {
    margin-left: 30px;
    color: #f33a3a;
    font-weight: 400;
    text-decoration: underline;
    cursor: pointer;
    &--disabled {
      font-weight: 700;
      text-decoration: none;
      cursor: pointer;
    }
  }
  &__tfaOption {
    &:not(:first-of-type){
      margin-left: 28px;
    }
  }
  &__tfaOptionName {
    margin-left: 18px;
  }
  &__osIcon {
    $size: 24px;
    height: $size;
    width: $size;
  }
  &__instruction {
    font-size: 12px;
    line-height: 24px;
  }
  &__dropdown {
    width: 40px;
    margin-left: 28px;
    margin-right: 10px;
  }
  &__input {
    width: 120px;
  }
  &__terminateIcon {
    height: 19px;
    width: 25px;
    margin-left: 16px;
  }
  &__button {
    padding: 8px 44px;
    font-size: 16px;
    font-weight: 900;
    text-transform: uppercase;
    margin-top: 20px;
  }
  &__qr {
    margin-top: 36px;
  }
}

@include media-breakpoint-down(md) {
  .securitySettings {
    &__desktopRow {
      display: block;
    }
    &__item {
      &--column {
        width: 100%;
      }
    }
    &__value {
      &--os {
        &:not(:first-of-type) {
          margin-left: 0;
        }
      }
    }
    &__tfaOption {
      &:not(:first-of-type){
        margin-left: 0;
        margin-top: 20px;
      }
    }
    &__action {
      &--mobileLeft {
        margin-left: 0;
        margin-top: 17px;
      }
    }
    &__dropdown {
      margin-left: 0;
    }
  }
}
</style>
