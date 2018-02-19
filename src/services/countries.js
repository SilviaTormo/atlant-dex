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
