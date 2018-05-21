<template lang="pug">
  .verificationUploadInput(
    :class="[{'verificationUploadInput--help': isShowHelp}, validationClass]"
  )
    .verificationUploadInput__inputBlock
      .verificationUploadInput__inputWrap(
        :class="{'verificationUploadInput__inputWrap--canDrop': canDrop}"
      )
        .verificationUploadInput__fileName(v-if="fileName") {{fileName}}
        .verificationUploadInput__plus(v-else="fileName") +
        input.verificationUploadInput__input(
          type="file",
          :accept="acceptTypes",
          @change="onChange",
          ref="input",
          @dragenter="canDrop = true",
          @dragleave="canDrop = false",
          @drop="canDrop = false",
        )
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
import {notification} from '@/services/notification';
import Icon from '@/components/Icon';

const acceptTypes = ['application/pdf', 'image/*'];

export default {
  name: 'VerificationUploadInput',
  data() {
    return {
      // file: null,
      isShowHelp: false,
      canDrop: false,
      acceptTypes: acceptTypes.join(','),
    };
  },
  computed: {
    fileName() {
      return this.value ? this.value.name : null;
    },
    validationClass() {
      if (this.validation) {
        return `verificationUploadInput--${this.validation}`;
      }
    },
  },
  methods: {
    onChange() {
      const newFile = this.$refs.input.files[0];
      if (this.isFileAcceptable(newFile)) {
        this.$emit('input', newFile);
      } else {
        notification({
          type: 'error',
          text: 'This file type is not acceptable!',
          title: 'Wrong file',
        });
      }
    },
    isFileAcceptable(file) {
      return (file && file.type.match(acceptTypes.join('|')));
    },
  },
  props: {
    imageSrc: String,
    validation: [String, Boolean],
    value: [File, String],
  },
  components: {
    Icon,
  },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~variables";
  .verificationUploadInput {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;

    &__inputBlock {
      position: relative;
    }
    &__inputWrap {
      align-items: center;
      border: 1px dashed $input-border-color;
      display: flex;
      height: 96px;
      justify-content: center;
      position: relative;
      width: 96px;

      &--canDrop {
        background-color: rgba($input-valid-color, .3);
      }
    }
    &__input {
      cursor: pointer;
      height: 100%;
      left: 0;
      opacity: 0;
      position: absolute;
      top: 0;
      width: 100%;
    }
    &__fileName {
      display: flex;
      font-size: 9px;
      line-height: 12px;
      padding: 5px;
      text-align: center;
      white-space: normal;
      word-break: break-all;
    }
    &__plus {
      font-size: 30px;
      font-weight: bold;
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

    &--valid & {
      &__inputWrap {
        border-color: $input-valid-color;
      }
    }
    &--error & {
      &__inputWrap {
        border-color: $input-error-color;
      }
    }
  }
</style>
