<template lang="pug">
Modal.tfaModal
  TFA(v-if="!success", :onConfirm="confirm")
  Status(v-if="success")
    .tfaModal__statusMsg Completed
</template>

<script>
import {mapState} from 'vuex';
import TFA from '@/components/modals/TFA';
import Modal from '@/components/modals/Modal';
import Status from '@/components/modals/Status.vue';

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
    Modal,
    TFA,
    Status,
  },
};
</script>

<style lang="scss">
@import "~variables";
@import "~@/sass/bootstrap/media";
.tfaModal {
  &__statusMsg {
    text-align: center;
    text-transform: uppercase;
    font-size: 18px;
    font-weight: 900;
  }
}
</style>
