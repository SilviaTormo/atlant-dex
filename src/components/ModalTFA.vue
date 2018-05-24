<template lang="pug">
Modal.ModalLayout
  TFA(v-if="!success", :onConfirm="confirm")
  Status(v-if="success")
    .tfaModal__statusMsg Completed
</template>

<script>
import {mapState} from 'vuex';
import ModalLayout from '@/layout/ModalLayout';
import TFA from '@/components/TFA';
import Status from '@/components/Status.vue';

export default {
  data() {
    return {
      success: false,
    };
  },
  computed: {
    ...mapState('modal', {
      data: 'data',
    }),
  },
  methods: {
    confirm() {
      this.data.function();
      this.success = true;
    },
  },
  created() {
  },
  components: {
    ModalLayout,
    TFA,
    Status,
  },
};
</script>

<style lang="scss">
@import 'variables';
.tfaModal {
  &__statusMsg {
    text-align: center;
    text-transform: uppercase;
    font-size: 18px;
    font-weight: 900;
  }
}
</style>
