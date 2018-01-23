<template lang="pug">
.dropdown
  select.dropdown__select(@change="select($event.target.value)", :class="{'dropdown__select--withBorder': border}")
    option.dropdown__option(v-for="option in options", :value="option") {{option}}
  Icon.dropdown__triangle(id="triangle2", :class="{'dropdown__triangle--withPadding': border}")
</template>

<script>
import Icon from './Icon';

export default {
  model: {
    event: 'change',
  },
  methods: {
    select(val) {
      this.$emit('change', val);
    },
  },
  created() {
    this.select(this.options[0]);
  },
  props: {
    options: {
      type: Array,
      default: () => [],
      required: true,
    },
    border: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  components: {
    Icon,
  },
};
</script>

<style lang="scss">
.dropdown {
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  &__select {
    width: 100%;
    color: #fff;
    // font-size: 16px;
    font-weight: bold;
    appearance: none;
    background-color: transparent;
    &--withBorder {
      border: 1px solid #ffffff;
      border-radius: 4px;
      background: transparent;
      padding: 10px;
      font-size: 14px;
    }
  }
  &__option {
    color: #000;
  }
  &__triangle {
    width: 12px;
    height: 6px;
    fill: #fff;
    position: absolute;
    right: 0;
    pointer-events: none;
    &--withPadding {
      right: 10px;
    }
  }
}
</style>
