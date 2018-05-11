<template lang="pug">
Modal
  .newPassword
    Icon.newPassword__icon(id="pass")
    form.newPassword__content(v-if="step == 0" @submit.prevent="finishPasswordReset()")
      .newPassword__headerContent
        .newPassword__title Reset password
      .newPassword__inputs
        IInput.newPassword__input(v-if="showSymbols" placeholder="New password" label="New password" v-model="passwordNew")
        IInput.newPassword__input(v-else placeholder="New password" label="New password" v-model="passwordNew" type="password")
        IInput.newPassword__input(v-if="showSymbols" placeholder="Repeat password" label="Repeat password" v-model="passwordRepeat")
        IInput.newPassword__input(v-else placeholder="Repeat password" label="Repeat password" v-model="passwordRepeat" type="password")
        Checkbox.newPassword__checkbox(v-model="showSymbols")
          .newPassword__checkboxText Display symbols
      BButton.newPassword__button(color="malachite" rounded type="submit") Reset now
    Status.newPassword__status(v-if="step == 1")
</template>

<script>
import {mapState, mapGetters} from 'vuex';
import * as Membership from '@/services/api/membership';
import {serverNotification} from '@/services/notification';
import Icon from '@/components/Icon';
import Checkbox from '@/components/Checkbox';
import BButton from '@/components/BButton';
import Modal from '@/components/modals/Modal';
import IInput from '@/components/IInput';
import Status from '@/components/modals/Status.vue';

export default {
  data() {
    return {
      passwordNew: '',
      passwordRepeat: '',
      showSymbols: false,
      step: 0,
    };
  },
  computed: {
    ...mapState('modal', {
      data: 'data',
    }),
    ...mapGetters('misc', {
      isMobile: 'isMobile',
    }),
  },
  methods: {
    finishPasswordReset() {
      Membership.finishPasswordRestore({
        newpassword: this.passwordNew,
        confirmedpassword: this.passwordRepeat,
        code: this.data.code,
      }).then(() => {
        this.step = 1;
      }).catch((res) => {
        serverNotification(res);
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
@import "~@/sass/bootstrap/media";

.newPassword{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  &__content {
    width: 100%;
  }
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
  &__inputs {
    width: 100%;
    & > * {
      margin-bottom: 35px;
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
}

@include media-breakpoint-down(md) {
  .newPassword{
    margin: auto;
    &__icon {
      display: none;
    }

    &__headerContent{
      justify-content: center;
    }

    &__checkbox {
      flex-direction: column;
      align-items: center !important;
    }

    &__checkboxText {
      margin-top: 20px;
      text-align: center;
    }
  }
}
</style>
