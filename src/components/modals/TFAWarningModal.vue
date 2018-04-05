<template lang="pug">
  Modal
    .tfaWarning
      .tfaWarning__title Your account is not secure
      Icon.tfaWarning__icon(id="statusFailed")
      .tfaWarning__text Please, enable 2 factor authorization to protect your account
      BButton( rounded caps ) OK, enable 2FA
      .tfaWarning__link(role="button") No, thanks
</template>

<script>
import Modal from 'components/modals/Modal';
import BButton from 'components/BButton';
import Icon from 'components/Icon';

export default {
  name: 'TFAWarningModal',
  components: {
    Modal,
    BButton,
    Icon,
  },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .tfaWarning {
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 95vh;
    justify-content: space-around;
    max-height: 600px;
    text-align: center;

    &__title {
      color: #ffc600;
      font-size: 18px;
      font-weight: 900;
      text-transform: uppercase;
    }
    &__iconWrap {
      text-align: center;
    }
    &__icon {
      display: inline-block;
      height: 111px;
      width: 111px;
    }
    &__text {
      color: #fff;
      font-size: 20px;
      line-height: 35px;
      font-weight: 300;
      max-width: 400px;
    }
    &__link {
      $color: #f7b933;
      color: $color;
      cursor: pointer;
      display: inline-block;
      font-size: 14px;
      font-weight: 700;
      position: relative;
      &::after {
        background-color: $color;
        bottom: -8px;
        content: "";
        height: 3px;
        left: 0;
        position: absolute;
        width: 100%;
      }
    }
  }
</style>
