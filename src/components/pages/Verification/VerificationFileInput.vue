<template lang="pug">
  .verificationUploadInput(:class="{'verificationUploadInput--help': isShowHelp}")
    .verificationUploadInput__inputBlock
      .verificationUploadInput__input
      .verificationUploadInput__helpIcon(
        @mouseenter="isShowHelp = true",
        @mouseleave="isShowHelp = false",
      )
        Icon(id="help")
    img.verificationUploadInput__image(
      :src="imageSrc"
    )
</template>

<script>
import Icon from 'components/Icon';

export default {
  name: 'VerificationUploadInput',
  data() {
    return {
      isShowHelp: false,
    };
  },
  props: {
    imageSrc: String,
  },
  components: {
    Icon,
  },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~sass/variables";
  .verificationUploadInput {
    display: flex;
    flex-direction: row;
    align-items: center;

    &__inputBlock {
      position: relative;
    }
    &__input {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 96px;
      width: 96px;
      border: 1px dashed $input-border-color;
      &:before {
        content: '+';
        font-size: 30px;
        font-weight: bold;
      }
    }
    &__helpIcon {
      cursor: pointer;
      fill: #ffc600;
      position: absolute;
      right: -25px;
      top: -15px;
      transition: fill .3s ease;
    }
    &__image {
      margin-left: 85px;
      opacity: .25;
      transition: opacity .3s ease;
    }

    &--help &{
      &__image {
        opacity: 1;
      }
      &__helpIcon {
        fill: #034468;
      }
    }
  }
</style>
