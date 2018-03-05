<template lang="pug">
.changeName
  .changeName__param Full name:
  .changeName__row(v-if="step === 0")
    .changeName__value {{this.account.fullName.value}}
    .link.changeName__action(:class="{'changeName__action--empty' : isEmpty}" @click="changeName") Change
  .changeName__row(v-if="step === 1")
    input.input(v-model="name")
    .link.changeName__action(@click="setName") Save
    .link.changeName__action(@click="setStep(0)") Cancel
</template>

<script>
import {mapState, mapActions} from 'vuex';
// import {serverNotification} from 'services/notification';

export default {
  data() {
    return {
      name: null,
      step: 0,
    };
  },
  computed: {
    isEmpty() {
      return (this.account.fullName.value === null && this.step === 0);
    },
    ...mapState('user', {
      account: 'account',
    }),
  },
  methods: {
    ...mapActions('user', {
      setFullName: 'setFullName',
    }),
    setStep(step) {
      this.step = step;
    },
    changeName() {
      this.name = this.account.fullName.value;
      this.setStep(1);
    },
    setName() {
      this.setFullName(this.name).then(() => {
        this.setStep(0);
      });
    },
  },
  components: {
  },
};
</script>


<style lang="scss">
@import "~sass/bootstrap/media";

.changeName {
  &__row {
    margin-top: 18px;
    height: 32px;
    display: flex;
    align-items: center;
  }
  &__param {
    font-weight: 700;
  }
  &__action {
    margin: 0 5px 0 19px;
    &--empty {
      margin-left: 0;
    }
  }
}

@include media-breakpoint-down(md) {
  .changeName {
    &__row {
      height: auto;
      flex-direction: column;
      align-items: flex-start;
    }
    &__action {
      margin-left: 0;
      margin-top: 17px;
    }
  }
}
</style>
