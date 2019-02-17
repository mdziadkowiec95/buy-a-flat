// import "regenerator-runtime";
import '@babel/polyfill';

export default class Investment {
  constructor(filters) {
    this.filters = filters;
  }

  async getFlats() {
    try {
      const res = await fetch('/investment_1.json')
      const data = await res.json();

      this.flats = data.flats;
    }
    catch (error) {
      alert(error);
    }
  }

  compareFilters(newFilters) {
    let differences = 0;

    const currentFiltersArr = Object.values(this.filters);
    const newFiltersArr = Object.values(newFilters);

    for (let i = 0; i < currentFiltersArr.length; i++) {
      currentFiltersArr[i] !== newFiltersArr[i] ? differences++ : false;
    }

    return differences > 0;
  }
}