<template lang="pug">
Modal
  .singUp
    Icon.singUp__icon(id="signup")
    form.singUp__content(v-if="step == 0" @submit.prevent="signUpUser")
      .singUp__headerContent
        .singUp__title Sign up
        .singUp__other(v-if="!isMobile", @click="openSignIn") Sign in
      .singUp__blocks
        .singUp__block
          IInput.singUp__input(label="Email address", v-model="email")
          IInput.singUp__input(label="Choose a password", v-model="password",  type="password")
          IInput.singUp__input(label="Confirm password", v-model="passwordRepeat",  type="password")
        .singUp__block
          Checkbox.singUp__checkbox(name="acknowledged", :value="true", v-model="iAgree")
            span.singUp__iAgree I certify that I am 18 years of age or older, and I agree to the #[a.link(href="#") User Agreement] and #[a.link(href="#") Privacy Policy].
          BButton.singUp__button(color="malachite" rounded type="submit") Create account
      .singUp__other(v-if="isMobile", @click="openSignIn") Sign in
    Status.singUp__status(v-if="step == 1" isSuccess)
      .singUp__statusMsg {{ isSuccess ? 'Completed' : 'Failed' }}
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
      passwordRepeat: '',
      iAgree: false,
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
        password: this.password,
        termsaccepted: this.iAgree,
      });
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

.singUp {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  max-width: 522px;
  margin: auto;
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
  &__blocks {
    display: flex;
    flex-direction: space-between;
    justify-content: space-between;
  }

  &__block {
    width: 45%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  &__inputs {

    display: flex;
    flex-direction: column;
    & > * {
      flex-basis: 40%;
      margin-bottom: 50px;
    }
  }
  &__input {
    &:not(:last-child){
      margin-bottom: 40px;
    }
  }
  &__checkbox {
    align-items: flex-start !important;
  }

  &__iAgree {
    margin-left: 29px;
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
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
  .singUp {
    &__icon {
      display: none;
    }

    &__content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
    }

    &__headerContent {
      justify-content: center;
    }

    &__icon {
      flex: 0;
      justify-content: center;
    }

    &__blocks {
      flex-direction: column;
    }
    &__block {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    &__checkbox {
      margin-top: 30px;
      flex-direction: column;
      align-items: center !important;
    }

    &__iAgree {
      margin-top: 20px;
      margin-left: 0;
      text-align: center;
    }

    &__button {
      margin: 40px auto;
    }

    &__other {
      margin: auto;
    }
  }
}
</style>
