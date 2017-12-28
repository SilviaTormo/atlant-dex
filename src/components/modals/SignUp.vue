<template lang="pug">
Modal
  .singUp
    .singUp__header
      Icon.singUp__icon(id="signup")
    .singUp__content(v-if="step == 0")
      .singUp__header
        .singUp__title Sign up
        .singUp__other(@click="openSignIn") Sign in
      .singUp__inputs
        IInput.singUp__input(label="Email address", v-model="email")
        IInput.singUp__input(label="Choose a password", v-model="password")
        IInput.singUp__input(label="Confirm password", v-model="passwordRepeat")
        Radio(name="acknowledged", :value="true", label="I agree to the User Agreement and Privacy Policy.", v-model="iAgree")
      BButton.singUp__button(color="malachite" rounded @click.native="signUpUser") Create account
    Status.singUp__status(v-if="step == 1" isSuccess)
      .singUp__statusMsg {{ isSuccess ? 'Completed' : 'Failed' }}
</template>

<script>
import {mapMutations, mapActions} from 'vuex';
import Icon from 'components/Icon';
import Radio from 'components/Radio';
import BButton from 'components/BButton';
import Modal from 'components/modals/Modal';
import IInput from 'components/IInput';
import Status from 'components/modals/Status.vue';

export default {
  data() {
    return {
      email: '',
      password: '',
      passwordRepeat: '',
      iAgree: false,
      step: 0,
      isSuccess: false,
    };
  },
  methods: {
    ...mapMutations('modal', {
      open: 'open',
    }),
    ...mapActions('membership', [
      'signup',
    ]),
    openSignIn() {
      this.open({
        name: 'signIn',
      });
    },
    signUpUser() {
      this.signup({
        email: this.email,
        login: 'abcdef',
      });
    },
  },
  components: {
    Icon,
    Radio,
    Modal,
    BButton,
    IInput,
    Status,
  },
};
</script>

<style lang="scss">
@import "~variables";
@import "~sass/bootstrap/media";

.singUp {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__icon {
    $size: 77px;
    width: $size;
    height: $size;
    fill: $color_yellow;
  }
  &__header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 66px;
    margin-bottom: 70px;
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
      flex-basis: 40%;
      margin-bottom: 50px;
    }
  }
  &__input {
    width: 45%;
  }
  &__button {
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

@include media-breakpoint-down(md) {
}
</style>
