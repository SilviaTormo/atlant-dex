<template lang="pug">
ModalLayout
  .reset
    Icon.reset__icon(id="pass")
    .reset__content(v-if="step == 0")
      .reset__headerContent
        .reset__title Reset password
        .reset__other(href="#" @click="openModal({name: 'signIn'})") Sign in
      .reset__inputs
        IInput.reset__input(label="Email address", v-model="email")
        Checkbox.reset__checkbox(name="acknowledged", :value="true", v-model="acknowledged")
          .reset__checkboxText I acknowledge that my account will be locked for a minimum of 24 hours.
      BButton.reset__button(color="malachite" rounded @click.native="reset()") Reset now
    .reset__other(href="#" @click="openModal({name: 'signIn'})") Sign in
    TFA(v-if="step == 1", :onConfirm="confirmReset", :onResend="reset", :onCancel="cancelReset", :isModal="true")
    Status.reset__status(v-if="step == 2")
      .reset__statusMsg Completed
</template>

<script>
import {mapMutations} from 'vuex';
import * as Membership from '@/services/api/membership';
import ModalLayout from '@/layout/ModalLayout';
import Icon from '@/components/Icon';
import Checkbox from '@/components/Checkbox';
import BButton from '@/components/BButton';
import IInput from '@/components/IInput';
import TFA from '@/components/TFA';
import Status from '@/components/Status.vue';
import {serverNotification} from '@/services/notification';

export default {
  data() {
    return {
      email: '',
      acknowledged: false,
      step: 0,
      isSuccess: false,
    };
  },
  methods: {
    ...mapMutations('modal', {
      openModal: 'open',
    }),
    ...mapMutations('user', {
      setTFAMethod: 'setTFAMethod',
    }),
    reset() {
      Membership.requestPasswordRestore(this.email).then((response) => {
        this.setTFAMethod({method: response.data.twoFactorAuthenticationMethod});
        this.step = 1;
      }).catch((res) => {
        serverNotification(res);
      });
    },
    cancelReset() {
      this.step = 0;
    },
    confirmReset(code) {
      Membership.validatePasswordRestore({code: code, email: this.email}).then(() => {
        this.step = 2;
      }).catch((res) => {
        serverNotification(res);
      });
    },
  },
  components: {
    ModalLayout,
    Icon,
    Checkbox,
    BButton,
    IInput,
    TFA,
    Status,
  },
};
</script>

<style lang="scss">
@import 'variables';

.reset {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  &__icon {
    $size: 77px;
    width: $size;
    height: $size;
    fill: $color_yellow;
    margin-bottom: 50px;
  }
  &__headerContent {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 50px;
  }
  &__title {
    font-size: 18px;
    font-weight: 900;
    text-transform: uppercase;
  }
  &__other {
    $color: #f7b933;
    color: $color;
    font-size: 14px;
    position: relative;
    font-weight: 700;
    cursor: pointer;
    &::after {
      content: "";
      height: 3px;
      width: 100%;
      bottom: -5px;
      left: 0;
      position: absolute;
      background-color: $color;
    }
  }
  &__inputs {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
    & > * {
      flex-basis: 45%;
      margin-bottom: 50px;
    }
  }
  &__checkbox {
    align-items: flex-start !important;
  }
  &__checkboxText {
    margin-left: 20px;
  }
  &__button {
    display: flex;
    margin-left: auto;
    margin-right: auto;
    font-size: 16px;
    font-weight: 900px;
    text-transform: uppercase;
  }
  &__statusMsg {
    text-align: center;
    text-transform: uppercase;
    font-size: 18px;
    font-weight: 900;
  }
}
</style>
