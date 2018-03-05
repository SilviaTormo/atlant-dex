<template lang="pug">
.changeEmail
  .changeEmail__param Additional email:
  .changeEmail__row(v-if="step === 0")
    .changeEmail__value {{security.additionalEmail.value}} #[Icon.changeEmail__icon(v-if="security.additionalEmail.verified" id="verified")]
    .link.changeEmail__action(:class="{'changeEmail__action--empty' : isEmpty}" @click="changeEmail") Change
  .changeEmail__row(v-if="step === 1")
    input.input(v-model="email")
    .link.changeEmail__action(@click="setExtraEmail") Save
    .link.changeEmail__action(@click="setStep(0)") Cancel
</template>

<script>
import {mapState, mapActions} from 'vuex';
import Icon from 'components/Icon';
// import {serverNotification} from 'services/notification';

export default {
  data() {
    return {
      email: null,
      step: 0,
    };
  },
  computed: {
    isEmpty() {
      return (this.security.additionalEmail.value === null && this.step === 0);
    },
    ...mapState('user', {
      security: 'security',
    }),
  },
  methods: {
    ...mapActions('user', {
      setAdditionalEmail: 'setAdditionalEmail',
    }),
    setStep(step) {
      this.step = step;
    },
    changeEmail() {
      this.email = this.security.additionalEmail.value;
      this.setStep(1);
    },
    setExtraEmail() {
      this.setAdditionalEmail(this.email).then(() => {
        this.security.additionalEmail.verified = false;
        this.setStep(0);
      });
    },
  },
  components: {
    Icon,
  },
};
</script>


<style lang="scss">
@import "~sass/bootstrap/media";

.changeEmail {
  &__row {
    margin-top: 10px;
    height: 32px;
    display: flex;
    align-items: center;
  }
  &__param {
    font-weight: 700;
  }
  &__value {
    margin: 10px 0 10px;
    display: flex;
    align-items: center;
  }
  &__action {
    margin: 0 5px 0 19px;
    &--empty {
      margin-left: 0;
    }
  }
  &__icon{
    $size: 13px;
    height: $size;
    width: $size;
    margin-left: 14px;
  }
}

@include media-breakpoint-down(md) {
  .changeEmail {
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
