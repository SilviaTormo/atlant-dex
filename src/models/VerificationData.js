import Vue from 'vue';

const props = [
  'firstName',
  'lastName',
  'country',
  'city',
  'address',
  'postCode',
  'phoneNumber',
  'day',
  'month',
  'year',
  'passportId',
  'passportScan',
  'selfie',
  'proofOfResidenceScan',
];

export default class VerificationData {
  constructor(data) {
    this._init();
    if (data && typeof data === 'object') {
      this._setData(data);
    }
  };
  _init() {
    props.forEach((prop) => Vue.set(this, prop, ''));
  }
  _setData(data) {
    Object.keys(data).forEach((key) => {
      Vue.set(this, key, data[key]);
    });
  }
}
