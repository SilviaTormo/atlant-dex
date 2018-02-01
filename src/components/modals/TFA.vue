<template lang="pug">
.tfa
  Icon.tfa__icon(id="2fa")
  form.tfa__content(v-if="tfaStep == 0" @submit.prevent="onConfirm(secureCode)")
    .tfa__title confirmation
    .tfa__text {{text}}
    IInput.tfa__input(placeholder="Enter secure code", v-model="secureCode", center)
    BButton.tfa__button(color="malachite" rounded) Confirm
    .tfa__repeat
      .tfa__repeatText(v-if="!isLinkAviable") The new code will be available in #[span.tfa__repeatTimer {{timer}} seconds]
      a.link(v-else @click="getCountDown()") Send new code
  //- Status.tfa__status(v-if="tfaStep == 1" isSuccess)
  //-   .tfa__statusMsg {{ isSuccess ? 'Completed' : 'Failed' }}
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';
import Icon from 'components/Icon';
import BButton from 'components/BButton';
import IInput from 'components/IInput';
import Status from 'components/modals/Status.vue';

export default {
  data() {
    return {
      secureCode: '',
      tfaStep: 0,
      timer: 5,
      isLinkAviable: false,
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
    getCountDown() {
      this.isLinkAviable = false;
      if (this.timer) {
        setTimeout(() => {
          this.timer--;
          this.getCountDown();
        }, 1000);
      };
      if (this.timer <= 0) {
        this.isLinkAviable = true;
        this.timer = 5;
      };
    },
  },
  created() {
    this.getCountDown();
  },
  props: {
    text: {
      type: String,
      default: 'You were sent 2FA code to confirm two-factor authentication',
      required: false,
    },
    onConfirm: {
      type: Function,
      required: true,
    },
  },
  components: {
    Icon,
    BButton,
    IInput,
    Status,
  },
};
</script>

<style lang="scss">
@import "~variables";
@import "~sass/bootstrap/media";

.tfa {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 520px;
  justify-content: space-between;
  &__icon {
    $size: 77px;
    width: $size;
    height: $size;
    fill: $color_yellow;
    margin-bottom: 50px;
  }
  &__title {
    display: flex;
    justify-content: center;
    width: 100%;
    font-size: 18px;
    font-weight: 900;
    text-transform: uppercase;
    margin-bottom: 46px;
  }
  &__text {
    max-width: 311px;
    color: #ffffff;
    font-size: 12px;
    font-weight: 400;
    line-height: 25px;
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 40px;
  }

  &__input {
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 50px;
  }
  &__button {
    display: flex;
    margin-left: auto;
    margin-right: auto;
    font-size: 16px;
    font-weight: 900px;
    text-transform: uppercase;
    margin-bottom: 38px;
  }
  &__repeat {
    color: #ffffff;
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
    text-align: center;
  }
  &__repeatTimer {
    color: #ffc000;
    font-weight: 700;
  }
}

@include media-breakpoint-down(md) {
  .tfa {
    min-width: 100%;
    margin: auto;
    &__icon {
      display: none;
    }
  }
}
</style>
