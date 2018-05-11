<template lang="pug">
Page(
  title="Verification",
  title2="Please upload the following files in order to verify your account:",
  :sidebar="true"
)
  .verification
    .verification__title PERSONAL INFORMATION:
    .verification__form
      VerificationForm(:validations="this.$v")
    .verification__title Please upload the following files in order to verify your account:
    .verification__upload
      VerificationFiles(:validations="this.$v")
    .verification__button
      BButton(
        @click="upload"
        color="malachite",
        rounded,
        caps,
      ) Verify Me
</template>

<script>
import {mapState, mapActions} from 'vuex';
import {required, minLength} from 'vuelidate/lib/validators';
import BButton from '@/components/BButton';
import Page from '../Page';
import VerificationForm from './VerificationForm';
import VerificationFiles from './VerificationFiles';

export default {
  name: 'VerificationPage',
  computed: {
    ...mapState('verify', [
      'verification',
    ]),
  },
  methods: {
    ...mapActions('verify', [
      'verifyTierOne',
      'getLastVerification',
    ]),
    upload() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      this.verifyTierOne(this.verification.getFormData());
    },
  },
  mounted() {
    this.getLastVerification();
  },
  components: {
    Page,
    BButton,
    VerificationForm,
    VerificationFiles,
  },
  validations: {
    verification: {
      firstName: {
        required,
        minLength: minLength(2),
      },
      lastName: {
        required,
        minLength: minLength(2),
      },
      country: {
        required,
      },
      city: {
        required,
      },
      address: {
        required,
        minLength: minLength(2),
      },
      postCode: {
        required,
        minLength: minLength(2),
      },
      phoneNumber: {
        required,
        minLength: minLength(4),
      },
      day: {
        required,
      },
      month: {
        required,
      },
      year: {
        required,
      },
      passportId: {
        required,
      },
      passportScan: {
        required,
      },
      selfie: {
        required,
      },
      proofOfResidenceScan: {
        required,
      },
    },
    birthday: ['verification.day', 'verification.month', 'verification.year'],
  },
};
</script>


<style lang="scss" scoped>
@import "~@/sass/bootstrap/media";
@import "~sass/variables";
.verification {
  color: $color_white;
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
  max-width: 560px;

  &__title {
    font-size: 16px;
    font-weight: 700;
    line-height: 25px;
    margin-bottom: 20px;
    text-transform: uppercase;
  }
  &__form {
    padding: 15px 0 30px;
  }
  &__button {
    margin-top: 50px;
  }
}
@include media-breakpoint-down(md) {
  .verification {
    max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    &__main {
      & * {
        width: 100%;
      }
      max-width: 560px;
    }
  }
}
</style>
