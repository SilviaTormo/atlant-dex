<template lang="pug">
transition(name="modal__anim")
  .modal(v-scrollbar="")
    .modal__overlay(@click="closeModal()")
    .modal__main
      .modal__body(:class="[`modal__body--${screenType}`]")
        Icon.modal__closeIcon(id="close"  @click="closeModal()")
        .modal__content
          slot
</template>

<script>
import {mapState, mapMutations} from 'vuex';
import {scrollbar} from '@/directives';

export default {
  computed: {
    ...mapState('misc', {
      screenType: 'screenType',
    }),
  },
  methods: {
    ...mapMutations('modal', {
      close: 'close',
    }),
    closeModal() {
      this.close();
      this.onClose();
    },
  },
  props: {
    onClose: {
      type: Function,
      required: false,
      default: () => {},
    },
  },
  directives: {
    scrollbar,
  },
};
</script>

<style lang="scss" scoped>
@import '~perfect-scrollbar/dist/css/perfect-scrollbar';
@import 'variables';
$padding: 40px;

.modal {
  position: fixed;
  display: flex;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 888;
  overflow: visible;
  &__overlay {
    width: 100%;
    height: 100%;
    position: fixed;
    background-color: rgba(0,0,0,0.40);
  }
  &__main {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  &__body {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 407px;
    // min-height: 600px;
    padding: $padding;
    margin: auto;
    border-radius: 12px;
    z-index: 801;
    box-shadow: 0 25px 20px rgba(0, 0, 0, 0.24);
    background-image: repeating-linear-gradient(
      135deg,
      #002338,
      #002338 45px,
      #0d2e41 0,
      #0d2e41 80px
    )
  }
  &__closeIcon {
    z-index: 801;
    top: -30px;
    right: -30px;
    width: 32px;
    height: 32px;
    position: absolute;
    cursor: pointer;
    transition: transform .5s;
    &:hover {
      transition: transform .5s;
      transform: scale(1.1);
    }
  }
  &__cross {
    display: none;
  }
  &__anim-enter,
&__anim-leave-active {
opacity: 0;
}

&__anim-enter-active,
&__anim-leave-active {
transition: opacity .4s ease;
}
}
</style>
