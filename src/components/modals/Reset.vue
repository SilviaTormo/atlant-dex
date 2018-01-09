<template lang="pug">
Modal
  .reset
    .reset__header
      Icon.reset__icon(id="pass")
    .reset__content(v-if="step == 0")
      .reset__headerContent
        .reset__title Reset password
        .reset__other(v-if="!isMobile", href="#" @click="openModal({name: 'signIn'})") Sign in
      .reset__inputs
        IInput.reset__input(label="Email address", v-model="email")
        Checkbox.reset__checkbox(name="acknowledged", :value="true", v-model="acknowledged")
          .reset__checkboxText I acknowledge that my account will be locked for a minimum of 24 hours.
      BButton.reset__button(color="malachite" rounded @click.native="step++") Reset now
    .reset__other(v-if="isMobile", href="#" @click="openModal({name: 'signIn'})") Sign in
    Status.reset__status(v-if="step == 1" isSuccess)
      .reset__statusMsg {{ isSuccess ? 'Completed' : 'Failed' }}
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';
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
      acknowledged: false,
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

.reset {
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

@include media-breakpoint-down(md) {
  .reset {
    margin: auto;
    &__icon {
      display: none;
    }
    &__inputs {
      flex-direction: column;
      & >* {
        flex-basis: auto;
        width: 100%;
      }
    }
    &__checkbox {
      margin-top: 30px;
      flex-direction: column;
      align-items: center !important;
    }

    &__checkboxText {
      margin-top: 20px;
      text-align: center;
    }

    &__other {
      margin-top: 40px;
    }
  }
}
</style>
