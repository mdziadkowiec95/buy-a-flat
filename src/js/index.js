import Investment from './models/Investment';
import * as investmentView from './views/investmentView';



const state = {

}

window.s = state;


const controlFiltering = async () => {

  const newFilters = investmentView.getFilters();
  // console.log(newFilters);

  // console.log(newFilters.investment);
  // console.log(state.investment.filters.investment);

  if (!state.investment || (newFilters.investment !== state.investment.filters.investment)) {
    console.log('poszło');

    try {
      state.investment = new Investment(newFilters);
      await state.investment.getFlats();

    } catch (error) {
      alert(error);
    }

  } else if (state.investment.compareFilters(newFilters)) {

    console.log('inne filtry');

    state.investment.filters = newFilters;

  } else {

    console.log('nic sie nie zmienilo');
  }

}



const filterFlats = () => {
  const filteredArr = state.flats.filter(flat => {
    return flat.rooms >= 4;
  });

  console.log(filteredArr);

};


document.querySelector('.search-form').addEventListener('submit', e => {
  e.preventDefault();

  controlFiltering();


})




