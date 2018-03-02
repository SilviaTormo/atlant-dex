export const getKeyByValue = (object, value) => {
  return Object.keys(object).find((key) => object[key] === value);
};

export const countryData = {
  by: {
    name: 'Belarus',
    code: '+375',
  },
  cn: {
    name: 'China',
    code: '+86',
  },
  gi: {
    name: 'Gibraltar',
    code: '+350',
  },
  kz: {
    name: 'Kazakhstan',
    code: '+7',
  },
  ru: {
    name: 'Russia',
    code: '+7',
  },
  es: {
    name: 'Spain',
    code: '+34',
  },
  th: {
    name: 'Thailand',
    code: '+66',
  },
  ua: {
    name: 'Ukraine',
    code: '+380',
  },
  uk: {
    name: 'United Kingdom',
    code: '+44',
  },
  us: {
    name: 'United States',
    code: '+1',
  },
};

export const countryCurrencies = {
  cn: 'CNY',
  eu: 'EUR',
  ru: 'RUB',
  us: 'USD',
};

export const getCountryName = (countryCode) => {
  return countryData[countryCode].name;
};

export const getCountryCode = (countryCode) => {
  return countryData[countryCode].code;
};

export const getCountryCurrency = (countryCode) => {
  return countryCurrencies[countryCode];
};

export const getCountryByCurrency = (currency) => {
  let country = getKeyByValue(countryCurrencies, currency);
  return country ? country : 'us';
};
