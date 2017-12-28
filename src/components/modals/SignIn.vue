<template lang="pug">
Modal
  .singIn
    .singIn__header
      Icon.singIn__icon(id="signin")
    .singIn__content(v-if="step == 0")
      .singIn__headerContent
        .singIn__title Sign in
        .singIn__other(@click="openSignUp") Sign up
      .singIn__inputs
        IInput.singIn__input(label="Email", v-model="email")
        IInput.singIn__input(label="Password", v-model="password")
      .singIn__rememberContainer
        Radio.singIn__remember(name="remember", :value="true", label="Remember me", v-model="remember")
      BButton.singIn__button(color="malachite" rounded @click.native="signIn") Let me in
      a.singIn__forgot(href="#" @click="[openModal('reset'), finishTransaction]" ) Forgot password?
    Status.singIn__status(v-if="step == 1" isSuccess)
      .singIn__statusMsg {{ isSuccess ? 'Completed' : 'Failed' }}
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
      remember: false,
      step: 0,
      isSuccess: false,
    };
  },
  methods: {
    ...mapMutations('modal', {
      open: 'open',
    }),
    ...mapActions('membership', {
      login: 'login',
    }),
    openSignUp() {
      this.open({
        name: 'signUp',
      });
    },
    signIn() {
      this.login({
        email: this.email,
        password: this.password,
      });
    },
    finishTransaction() {
      this.step = 1;
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

.singIn {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__icon {
    $size: 77px;
    width: $size;
    height: $size;
    fill: $color_yellow;
  }
  &__headerContent {
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
  &__button {
    margin-left: auto;
    margin-right: auto;
    font-size: 16px;
    font-weight: 900px;
    text-transform: uppercase;
  }
  &__rememberContainer {
    margin-bottom: 50px;
  }
  &__forgot {
    color: #f7b933;
    margin-top: 40px;
    text-decoration: none;
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
