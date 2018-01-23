<template lang="pug">
.ddropdown
  select.ddropdown__select(@change="select($event.target.value)", :class="{'ddropdown__select--witchBorder': border}")
    option.ddropdown__option(v-for="option in options", :value="option") {{option}}
  Icon.ddropdown__triangle(id="triangle2", :class="{'ddropdown__triangle--witchPadding': border}")
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
.ddropdown {
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
    &--witchBorder {
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
    &--witchPadding {
      right: 10px;
    }
  }
}
</style>
