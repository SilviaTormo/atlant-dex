<template lang="pug">
Page(title="Verification", title2="Please upload the following files in order to verify your account:", :sidebar="true")
  .verification
    .verification__main
      p Please upload the following files in order to verify your account:
      p.verification__entityType If you are a private individual:
      ol.verification__list
        li.verification__listHeader Proof of identity scan (choose any of the following):
        ul
          li Passport (must include photo)
          li International passport (must include photo)
          li Driver's license
          li ID card
          li Any other proof of identity that contains your photograph.
        li.verification__listHeader Proof of residence scan (choose any of the following):
        ul
          li Passport residence information
          li Utility bills
          li Tax documentation
          li Bank statements
          li Other documents confirming your address provided by relevant authorities.
      p.verification__entityType If you represent a company:
      ul
        li Certificate of incorporation
        li Articles of association
        li Document confirming the CEO's appointment
        li Documents confirming the CEO's identity and place of residence (please see document list for private individuals)
      p.verification__note Please make sure that all document scans are of a high quality and the text is fully readable.
    form.verification__form(name="tierOne")
      .verification__label First name #[input.input(name="firstName", :value="verification.firstName" type="text")]
      .verification__label Last name #[input.input(name="lastName", :value="verification.lastName" type="text")]
      .verification__label Country #[input.input(name="country", :value="verification.country" type="text")]
      .verification__label City #[input.input(name="city", :value="verification.city" type="text")]
      .verification__label Address #[input.input(name="address", :value="verification.address" type="text")]
      .verification__label Post code #[input.input(name="postCode", :value="verification.postcode" type="text")]
      .verification__label Phone number #[input.input(name="phoneNumber", :value="verification.phoneNumber" type="text")]
      .verification__label Date of birth #[input.input(name="dateOfBirth", :value="verification.dateOfBirth" type="text")]
      .verification__label Passport number #[input.input(name="passportId", :value="verification.passportId" type="text")]
      .verification__label Passport scan #[input.input(name="passportScan" type="file")]
      .verification__label Selfie #[input.input(name="selfie" type="file")]
      .verification__label Proof of residence #[input.input(name="proofOfResidenceScan" type="file")]
    BButton.verification__button(color="malachite" rounded @click="upload()") Submit
    // .verification__form
      .verification__formText Drag your files here to upload
</template>

<script>
// import Uppy from 'uppy/lib/core';
// import Dashboard from 'uppy/lib/plugins/Dashboard';
// import Tus from 'uppy/lib/plugins/Tus';
import {mapState, mapActions} from 'vuex';
import BButton from 'components/BButton';
import Page from './Page';

export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapState('verify', {
      verification: 'lastVerification',
    }),
  },
  methods: {
    ...mapActions('verify', {
      verifyTierOne: 'verifyTierOne',
      getLastVerification: 'getLastVerification',
    }),
    upload() {
      let formData = new FormData(document.forms.tierOne);
      this.verifyTierOne(formData);
    },
  },
  mounted() {
    this.getLastVerification();
    // const uppy = Uppy({autoProceed: false})
    //   .use(Dashboard, {
    //     target: '.verification__form',
    //     inline: true,
    //     locale: {
    //       strings: {
    //         dropPaste: 'Drag your files here to upload',
    //       },
    //     },
    //   })
    //   .use(Tus, {endpoint: '//master.tus.io/files/'})
    //   .run();
    //
    // uppy.on('complete', (result) => {
    //   console.log(`Upload complete! We’ve uploaded these files: ${result.successful}`);
    // });
  },
  components: {
    Page,
    BButton,
  },
};
</script>


<style lang="scss">
@import "~sass/bootstrap/media";
.verification {
  max-width: 560px;
  &__main {
    font-size: 14px;
    font-weight: 400;
    line-height: 19px;
    & > * {
      margin-bottom: 19px;
    }
  }
  &__list {
    counter-reset: item;
  }
  &__listHeader {
    color: #31ecce;
    font-weight: 700;
    margin: 19px 0;
    list-style: none;
    &::before {
      margin-left: -24px;
      margin-right: 10px;
      counter-increment: item;
      content: counter(item) ".";
      color: #ffffff;
      font-size: 16px;
      font-weight: 700;
      line-height: 25px;
      text-transform: uppercase;
    }
  }
  &__entityType {
    font-weight: 700;
  }
  &__note {
    font-size: 12px;
    font-weight: 700;
    margin-bottom: 53px;
  }
  &__form {
    display: flex;
    flex-direction: column;
    & > * {
      margin-bottom: 10px;
    }
    // min-height: 142px;
    // border-radius: 4px;
    // border: 1px dashed #ffffff;
    // opacity: 0.5;
    // display: flex;
  }
  // &__formText {
  //   opacity: 0.5;
  //   font-size: 20px;
  //   font-weight: 300;
  //   margin: auto;
  // }
  &__label {
    & * {
      margin-left: 10px;
    }
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
