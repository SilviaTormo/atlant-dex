<template lang="pug">
  VSelect.verificationSelect(
    :options="options",
    placeholder="",
    :show-labels="false",
    :allow-empty="false",
    :value="value",
    :track-by="trackBy",
    @input="onChange",
    v-bind="$attrs",
  )
    span.multiselect__placeholder(slot="placeholder") {{placeholder}}
    span(slot="noResult") No Results
</template>

<script>
import Icon from 'components/Icon';
import VSelect from 'vue-multiselect';

export default {
  name: 'VerificationSelect',
  methods: {
    onChange(val) {
      const value = this.trackBy ? val[this.trackBy] : val;
      this.$emit('input', value);
    },
  },
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    placeholder: {
      type: String,
      default: '-',
    },
    options: Array,
    trackBy: String,
  },
  components: {
    Icon,
    VSelect,
  },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "~variables";
  .multiselect {
    display: block;
    position: relative;
    width: 100%;
    min-height: 32px;
    text-align: left;
    color: $color_white;
    font-style: $input-font-size;
    outline: 0;
    &--active /deep/ &__tags{
      border-color: $input-border-color-highlight;
    }

    /deep/ & {
      &__input {
        background: transparent;
        border-radius: 0;
        border: none;
        box-sizing: border-box;
        display: inline-block;
        line-height: 16px;
        margin: 0;
        min-height: 16px;
        padding: 0;
        position: relative;
        transition: border .1s ease;
        vertical-align: top;
        width: 100%;

        &::placeholder {
          color: $input-placeholder-color;
        }
      }

      &__placeholder {
        color: $input-placeholder-color;
      }

      &__tags {
        align-items: center;
        background: transparent;
        border-radius: 0;
        border: $input-border;
        display: flex;
        font-size: $input-font-size;
        line-height: 16px;
        min-height: 32px;
        transition: $input-transition;
        padding: $input-padding;
        padding-right: 28px;

        &:hover {
          border-color: $input-border-color-highlight;
        }
      }

      &__content-wrapper {
        position: absolute;
        display: block;
        background: $color-white;
        width: 100%;
        max-height: 240px;
        overflow: auto;
        z-index: 3;
        color: #00354D;
      }

      &__content {
        list-style: none;
        display: inline-block;
        padding: 0;
        margin: 0;
        min-width: 100%;
        vertical-align: top;
      }

      &__option {
        align-items: center;
        cursor: pointer;
        display: flex;
        line-height: 16px;
        min-height: 32px;
        padding: $input-padding;
        padding-left: 20px;
        position: relative;
        text-decoration: none;
        text-transform: none;
        vertical-align: middle;
        white-space: nowrap;

        &--highlight {
          background-color: #eee;
        }
        &--selected {
          &:before {
            border: solid #000;
            border-width: 0 2px 2px 0;
            content: '';
            display: block;
            height: 8px;
            left: 8px;
            position: absolute;
            transform: rotate(45deg);
            width: 4px;
          }
        }
      }

      &__select {
        position: absolute;
        height: 100%;
        right: 0;
        top: 0;
        padding: 0 9px;
        transition: transform .2s ease;
        display: flex;
        align-items: center;
        &:before {
          border-style: solid;
          border-width: 5px 5px 0;
          border-color: $color_white transparent transparent;
          content: "";
        }
      }

      &__spinner {
        display: block;
        height: 16px;
        position: absolute;
        right: 6px;
        width: 16px;

        &:before,
        &:after {
          position: absolute;
          content: "";
          top: 50%;
          left: 50%;
          margin: -8px 0 0 -8px;
          width: 16px;
          height: 16px;
          border-radius: 100%;
          border-color: #ffc600 transparent transparent;
          border-style: solid;
          border-width: 2px;
          box-shadow: 0 0 0 1px transparent;
        }

        &:before {
          animation: spinning 2.4s  cubic-bezier(.41,.26,.2,.62);
          animation-iteration-count: infinite;
        }
        &:after {
          animation: spinning 2.4s cubic-bezier(.51,.09,.21,.8);
          animation-iteration-count: infinite;
        }
      }
    }
}
@keyframes spinning {
  from { transform:rotate(0) }
  to { transform:rotate(2turn) }
}
</style>
