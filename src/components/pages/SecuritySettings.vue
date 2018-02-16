<template lang="pug">
Page(title="Security settings", title2="Security settings" :sidebar="true")
  .securitySettings
    .securitySettings__title Main
    .securitySettings__item
      .securitySettings__param Current Password:
      .securitySettings__value.securitySettings__value--verifiable {{password}}
        .securitySettings__action Change
    .securitySettings__row
      .securitySettings__item.securitySettings__item--row
        .securitySettings__param Current Email:
        .securitySettings__value.securitySettings__value--verifiable {{email.value}} #[Icon.securitySettings__icon(v-if="email.verified" id="verified")]
          .securitySettings__action Change
      .securitySettings__item.securitySettings__item--row
        .securitySettings__param Additional Email:
        .securitySettings__value.securitySettings__value--verifiable {{additionalEmail.value}} #[Icon.securitySettings__icon(v-if="email.verified" id="verified")]
          .securitySettings__action Change
    .securitySettings__title 2 factor authentication
    .securitySettings__item
      .securitySettings__param I would like to use:
      .securitySettings__value.securitySettings__value--row
        Radio.securitySettings__tfaOption(name="tFAMethod", value="telegram", v-model="tfaMethod", :checked="tfaMethod=='telegram'") #[.securitySettings__tfaOptionName Telegram]
        Radio.securitySettings__tfaOption(name="tFAMethod", value="sms", v-model="tfaMethod", :checked="tfaMethod=='sms'") #[.securitySettings__tfaOptionName SMS]
        Radio.securitySettings__tfaOption(name="tFAMethod", value="google", v-model="tfaMethod", :checked="tfaMethod=='google'") #[.securitySettings__tfaOptionName Google Auth]
      .securitySettings__value.securitySettings__value--row My phone number
        Dropdown.securitySettings__dropdown(:options="countries" v-model="country")
        input.securitySettings__input(placeholder="965 296 36 36" v-model="number")
        .securitySettings__action Save
    .securitySettings__title Other
    .securitySettings__item.securitySettings__sessions Terminate active sessions #[Icon.securitySettings__terminateIcon(id="terminate")] #[.securitySettings__action Terminate]
    BButton.accountInfo__button(color="malachite" rounded) Save
</template>

<script>
import Icon from 'components/Icon';
import BButton from 'components/BButton';
import Dropdown from 'components/Dropdown';
import Radio from 'components/Radio';
import Page from './Page';

export default {
  data() {
    return {
      password: '* * * * * * * * * *',
      email: {
        value: '****ize@atlant.io',
        verified: true,
      },
      additionalEmail: {
        value: '****ize@gmail.com',
        verified: false,
      },
      tfaMethod: 'sms',
      number: '',
      country: 'RUS',
      countries: ['RUS', 'USA', 'GER'],
    };
  },
  components: {
    Page,
    Icon,
    BButton,
    Radio,
    Dropdown,
  },
};
</script>

<style lang="scss">
.securitySettings {
  max-width: 600px;
  &__title {
    font-size: 16px;
    font-weight: 700;
    line-height: 25px;
    text-transform: uppercase;
    margin-bottom: 40px;
  }
  &__row {
    display: flex;
  }
  &__item {
    font-size: 14px;
    line-height: 19px;
    margin-bottom: 43px;
    &--row {
      width: 50%;
    }
  }
  &__param {
    font-weight: 700;
  }
  &__value {
    margin-top: 18px;
    font-weight: 400;
    &--verifiable {
      display: flex;
      align-items: center;
    }
    &--row {
      display: flex;
      align-items: center;
    }
  }
  &__action {
    color: #ffc600;
    text-decoration: underline;
    margin-left: 19px;
    cursor: pointer;
  }
  &__icon{
    $size: 13px;
    height: $size;
    width: $size;
    margin-left: 14px;
  }
  &__tfaOption {
    &:not(:first-of-type){
      margin-left: 28px;
    }
  }
  &__tfaOptionName {
    margin-left: 18px;
  }
  &__dropdown {
    width: 50px;
    margin-left: 28px;
  }
  &__input {
    width: 130px;
    padding: 7px;
    margin-left: 10px;
    border-color: #044568;
    background-color: transparent;
    color: #044568;
    &::placeholder{
      color: #044568;
    }
  }
  &__sessions {
    display: flex;
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
</style>
