<template lang="pug">
Page(title="Security settings", title2="Security settings" :sidebar="true")
  .securitySettings
    .securitySettings__title Main
    .securitySettings__item
      .securitySettings__param Current Password:
      .securitySettings__value.securitySettings__value--password.securitySettings__value--row {{password}} #[.securitySettings__action Change]
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
      .securitySettings__tfaEnable(:class="{'securitySettings__tfaEnable--enabled' : tfaEnabled}" @click="tfaEnabled = true; tfaStep = 1;") {{tfaEnabled ? "Enabled" : "Enable"}}
      .securitySettings__tfaMethod(v-if="tfaEnabled") via {{tfaMethod.toUpperCase()}}
      .securitySettings__tfaDisable(:class="{'securitySettings__tfaDisable--disabled' : !tfaEnabled}" @click="tfaEnabled = false; tfaStep = 0;") {{tfaEnabled ? "Disable" : "Disabled"}}
    .securitySettings__item
      .securitySettings__param I would like to use:
      .securitySettings__value.securitySettings__value--row.securitySettings__desktopRow
        Radio.securitySettings__tfaOption(name="tFAMethod", value="telegram", v-model="tfaMethod", :checked="tfaMethod=='telegram'") #[.securitySettings__tfaOptionName Telegram]
        Radio.securitySettings__tfaOption(name="tFAMethod", value="sms", v-model="tfaMethod", :checked="tfaMethod=='sms'") #[.securitySettings__tfaOptionName SMS]
        Radio.securitySettings__tfaOption(name="tFAMethod", value="google", v-model="tfaMethod", :checked="tfaMethod=='google'") #[.securitySettings__tfaOptionName Google Auth]
    .securitySettings__item.securitySettings__desktopRow(v-if="tfaStep==1 && requiresNumber")
      .securitySettings__value My phone number
      .securitySettings__value.securitySettings__value--row
        FlagSwitch.securitySettings__dropdown(v-model="country")
        input.securitySettings__input(placeholder="965 296 36 36" v-model="number")
        .securitySettings__action(@click="tfaStep = 2") Save
    .securitySettings__item(v-if="tfaStep==2 && requiresNumber")
      .securitySettings__value Confirmation code has been sent to enable 2FA
      .securitySettings__value.securitySettings__value--row #[input.securitySettings__input(placeholder="1234" v-model="code")] #[.securitySettings__action(@click="tfaStep=0") Confirm]
      .securitySettings__value.securitySettings__value--row #[Icon.securitySettings__resendIcon(id="resend")] #[.securitySettings__action Resend] confirmation code
    .securitySettings__item(v-if="tfaStep==1 && tfaMethod == 'google'")
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
    .securitySettings__item(v-if="tfaStep==2 && tfaMethod == 'google'")
      .securitySettings__value Now scan QR-code below
      QR.securitySettings__qr(text='Yeah0*/-+' size='114')
      .securitySettings__value And enter the one-time password from Google Auth
      .securitySettings__value.securitySettings__value--row #[input.securitySettings__input(v-model="number")] #[.securitySettings__action(@click="tfaStep=0") Confirm]
    .securitySettings__title Other
    .securitySettings__item.securitySettings__desktopRow
      .securitySettings__row Terminate active sessions #[Icon.securitySettings__terminateIcon(id="terminate")]
      .securitySettings__action.securitySettings__action--mobileLeft Terminate
    BButton.accountInfo__button(color="malachite" rounded) Save
</template>

<script>
import Icon from 'components/Icon';
import BButton from 'components/BButton';
import Dropdown from 'components/Dropdown';
import Radio from 'components/Radio';
import QR from 'components/QR';
import FlagSwitch from 'components/FlagSwitch';
import Page from './Page';

export default {
  data() {
    return {
      password: '**********',
      email: {
        value: '****ize@atlant.io',
        verified: true,
      },
      additionalEmail: {
        value: '****ize@gmail.com',
        verified: false,
      },
      tfaEnabled: false,
      tfaMethod: 'telegram',
      number: '',
      country: 'ru',
      tfaStep: 0,
      code: '',
    };
  },
  computed: {
    requiresNumber() {
      return ['telegram', 'sms'].includes(this.tfaMethod);
    },
  },
  components: {
    Page,
    Icon,
    BButton,
    Radio,
    Dropdown,
    FlagSwitch,
    QR,
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
    &--password {
      letter-spacing: 4px;
    }
    &--row {
      display: flex;
      align-items: center;
    }
    &--os {
      &:not(:first-of-type) {
        margin-left: 45px;
      }
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
  &__qr {
    margin-top: 36px;
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
    padding: 7px;
    border-color: #044568;
    background-color: transparent;
    color: #044568;
    &::placeholder{
      color: #044568;
    }
  }
  &__resendIcon {
    height: 14px;
    width: 16px;
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
