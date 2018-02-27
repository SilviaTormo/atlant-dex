export const getKeyByValue = (object, value) => {
  return Object.keys(object).find((key) => object[key] === value);
};

export const countryNames = {
  by: 'Belarus',
  cn: 'China',
  gi: 'Gibraltar',
  kz: 'Kazakhstan',
  ru: 'Russia',
  es: 'Spain',
  th: 'Thailand',
  ua: 'Ukraine',
  uk: 'United Kingdom',
  us: 'United States',
};

export const countryCurrencies = {
  cn: 'CNY',
  eu: 'EUR',
  ru: 'RUB',
  us: 'USD',
};

export const getCountryName = (countryCode) => {
  return countryNames[countryCode];
};

export const getCountryCurrency = (countryCode) => {
  return countryCurrencies[countryCode];
};

export const getCountryByCurrency = (currency) => {
  let country = getKeyByValue(countryCurrencies, currency);
  return country ? country : 'us';
};
