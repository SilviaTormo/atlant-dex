<template lang="pug">
Modal
  .singIn
    Icon.singIn__icon(id="signin")
    .singIn__content(v-if="step == 0")
      .singIn__headerContent
        .singIn__title Sign in
        .singIn__other(v-if="!isMobile", @click="openSignUp") Sign up
      .singIn__inputs
        IInput.singIn__input(label="Email", v-model="email")
        IInput.singIn__input(label="Password", v-model="password", type="password")
      .singIn__checkboxContainer
        Checkbox.singIn__checkbox(name="remember", :value="true", v-model="remember")
          .singIn__checkboxLabel Remember me
      BButton.singIn__button(color="malachite" rounded @click.native="[signIn, finishTransaction]") Let me in
      .singIn__forgot #[a.link(href="#" @click="openModal({name: 'reset'})") Forgot password?]
    .singIn__other(v-if="isMobile", @click="openSignUp") Sign up
    Status.singIn__status(v-if="step == 1" isSuccess)
      .singIn__statusMsg {{ isSuccess ? 'Completed' : 'Failed' }}
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex';
import Icon from 'components/Icon';
import Checkbox from 'components/Checkbox';
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
  computed: {
    ...mapGetters('misc', {
      isMobile: 'isMobile',
    }),
  },
  methods: {
    ...mapMutations('modal', {
      openModal: 'open',
    }),
    ...mapActions('membership', {
      login: 'login',
    }),
    openSignUp() {
      this.openModal({
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
    Checkbox,
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
  min-width: 522px;
  justify-content: space-between;
  &__icon {
    $size: 77px;
    width: $size;
    height: $size;
    fill: $color_yellow;
    margin: auto;
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

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
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
    width: 100%;
    max-width: 400px;
  }
  &__button {
    display: block;
    margin: auto;
    min-width: 130px;
    align-items: center;
    margin-bottom: 40px;
    font-size: 16px;
    font-weight: 900;
    text-align: center;
    text-transform: uppercase;
  }
  &__checkboxContainer {
    margin-bottom: 50px;
    display: flex;
    justify-content: center;
  }
  &__checkbox {
    flex-direction: column;
  }
  &__checkboxLabel {
    margin-top: 21px;
    font-size: 14px;
    font-weight: 400;
  }
  &__forgot {
    display: block;
    text-align: center;
    font-size: 14px;
    font-weight: 400;
  }
  &__statusMsg {
    text-align: center;
    text-transform: uppercase;
    font-size: 18px;
    font-weight: 900;
  }
}

@include media-breakpoint-down(md) {
  .singIn {
    min-width: 100%;
    &__icon {
      display: none;
    }
    &__headerContent {
      justify-content: center;
    }
    &__inputs {
      flex-direction: column;
      width: 100%;
      justify-content: center;
    }
    &__other {
      margin-top: 40px;
    }
  }
}
</style>
