import '@babel/polyfill';

export default class Search {
  constructor(filters) {
    this.filters = filters;
  }

  async getFlats(investment) {
    const name = investment.replace(' ', '').toLowerCase();

    try {
      const res = await fetch(`/${name}.json`);
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

  calcPricePerMeter() {
    this.flats.forEach(flat => {
      const price = Math.floor(flat.price / flat.area);

      flat.pricePerMeter = price;
    });
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

    // set initial falts state
    this.filteredFlats = this.flats;

    // Loop through every flat properties and check if it matches the ranges
    for (const key in ranges) {
      console.log(key, ranges[key]);

      this.filteredFlats = this.filteredFlats.filter(flat => parseFloat(flat[key]) >= parseFloat(ranges[key].min) && flat[key] < parseFloat(ranges[key].max));
    }
  }

  sortFlats(sortType, sortDirection) {


    this.filteredFlats.sort((a, b) => sortDirection === 'ascending' ? a[sortType] - b[sortType] : b[sortType] - a[sortType]);




    // const test = this.filteredFlats.sort((a, b) => {
    //   sortDirection === 'ascending' ? a[sortType] - b[sortType] : b[sortType] - a[sortType];
    // });

    // console.log(test);
  }
}


console.log('dupa jasia');