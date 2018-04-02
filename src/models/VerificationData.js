import Vue from 'vue';

const props = [
  'firstName',
  'lastName',
  'country',
  'city',
  'address',
  'postCode',
  'phoneNumber',
  'dateOfBirth',
  'passportId',
  'passportScan',
  'selfie',
  'proofOfResidenceScan',
];

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default class VerificationData {
  constructor(data) {
    this._init();
    this._dateOfBirth = null;
    this._day = '';
    this._month = '';
    this._year = '';
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
  _setDateOfBirth() {
    if (this._day && this._month && this._year) {
      this._dateOfBirth = new Date(`${this._year}-${this._month}-${this._day}`);
    }
  }
  set dateOfBirth(dateOfBirth) {
    console.log('set date of birth: ', dateOfBirth);
    console.dir(new Date(Date.parse(dateOfBirth)));
    this._dateOfBirth = new Date(Date.parse(dateOfBirth));
  }
  set day(day) {
    this._day = day;
    this._setDateOfBirth();
  }
  set month(month) {
    this._month = month;
    this._setDateOfBirth();
  }
  set year(year) {
    this._year = year;
    this._setDateOfBirth();
  }
  get dateOfBirth() {
    return this._dateOfBirth ? this._dateOfBirth.toISOString() : null;
  }
  get day() {
    return this._dateOfBirth ? this._dateOfBirth.getDay() + 1: this._day;
  }
  get month() {
    return this._dateOfBirth ? (months[this._dateOfBirth.getMonth()]) : this._month;
  }
  get year() {
    return this._dateOfBirth ? this._dateOfBirth.getFullYear() : this._year;
  }
  getFormData() {
    const formData = new FormData();
    props.forEach((prop) => {
      formData.append(prop, this[prop]);
    });
    return formData;
  }
}
