<template lang="pug">
Modal
  .reset
    .reset__header
      Icon.reset__icon(id="pass")
    .reset__content(v-if="step == 0")
      .reset__headerContent
        .reset__title Reset password
        .reset__other(href="#" @click="openModal({name: 'signIn'})") Sign in
      .reset__inputs
        IInput.reset__input(label="Email address", v-model="email")
        Radio(name="acknowledged", :value="true", label="I acknowledge that my account will be locked for a minimum of 24 hours.", v-model="acknowledged")
      BButton.reset__button(color="malachite" rounded @click.native="step++") Reset now
    Status.reset__status(v-if="step == 1" isSuccess)
      .reset__statusMsg {{ isSuccess ? 'Completed' : 'Failed' }}
</template>

<script>
import {mapMutations} from 'vuex';
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
      acknowledged: false,
      step: 0,
      isSuccess: false,
    };
  },
  methods: {
    ...mapMutations('modal', {
      openModal: 'open',
    }),
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

.reset {
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
