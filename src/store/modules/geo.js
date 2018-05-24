import * as GeoApi from 'services/api/geo';

export default {
  state: {
    countries: [],
    countriesLoading: false,
    countriesLoaded: false,
    citiesLoading: false,
    cities: {},
  },
  mutations: {
    setAll(state, data) {
      Object.assign(state, data);
      return state;
    },
    setCountries(state, countries) {
      Object.assign(state, {
        countries,
        countriesLoading: false,
        countriesLoaded: true,
      });
      return state.countries;
    },
    setCities(state, {country, countryCities}) {
      Object.assign(state, {
        cities: Object.assign({}, state.cities, {[country]: countryCities}),
        citiesLoading: false,
      });
      return state.cities;
    },
  },
  actions: {
    getCountries({commit, state}) {
      if (state.countriesLoaded) return true;
      commit('setAll', {countriesLoading: true});
      GeoApi.getCountries()
          .then(({data}) => {
            commit('setCountries', data);
      });
    },
    getCities({commit, state}, country) {
      if (state.cities[country]) return true;
      commit('setAll', {citiesLoading: true});
      GeoApi.getCities({country})
      .then(({data}) => {
        commit('setCities', {countryCities: data, country});
      });
    },
  },
  namespaced: true,
  strict: process.env.NODE_ENV !== 'production',
};
