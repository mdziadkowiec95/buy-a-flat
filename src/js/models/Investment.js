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

  filterFlats(filters) {

    const ranges = {
      price: {
        min: isNaN(filters.min_price) ? 0 : filters.min_price,
        max: isNaN(filters.max_price) ? Infinity : filters.max_price,
      },
      floor: {
        min: isNaN(filters.min_floor) ? 1 : filters.min_floor,
        max: isNaN(filters.max_floor) ? Infinity : filters.max_floor,
      },
      rooms: {
        min: isNaN(filters.min_rooms) ? 1 : filters.min_rooms,
        max: isNaN(filters.max_rooms) ? Infinity : filters.max_rooms,
      },
      area: {
        min: isNaN(filters.min_area) ? 0 : filters.min_area,
        max: isNaN(filters.max_area) ? Infinity : filters.max_area,
      }
    };

    debugger;

    this.filteredFlats = this.flats;

    for (const key in ranges) {
      console.log(key, ranges[key]);
      this.filteredFlats = this.filteredFlats.filter(flat => parseFloat(flat[key]) >= parseFloat(ranges[key].min) && flat[key] < parseFloat(ranges[key].max));
    }



    // this.filteredFlats = this.flats.filter(el => parseFloat(el.price) >= parseFloat(ranges.price.min) && el.price < ranges.price.max);



  }
}


console.log('dupa jasia');