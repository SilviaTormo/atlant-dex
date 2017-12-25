<template lang="pug">
Modal
  form.import(@submit.prevent="submit()")
    Icon.import__icon(id="pass")
    .import__typekey Type your private key below
    .import__importWrapper
      input.import__input(:value="key" type="password")
    //- .import__orInsert Or #[span.link insert from clipboard]
</template>

<script>
import Icon from 'components/Icon';
import Modal from 'components/modals/Modal';
import IInput from 'components/IInput';

export default {
  data() {
    return {
      key: '',
    };
  },
  methods: {
    submit() {
      console.log('submitted');
    },
    paste() {
      console.log('pasted');
    },
  },
  components: {
    Icon,
    Modal,
    IInput,
  },
};
</script>

<style lang="scss">
@import "~variables";

.import {
  display: flex;
  flex-direction: column;
  align-items: center;
  $inputSpacing: 0.3em;
  &__icon {
    $size: 77px;
    width: $size;
    height: $size;
    fill: $color_yellow;
  }
  &__typekey {
    font-size: 30px;
    margin-top: 60px;
    text-align: center;
  }
  &__orInsert {
    margin-top: 64px;
    font-size: 14px;
    text-transform: lowercase;
  }
  &__importWrapper {
    width: 100%;
    position: relative;
    font-size: 24px;
    overflow: hidden;
    font-family: monospace;
    letter-spacing: $inputSpacing;
    &::after {
      line-height: 0.3em;
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 0;
      content: "———————————————————————————————————————————————";
    }
  }
  &__input {
    width: 100%;
    margin-top: 34px;
    border: 0;
    font-size: 24px;
    background-color: transparent;
    border-radius: 0;
    padding: 0px;
    font-size: 1em;
    color: lighten(#35415a, 10%);
    font-family: inherit;
    font-weight: bold;
    padding-bottom: 15px;
    letter-spacing: inherit;
  }
}
</style>
