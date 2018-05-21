<template lang="pug">
.tfa
  form.tfa__content(v-if="isModal" @submit.prevent="onConfirm(secureCode)")
    .tfa__title confirmation
    .tfa__text {{setTextMessage}}
    IInput.tfa__input(placeholder="Enter security code", v-model="secureCode", center)
    BButton.tfa__button(color="malachite" rounded) Confirm
    .tfa__repeat
      .tfa__repeatText(v-if="!isLinkAviable && security.tfa.method != 2") The new code will be available in #[span.tfa__repeatTimer {{timer}} seconds]
      a.link(v-if="isLinkAviable && security.tfa.method != 2" @click="getCountDown(); onResend()") Send new code
    a.link(@click="onCancel()") Cancel
  form(v-else)
    .tfa__row {{setTextMessage}}
    .tfa__row.tfa__row--desktop
      input.input(placeholder="Enter security code" v-model="secureCode")
      .tfa__row.tfa__row--mobileMargin
        .link.tfa__link(@click="onConfirm(secureCode)") Confirm
        .link.tfa__link(@click="onCancel()") Cancel
    .tfa__row(v-if="isLinkAviable && security.tfa.method != 2") #[Icon(id="resend")] #[.link.tfa__link(@click="getCountDown(); onResend()") Resend] confirmation code
    .tfa__row(v-if="!isLinkAviable && security.tfa.method != 2")
      .tfa__repeatText The new code will be available in #[span.tfa__repeatTimer {{timer}} seconds]
</template>

<script>
import {mapState, mapMutations} from 'vuex';
import i18n from 'i18n';
import Icon from '@/components/Icon';
import BButton from '@/components/BButton';
import IInput from '@/components/IInput';
import Status from '@/components/modals/Status.vue';
import QR from '@/components/QR';

export default {
  data() {
    return {
      secureCode: '',
      timer: 5,
      isLinkAviable: false,
      isSuccess: false,
    };
  },
  computed: {
    ...mapState('user', {
      security: 'security',
    }),
    setTextMessage() {
      let confirmMethod = (this.confirmType) ? this.confirmType : this.security.tfa.method;
      return (this.text === false) ? i18n.t(`sent2FA.${confirmMethod}`) : this.text;
    },
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
      type: [String, Boolean],
      default: false,
      required: false,
    },
    confirmType: {
      type: [String, Boolean],
      default: false,
      required: false,
    },
    onConfirm: {
      type: Function,
      required: true,
    },
    onCancel: {
      type: Function,
      required: true,
    },
    onResend: {
      type: Function,
      required: false,
    },
    isModal: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  components: {
    Icon,
    BButton,
    IInput,
    Status,
    QR,
  },
};
</script>

<style lang="scss">
@import "~variables";

.tfa {
  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
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
    margin-bottom: 30px;
  }
  &__repeat {
    color: #ffffff;
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
    text-align: center;
    margin-bottom: 20px;
  }
  &__repeatTimer {
    color: $color_yellow;
    font-weight: 700;
  }
  &__row {
    margin-top: 18px;
    min-height: 25px;
    display: flex;
    align-items: center;
    &--mobileMargin {
      margin: 0;
    }
  }
  &__link {
    margin: 0 5px 0 19px;
  }
  &__modalQR {
    margin-bottom: 36px;
  }
}

</style>
